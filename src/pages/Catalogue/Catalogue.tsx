import * as React from "react";
import "./Catalogue.css";
import classnames from "classnames";
import { Card, Layout, Page } from "@shopify/polaris";
import { EXAMPLE_PRODUCT_LISTING } from "../../utils/sampleData";
import CatalogueProductListing from "./CatalogueProductListing";

const Catalogue: React.FC = () => {
  const sampleProducts = Object.keys(EXAMPLE_PRODUCT_LISTING);

  return (
    <Page title="ArtCart Catalogue">
      <Layout>
        <Layout.Section secondary
        ></Layout.Section>
        <Layout.Section fullWidth>
          <div className={classnames("Catalogue__Container")}>
            {sampleProducts.map((productId) => (
              <CatalogueProductListing productId={productId} />
            ))}
            {sampleProducts.map((productId) => (
              <CatalogueProductListing productId={productId} />
            ))}
            
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Catalogue;
