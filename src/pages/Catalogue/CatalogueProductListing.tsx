import { Card, MediaCard } from "@shopify/polaris";
import * as React from "react";
import {
  EXAMPLE_ARTISTS,
  EXAMPLE_PRODUCT_LISTING,
} from "../../utils/sampleData";

interface Props {
  productId: string;
}

const CatalogueProductListing: React.FC<Props> = (props) => {
  const product = EXAMPLE_PRODUCT_LISTING[props.productId];

  const associatedArtist = EXAMPLE_ARTISTS[product.artistId];

  return (
    <MediaCard
      title={product.displayName}
      description={`Created by ${associatedArtist.displayName}`}
      portrait
      size={"small"}
    >
      <div
        className="CatalogueProductListing__MainPreviewImageContainer"
        style={{
          backgroundImage: `url(${product.previewImageSrc})`,
        }}
      ></div>

      {/* <Card.Section>
        <div className="CatalogueProductListing__InformationContainer">
          <p>{product.displayName}</p>
          <p>Created by {associatedArtist.displayName}</p>
          <p>Price: {product.priceInUsd}</p>
        </div>
      </Card.Section> */}
    </MediaCard>
  );
};

export default CatalogueProductListing;
