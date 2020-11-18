import { Layout, Page } from "@shopify/polaris";
import classnames from "classnames";
import * as React from "react";
import {
  ArtistsTable,
  getMinifiedArtist,
  getMinifiedProduct,
  ProductsTable,
} from "../../backend-utils/Airtable";
import CatalogueProductListing from "../../components/CatalogueProductListing";
import { sanitizeArtist, sanitizeProduct } from "../../utils/sanitization";

interface CatalogueInitialProps {
  initialProducts: Record<string, Product>;
  initialArtists: Record<string, Artist>;
}

const Catalogue: React.FC<CatalogueInitialProps> = (props) => {
  const initialProductsArray = Object.values(props.initialProducts);

  return (
    <Page title="ArtCart Catalogue">
      <Layout>
        <Layout.Section secondary></Layout.Section>
        <Layout.Section fullWidth>
          <div className={classnames("Catalogue__Container")}>
            {initialProductsArray.map((product) => (
              <CatalogueProductListing
                product={product}
                artists={props.initialArtists}
              />
            ))}
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export async function getServerSideProps(): Promise<{
  props: CatalogueInitialProps;
}> {
  try {
    const [products, artists] = await Promise.all([
      ProductsTable.select().firstPage(),
      ArtistsTable.select().firstPage(),
    ]);

    const initialProducts = products
      .map(getMinifiedProduct)
      .map(sanitizeProduct)
      .reduce<Record<string, Product>>((acc, cur) => {
        acc[cur.productId] = cur;
        return acc;
      }, {});

    const initialArtists = artists
      .map(getMinifiedArtist)
      .map(sanitizeArtist)
      .reduce<Record<string, Artist>>((acc, cur) => {
        acc[cur.artistId] = cur;
      return acc;
    }, {});

    return {
      props: {
        initialProducts,
        initialArtists,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        initialProducts: {},
        initialArtists: {},
      },
    };
  }
}

export default Catalogue;
