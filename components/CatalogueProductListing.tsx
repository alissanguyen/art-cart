import { Card, MediaCard, Stack, TextContainer } from "@shopify/polaris";
import * as React from "react";
import FavoriteIcon from "./Reusable/FavoriteIcon";
import styles from "../styles/Catalogue.module.css";
import Link from "next/link";

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

function urlGenerate(string: string) {
  const splittedString = string.toLowerCase().split(" ");
  const reducer = (acc: string, cur: string) => acc + "-" + cur;
  const url = splittedString.reduce(reducer);
  console.log(url);
  return url;
}

const CatalogueProductListing: React.FC<Props> = (props) => {
  const url = `/c/${props.artwork.id}/${urlGenerate(
    props.artwork.displayName
  )}`;
  return (
    <Link href={url}>
      <a className="Catalogue__EntireCatalogue">
        <MediaCard
          title={props.artwork.displayName}
          description={`Created by ${
            props.associatedArtist
              ? props.associatedArtist.displayName
              : "[Deleted User]"
          }`}
          primaryAction={{
            content: "Add to cart",
            onAction: () => {}, //TODO: Create a cart and add the item
          }}
          portrait
          size={"small"}
        >
          <div
            className={
              styles.CatalogueProductListing__MainPreviewImageContainer
            }
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
      </a>
    </Link>
  );
};

export default CatalogueProductListing;
