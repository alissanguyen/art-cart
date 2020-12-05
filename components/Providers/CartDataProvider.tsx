import * as React from "react";
import { RawFirestoreCart } from "../../firestore-collections";
import { transformFirestoreData } from "../../lib/firebase/dataTransforms";
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

      const formattedCarts = transformFirestoreData<RawFirestoreCart>(rawCarts);

      const cartForThisUser = sanitizeCart(formattedCarts[0]);

      setCartData(cartForThisUser);
    };

    fetchCartData();
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
