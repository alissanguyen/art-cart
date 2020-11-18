import { Layout, Page } from "@shopify/polaris";
import classnames from "classnames";
import * as React from "react";
import {
  getMinifiedProduct,
  ProductsTable,
} from "../../backend-utils/Airtable";
import CatalogueProductListing from "../../components/CatalogueProductListing";

interface CatalogueInitialProps {
  initialProducts: Record<string, Product>;
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
              <CatalogueProductListing productId={product.productId} />
            ))}
            {initialProductsArray.map((product) => (
              <CatalogueProductListing productId={product.productId} />
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
    const products = await ProductsTable.select().firstPage();

    const initialProducts = products
      .map(getMinifiedProduct)
      .reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
    return {
      props: {
        initialProducts,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        initialProducts: {},
      },
    };
  }
}

export default Catalogue;
