import { useRouter } from "next/router";
import * as React from "react";
import { RawFirestoreCart } from "../../firestore-collections";
import {
  transformFirestoreQueryResultData,
  transformRawFirestoreDocument,
} from "../../lib/firebase/dataTransforms";
import {
  EXTANT_FIELD_VALUE,
  FirestoreInstance,
} from "../../lib/firebase/firebase";
import { Cart } from "../../types";
import { sanitizeCart } from "../../utils/sanitization";
import { useAuthContext } from "./AuthProvider";
import { useToastContext } from "./ToastProvider";

interface CartDataContextValue {
  cart: Cart | undefined;
  cartError: string | undefined;
  addToCart: (artworkId: string) => Promise<void>;
}

const CartDataContext = React.createContext<CartDataContextValue | undefined>(
  undefined
);

const CartDataProvider: React.FC = (props) => {
  const router = useRouter();
  const { showToast } = useToastContext();
  const [cartData, setCartData] = React.useState<Cart | undefined>(undefined);
  const [cartError, setCartError] = React.useState<string | undefined>(
    undefined
  );

  const cartUnsubscribeFunctionRef = React.useRef<null | (() => void)>(null);

  const { userAuthentication: user } = useAuthContext();

  React.useEffect(() => {
    fetchCartData();
  }, [user]);

  React.useEffect(() => {
    /**
     * On logout or component/app unmount, remove the subscription to prevent memory leaks and excess network requests.
     */

    if (!user && cartUnsubscribeFunctionRef.current) {
      cartUnsubscribeFunctionRef.current();
    }
  }, [user]);

  const fetchCartData = async () => {
    if (!user) {
      /**
       * If the user isn't logged in, dont do anything.
       *
       * General approach:
       *
       * 1. EVERY PERSON THAT ENTERS THE SITE AND ISN"T LOGGED IN GETS A "GUEST ID" that looks like "guest_23123abcefg"
       * 2. We store that guest ID in local storage
       * 3. If the guest is not logged in, we create a cart under their guest ID
       * 4. When they log in, we find the cart with the same guest id and update the user_id field to match the logged in user and continue listening to changes to the same cart object in firestore.
       */
      return;
    }

    const rawCarts = await FirestoreInstance.collection("carts")
      .where("user_id", "==", user.id)
      .get()
      .catch((e) => {
        console.error(e);

        setCartError("Failed to find a cart for this user.");
      });

    if (!rawCarts) {
      return;
    }

    const formattedCarts = transformFirestoreQueryResultData<RawFirestoreCart>(
      rawCarts
    );

    let cartForThisUser: Cart;

    if (!formattedCarts[0]) {
      console.error(`No cart found with user_id: ${user.id}`);

      /** Create a cart for this user and keep going */
      FirestoreInstance.collection("carts")
        .add({
          items_in_cart: {},
          user_id: user.id,
        })
        .then((docRef) => {
          console.log("Document (cart) created with ID", docRef.id);
        })
        .catch((err) => {
          throw new Error(
            "Issue creating a cart for this user, please try again"
          );
        });
    }

    cartForThisUser = sanitizeCart(formattedCarts[0]);

    /**
     * Set up the subscription
     */

    cartUnsubscribeFunctionRef.current = FirestoreInstance.collection("carts")
      .doc(cartForThisUser.id)
      .onSnapshot((changedCart) => {
        const newCart = changedCart;

        console.log("CHANGE TO CART DETECTED", newCart);

        if (!newCart) {
          throw new Error("Could not find a cart for this user");
        }

        setCartData(
          sanitizeCart(
            transformRawFirestoreDocument<RawFirestoreCart>(changedCart)
          )
        );

        // Make sure we clear the error
        setCartError(undefined);
      });

    setCartData(cartForThisUser);
  };

  async function addToCart(artworkId: string) {
    /**
     * If this is a new user, direct them to the account login page
     */
    if (!user) {
      router.push("/signup");
    }

    /**
     * Cart is errored if cartError is not undefined;
     */
    if (cartError !== undefined) {
      alert(
        "There is an error adding this product to your cart, please try again."
      );
    }

    let cartDataReference = cartData;
    /**
     * Cart is loading if cart is undefined and cartError is undefined;
     */
    if (!cartDataReference) {
      /**
       * TODO: Better experience when there's no cart yet, which could happen when the user is not logged in, or the users network is slow and we haven't finished finding their cart yet.
       *
       * Potential solutions:
       * 1. Just call fetchCartData from here if the cart hasn't been initialized yet
       */
      fetchCartData();
      // alert("Adding to cart....");
    } else {
      await FirestoreInstance.collection("carts")
        .doc(`${cartDataReference.id}`)
        .update({
          [`items_in_cart.${artworkId}`]: EXTANT_FIELD_VALUE.increment(1),
        });
      showToast("ADD_TO_CART_SUCCESS");
    }
  }

  return (
    <CartDataContext.Provider value={{ cart: cartData, cartError, addToCart }}>
      {props.children}
    </CartDataContext.Provider>
  );
};

export const useCartDataContext = () => {
  const cartContextValue = React.useContext(CartDataContext);

  if (!cartContextValue) {
    throw new Error(
      "You are trying to use cartDataContext without rendering its provider somewhere above this component in the component tree."
    );
  }

  return cartContextValue;
};

export default CartDataProvider;
