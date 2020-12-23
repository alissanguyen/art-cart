import { Card, MediaCard, Stack, TextContainer } from "@shopify/polaris";
import * as React from "react";
import FavoriteIcon from "./Reusable/FavoriteIcon";
import styles from "../styles/Catalogue.module.css";
import Link from "next/link";
import { currencyFormatter, productIdAndNameToPath } from "../utils/strings";
import { Artwork, User } from "../types";
import { useRouter } from "next/router";
import { useCartDataContext } from "./Providers/CartDataProvider";

interface Props {
  artwork: Artwork;
  associatedArtist?: User;
}

const CatalogueProductListing: React.FC<Props> = (props) => {
  const router = useRouter();
  const url = productIdAndNameToPath(
    props.artwork.id,
    props.artwork.displayName
  );
  const { addToCart } = useCartDataContext();

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
        onAction: () => addToCart(props.artwork.id),
      }}
      secondaryAction={{
        content: "Visit Page",
        onAction: () =>
          router.push(
            productIdAndNameToPath(props.artwork.id, props.artwork.displayName)
          ),
      }}
      portrait
      size={"small"}
    >
      <Link href={url}>
        <a className="Catalogue__EntireCatalogue">
          <div
            className={
              styles.CatalogueProductListing__MainPreviewImageContainer
            }
            style={{
              backgroundImage: `url(${props.artwork.previewImageSrc})`,
            }}
          ></div>
        </a>
      </Link>

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
