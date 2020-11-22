import { Layout, Page } from "@shopify/polaris";
import classnames from "classnames";
import * as React from "react";
import CatalogueProductListing from "../../components/CatalogueProductListing";
import {
  RawFirestoreArtwork,
  RawFirestoreUser,
} from "../../firestore-collections";
import { transformFirestoreData } from "../../lib/firebase/dataTransforms";
import { initializeFirebaseApp } from "../../lib/firebase/firebase";
import styles from "../../styles/Catalogue.module.css";
import { sanitizeUser, sanitizeArtwork } from "../../utils/sanitization";

interface CatalogueInitialProps {
  initialProducts: Record<string, Artwork>;
  initialArtists: Record<string, User>;
}

const Catalogue: React.FC<CatalogueInitialProps> = (props) => {
  const [artworks, setArtworks] = React.useState<Record<string, Artwork>>({});
  const [users, setUsers] = React.useState<Record<string, User>>({});

  const { FirestoreInstance } = initializeFirebaseApp();

  React.useEffect(() => {
    const fetchProducts = async () => {
      const [rawArtworks, rawArtists] = await Promise.all([
        FirestoreInstance.collection("artwork").get(),
        FirestoreInstance.collection("users").get(),
      ]);

      const formattedArtworks = transformFirestoreData<RawFirestoreArtwork>(
        rawArtworks
      );
      const formattedUsers = transformFirestoreData<RawFirestoreUser>(
        rawArtists
      );

      const usersRecord = formattedUsers
        .map(sanitizeUser)
        .reduce<Record<string, User>>((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

      const artworksRecord = formattedArtworks
        .map(sanitizeArtwork)
        .reduce<Record<string, Artwork>>((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

      setUsers(usersRecord);
      setArtworks(artworksRecord);
    };

    fetchProducts();
  }, []);

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

// export async function getServerSideProps(): Promise<{
//   props: CatalogueInitialProps;
// }> {
//   try {

//     // const initialProducts = artworks
//     //   .map(sanitizeArtwork)
//     //   .reduce<Record<string, Product>>((acc, cur) => {
//     //     acc[cur.productId] = cur;
//     //     return acc;
//     //   }, {});

//     // const initialArtists = artists
//     //   .map(getMinifiedArtist)
//     //   .map(sanitizeArtist)
//     //   .reduce<Record<string, Artist>>((acc, cur) => {
//     //     acc[cur.artistId] = cur;
//     //     return acc;
//     //   }, {});

//     return {
//       props: {
//         initialProducts: {},
//         initialArtists: {},
//       },
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       props: {
//         initialProducts: {},
//         initialArtists: {},
//       },
//     };
//   }
// }

export default Catalogue;
