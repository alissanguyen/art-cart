import { Layout, Page } from "@shopify/polaris";
import classnames from "classnames";
import * as React from "react";
import CatalogueProductListing from "../../components/CatalogueProductListing";
import { EXAMPLE_PRODUCT_LISTING } from "../../utils/sampleData";
import styles from "../../styles/Catalogue.module.css";

const Catalogue: React.FC = () => {
  const sampleProducts = Object.keys(EXAMPLE_PRODUCT_LISTING);

  return (
    <Page title="ArtCart Catalogue">
      <Layout>
        <Layout.Section secondary></Layout.Section>
        <Layout.Section fullWidth>
          <div className={classnames(styles.Catalogue__Container)}>
            {sampleProducts.map((productId) => (
              <CatalogueProductListing key={productId} productId={productId} />
            ))}
            {sampleProducts.map((productId) => (
              <CatalogueProductListing key={productId} productId={productId} />
            ))}
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Catalogue;
