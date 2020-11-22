import { Button } from "@shopify/polaris";
import * as React from "react";

interface Props {
  
}

const FavoriteIcon: React.FC<Props> = (props) => {

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
