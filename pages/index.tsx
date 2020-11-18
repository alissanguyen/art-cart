import { Button, Card, Page } from "@shopify/polaris";
import * as React from "react";
import Head from "next/head";
import Link from "../components/Reusable/Link";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>ArtCart</title>
      </Head>
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
    </>
  );
};

export default Home;
