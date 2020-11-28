import { Button, Card, Layout, Page, Thumbnail } from "@shopify/polaris";
import { useRouter } from "next/router";
import * as React from "react";
import { useArtworkDataContext } from "../../components/Providers/ArtworkDataProvider";
import { useUserDataContext } from "../../components/Providers/UserDataProvider";

interface Props {}

const ArtworkDetailPage: React.FC<Props> = ({}) => {
  const router = useRouter();

  if (!router.query.all) {
    return null;
  }

  const [id] = router.query.all as [string, string];

  const { artworks } = useArtworkDataContext();
  const { users } = useUserDataContext();

  console.log(users);

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
              <Button primary loading={false}>Add to Cart</Button> 
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ArtworkDetailPage;
