import { Frame, Toast } from "@shopify/polaris";
import * as React from "react";

type ToastId = "ADD_TO_CART_SUCCESS" | "POST_ARTWORK_SUCCESS";

const TOAST_ID_TO_STRING: Record<ToastId, string> = {
  ADD_TO_CART_SUCCESS: "Successfully added to cart!",
  POST_ARTWORK_SUCCESS: "Successfully posted your artwork!",
};

interface ToastContextValue {
  showToast: (toastId: ToastId) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

const ToastProvider: React.FC = (props) => {
  const [toastToDisplay, setToastToDisplay] = React.useState<
    ToastId | undefined
  >(undefined);

  const showToast = (toastId: ToastId) => {
    setToastToDisplay(toastId);
  };

  const onDismiss = () => {
    setToastToDisplay(undefined);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <Frame>
        {toastToDisplay !== undefined ? (
          <Toast
            content={TOAST_ID_TO_STRING[toastToDisplay]}
            onDismiss={onDismiss}
            duration={2000}
          />
        ) : null}
        {props.children}
      </Frame>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const contextValue = React.useContext(ToastContext);

  if (!contextValue) {
    throw new Error(
      "You are trying to use AuthContext without rendering its provider somewhere above this component in the component tree."
    );
  }

  return contextValue;
};

export default ToastProvider;
