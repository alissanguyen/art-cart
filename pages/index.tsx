import { Button, Card, Page } from "@shopify/polaris";
import Head from "next/head";
import * as React from "react";
import Link from "../components/Reusable/Link";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>ArtCart</title>
      </Head>
      <div>
        <Page title="Welcome to ArtCart">
          <Card
            title="Get started by view the latest artwork in Seattle"
            sectioned
          >
            <Card.Section>
              <Link to="/c">
                <Button>Browse Catalogue</Button>
              </Link>
            </Card.Section>
          </Card>
        </Page>
      </div>
    </>
  );
};

export default Home;
