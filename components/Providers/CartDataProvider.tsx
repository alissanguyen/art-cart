import * as React from "react";
import { RawFirestoreCart } from "../../firestore-collections";
import {
  transformFirestoreQueryResultData,
  transformRawFirestoreDocument,
} from "../../lib/firebase/dataTransforms";
import { FirestoreInstance } from "../../lib/firebase/firebase";
import { Cart } from "../../types";
import { sanitizeCart } from "../../utils/sanitization";
import { useAuthContext } from "./AuthProvider";

interface CartDataContextValue {
  cart: Cart | undefined;
}

const CartDataContext = React.createContext<CartDataContextValue | undefined>(
  undefined
);

const CartDataProvider: React.FC = (props) => {
  const [cartData, setCartData] = React.useState<Cart | undefined>(undefined);

  const cartUnsubscribeFunctionRef = React.useRef<null | (() => void)>(null);

  const { userAuthentication: user } = useAuthContext();

  React.useEffect(() => {
    const fetchCartData = async () => {
      if (!user) {
        /**
         * If the user isn't logged in, dont do anything.
         */
        return;
      }

      const rawCarts = await FirestoreInstance.collection("carts")
        .where("user_id", "==", user.id)
        .get();

      const formattedCarts = transformFirestoreQueryResultData<RawFirestoreCart>(
        rawCarts
      );

      const cartForThisUser = sanitizeCart(formattedCarts[0]);

      /**
       * Set up the subscription
       */

      cartUnsubscribeFunctionRef.current = FirestoreInstance.collection("carts")
        .doc(cartForThisUser.id)
        .onSnapshot((changedCart) => {
          const newCart = changedCart;

          console.log("CHANGE TO CART DETECTED", newCart);

          setCartData(
            sanitizeCart(
              transformRawFirestoreDocument<RawFirestoreCart>(changedCart)
            )
          );
        });

      setCartData(cartForThisUser);
    };

    fetchCartData();
  }, [user]);

  /**
   *
   */

  React.useEffect(() => {
    /**
     * On logout or component/app unmount, remove the subscription to prevent memory leaks and excess network requests.
     */

    if (!user && cartUnsubscribeFunctionRef.current) {
      cartUnsubscribeFunctionRef.current();
    }
  }, [user]);

  return (
    <CartDataContext.Provider value={{ cart: cartData }}>
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
