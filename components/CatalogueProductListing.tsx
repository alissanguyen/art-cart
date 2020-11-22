import { Card, MediaCard, Stack, TextContainer } from "@shopify/polaris";
import * as React from "react";
import FavoriteIcon from "./Reusable/FavoriteIcon";
import styles from "../styles/Catalogue.module.css";

interface Props {
  artwork: Artwork;
  associatedArtist?: User;
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
  return (
    <MediaCard
      title={props.artwork.displayName}
      description={`Created by ${
        props.associatedArtist
          ? props.associatedArtist.displayName
          : "[Deleted User]"
      }`}
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
          backgroundImage: `url(${props.artwork.previewImageSrc})`,
        }}
      ></div>

      <Card.Section subdued>
        <Stack vertical={false} distribution="fillEvenly">
          <Stack vertical={false} spacing="tight">
            <FavoriteIcon />
            <TextContainer>{props.artwork.numberOfFavorites}</TextContainer>
          </Stack>

          <TextContainer>
            <p className={styles.CatalogueProductListing__PriceDisplay}>
              {currencyFormatter(props.artwork.priceInUsd)}
            </p>
          </TextContainer>
        </Stack>
      </Card.Section>
    </MediaCard>
  );
};

export default CatalogueProductListing;
