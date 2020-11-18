import { Card, MediaCard, Stack, TextContainer } from "@shopify/polaris";
import * as React from "react";
import { EXAMPLE_ARTISTS, EXAMPLE_PRODUCT_LISTING } from "../utils/sampleData";
import FavoriteIcon from "./Reusable/FavoriteIcon";
import styles from "../styles/Catalogue.module.css";

interface Props {
  productId: string;
}

const currencyFormatter = (currency: number) => {
  const newFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return newFormat.format(currency);
};

const CatalogueProductListing: React.FC<Props> = (props) => {
  const product = EXAMPLE_PRODUCT_LISTING[props.productId];

  const associatedArtist = EXAMPLE_ARTISTS[product.artistId];

  return (
    <MediaCard
      title={product.displayName}
      description={`Created by ${associatedArtist.displayName}`}
      primaryAction={{
        content: "Add to cart",
        onAction: () => {},
      }}
      portrait
      size={"small"}
    >
      <div
        className={styles.CatalogueProductListing__MainPreviewImageContainer}
        style={{
          backgroundImage: `url(${product.previewImageSrc})`,
        }}
      ></div>

      <Card.Section subdued>
        <Stack vertical={false} distribution="fillEvenly">
          <Stack vertical={false} spacing="tight">
            <FavoriteIcon user={associatedArtist} />
            <TextContainer>{product.numberOfFavorites}</TextContainer>
          </Stack>

          <TextContainer>
            <p className={styles.CatalogueProductListing__PriceDisplay}>
              {currencyFormatter(product.priceInUsd)}
            </p>
          </TextContainer>
        </Stack>
      </Card.Section>
    </MediaCard>
  );
};

export default CatalogueProductListing;
