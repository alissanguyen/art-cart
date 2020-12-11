import * as React from "react";
import {
  Button,
  Card,
  EmptyState,
  Page,
  ResourceItem,
  ResourceList,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import { useCartDataContext } from "../../components/Providers/CartDataProvider";
import Anchor from "../../components/Reusable/Anchor";
import { useArtworkDataContext } from "../../components/Providers/ArtworkDataProvider";
import { Artwork, Cart } from "../../types";
import { currencyFormatter, productIdAndNameToPath } from "../../utils/strings";
import { Router, useRouter } from "next/router";
import { FirestoreInstance } from "../../lib/firebase/firebase";
import { useAuthContext } from "../../components/Providers/AuthProvider";

interface Props {}

/**
 *
 * 3. (bonus) implement the remove from cart functionality and editing quantity of items
 */

const CartPage: React.FC<Props> = ({}) => {
  const { cart } = useCartDataContext();
  const { artworks } = useArtworkDataContext();

  const router = useRouter();

  const checkOut = () => {
    router.push("/checkout");
    //TODO: implement this
  };

  if (!cart || !artworks) {
    return (
      <Page title="Your Cart">
        <Card
          title="There is an issue loading your cart, please try again later"
          sectioned
        >
          <Card.Section>
            <Anchor to="/">
              <Button>Go back to Homepage</Button>
            </Anchor>
            <Anchor to="/c">
              <Button>Go back to Catalogue page</Button>
            </Anchor>
          </Card.Section>
        </Card>
      </Page>
    );
  }

  const itemsInCart = cart.itemsInCart;
  const arrayItemsInCart = Object.entries(itemsInCart).map(([key, value]) => {
    return {
      productId: key,
      quantity: value,
    };
  });

  /**
   * Convert this item id and quantity into a full artwork
   */
  const itemsToRenderAsResourceListItems = arrayItemsInCart.map(
    (item): Artwork & { quantity: number } => {
      const artworkAssociatedWithItem = artworks[item.productId];

      return {
        ...artworkAssociatedWithItem,
        quantity: item.quantity,
      };
    }
  );

  var totalCost = 0;

  for (let i = 0; i < itemsToRenderAsResourceListItems.length; i++) {
    totalCost +=
      itemsToRenderAsResourceListItems[i].priceInUsd *
      itemsToRenderAsResourceListItems[i].quantity;
  }

  const emptyCartMarkup =
    cart && arrayItemsInCart.length == 0 ? (
      <Card>
        <img src="empty_cart.svg" />
        <EmptyState
          heading="Your Cart is empty!"
          action={{
            content: "Browse Catalogue",
            onAction: () => {
              router.push("/c");
            },
          }}
          image=""
        ></EmptyState>
      </Card>
    ) : undefined;

  const Cart = FirestoreInstance.collection("carts").doc(`${cart.id}`);

  function incrementItemInCart(item: Artwork & { quantity: number }) {
    // TODO: Update UI 
    Cart.update({
      [`items_in_cart.${item.id}`]: `${item.quantity + 1}`,
    });
  }

  function decrementItemInCart(item: Artwork & { quantity: number }) {
    Cart.update({
      [`items_in_cart.${item.id}`]: `${item.quantity - 1}`,
    });
  }


  return (
    <Page title="Your Cart">
      <Card primaryFooterAction={{ content: "Check out", onAction: checkOut }}>
        <ResourceList
          emptyState={emptyCartMarkup}
          items={itemsToRenderAsResourceListItems}
          alternateTool={<Button submit>Clear Cart</Button>}
          renderItem={(item: Artwork & { quantity: number }) => {
            const shortcutActions = [
              {
                content: "-",
                onAction: () => decrementItemInCart(item),
              },
              {
                content: "+",
                onAction: () => incrementItemInCart(item),
              },
            ];
            return (
              <ResourceItem
                id={item.id}
                shortcutActions={shortcutActions}
                onClick={() => {
                  router.push(
                    productIdAndNameToPath(item.id, item.displayName)
                  );
                }}
                media={
                  <Thumbnail
                    source={item.previewImageSrc}
                    alt=""
                    size="large"
                  />
                }
              >
                <h3>
                  <TextStyle variation="strong">{item.displayName}</TextStyle>
                </h3>
                <div> Price: {currencyFormatter(item.priceInUsd)}</div>
                <div> Quantity: {item.quantity}</div>
                <div>
                  {" "}
                  Total: {currencyFormatter(item.priceInUsd * item.quantity)}
                </div>
              </ResourceItem>
            );
          }}
        />
        <Card.Section title="Total">
          <p>{currencyFormatter(totalCost)}</p>
        </Card.Section>
      </Card>
    </Page>
  );
};

export default CartPage;
