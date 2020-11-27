import { Layout, Page } from "@shopify/polaris";
import classnames from "classnames";
import * as React from "react";
import CatalogueProductListing from "../../components/CatalogueProductListing";
import styles from "../../styles/Catalogue.module.css";
import { useArtworkDataContext } from "../../components/Providers/ArtworkDataProvider";
import { useUserDataContext } from "../../components/Providers/UserDataProvider";

interface CatalogueInitialProps {
  initialProducts: Record<string, Artwork>;
  initialUsers: Record<string, User>;
}

const Catalogue: React.FC<CatalogueInitialProps> = (props) => {
  const { artworks } = useArtworkDataContext();
  const {users} = useUserDataContext();

  return (
    <Page title="ArtCart Catalogue">
      <Layout>
        <Layout.Section secondary></Layout.Section>
        <Layout.Section fullWidth>
          <div className={classnames(styles.Catalogue__Container)}>
            {Object.values(artworks).map((artwork) => (
              <CatalogueProductListing
                key={artwork.id}
                artwork={artwork}
                associatedArtist={users[artwork.artistId]}
              />
            ))}
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Catalogue;
