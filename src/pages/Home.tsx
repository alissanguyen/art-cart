import { Button, Card, Page } from "@shopify/polaris";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <Page title="Welcome to ArtCart">
      <Card title="Get started by view the latest artwork in Seattle" sectioned>
        <Card.Section>
          <Link to="/c">
            <Button>Browse Catalogue</Button>
          </Link>
        </Card.Section>
      </Card>
    </Page>
  );
};

export default Home;
