import { Button, Card, TextContainer } from "@shopify/polaris";
import * as React from "react";
import Link from "../components/Reusable/Link";

interface Props {}

const LearnMore: React.FC<Props> = ({}) => {
  return (
    <Card title="It's time to learn more!" sectioned>
      <Card.Section>
        <TextContainer>
          This is a website to help artists sell their work!
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <Link to="/">
          <Button>Go back to Home Page</Button>
        </Link>
      </Card.Section>
    </Card>
  );
};

export default LearnMore;
