import { Button, Card, Layout, Page } from "@shopify/polaris";
import { useRouter } from "next/router";
import * as React from "react";
import { useArtworkDataContext } from "../../components/Providers/ArtworkDataProvider";
import { useCartDataContext } from "../../components/Providers/CartDataProvider";
import { useUserDataContext } from "../../components/Providers/UserDataProvider";
import { User } from "../../types";

interface Props {}

const ArtworkDetailPage: React.FC<Props> = ({}) => {
  const router = useRouter();

  const { artworks } = useArtworkDataContext();
  const { users } = useUserDataContext();
  const { addToCart } = useCartDataContext();

  if (!router.query.all) {
    return null;
  }

  const [id] = router.query.all as [string, string];

  const artwork = artworks[id];

  if (!artwork) {
    return <Page title={"Loading artworks..."}></Page>;
  }

  const artist = users[artwork.artistId] as User | undefined;

  return (
    <Page
      narrowWidth
      breadcrumbs={[
        { content: "Catalogue", onAction: () => router.push("/c") },
      ]}
      title={artwork.displayName}
      primaryAction={{ content: "Quick Buy", disabled: false }}
      secondaryActions={[
        {
          content: "Report this listing",
          accessibilityLabel: "Secondary action label",
          onAction: () => {}, //TODO: Implement this
        },
        {
          content: "View this artist's store",
          onAction: () => {}, //TODO: Implement this
        },
      ]}
      actionGroups={[
        {
          title: "Interested?",
          actions: [
            {
              content: "Share this listing",
              accessibilityLabel: "Individual action label",
              onAction: () => {}, //TODO: Copy the link of the listing
            },
            {
              content: "Add to Favorites",
              accessibilityLabel: "Individual action label",
              onAction: () => {}, //TODO: Implement this
            },
          ],
        },
      ]}
      separator
    >
      <Layout>
        <Layout.Section secondary>
          <img
            style={{
              width: "100%",
            }}
            src={artwork.previewImageSrc}
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Card.Section>
              Created by{" "}
              {artist?.displayName ? artist.displayName : "[Deleted User]"}
            </Card.Section>
            <Card.Section>
              {/* TODO: implement loading state */}
              <Button primary loading={false} onClick={() => addToCart(artwork.id)}>
                Add to Cart
              </Button>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ArtworkDetailPage;
