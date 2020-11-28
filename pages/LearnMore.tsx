import { Button, Card, TextContainer } from "@shopify/polaris";
import * as React from "react";
import Anchor from "../components/Reusable/Anchor";

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
        <Anchor to="/">
          <Button>Go back to Home Page</Button>
        </Anchor>
      </Card.Section>
    </Card>
  );
};

export default LearnMore;
