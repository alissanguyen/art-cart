import { Button } from "@shopify/polaris";
import * as React from "react";

interface Props {
  user: Artist;
}

const FavoriteIcon: React.FC<Props> = (props) => {
  const user = props.user;

  const [isFavorited, setIsFavorited] = React.useState(false);

  const icon = isFavorited ? "♥" : "♡";

  return (
    <Button
      id="favorite-icon"
      plain
      size="large"
      onClick={() => setIsFavorited((isFavorited) => !isFavorited)}
    >
      {icon}
    </Button>
  );
};

export default FavoriteIcon;
