import * as React from "react";
import { Button, Card, Page } from "@shopify/polaris";
import { useCartDataContext } from "../../components/Providers/CartDataProvider";
import Anchor from "../../components/Reusable/Anchor";

interface Props {}

/**
 * 1. We have the ids of each product in the users cart. Can you render a thumbnail and a name and quantity for each one?  with a subtotal at the bottom
 * 2. Implement the add to cart button functionality. Only make it work for logged in users for now.
 * 3. (bonus) implement the remove from cart functionality and editing quantity of items
 */

const CartPage: React.FC<Props> = ({}) => {
  const { cart } = useCartDataContext();

  if (!cart) {
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


  console.log("HI FROM CARTPAGE", cart);

  const itemsInCart = cart.itemsInCart;
  const arrayItemsInCart = Object.keys(itemsInCart).map((key) => itemsInCart[key])

  console.log(arrayItemsInCart)

  return <Page title="Your Cart">Hi</Page>;
};

export default CartPage;
