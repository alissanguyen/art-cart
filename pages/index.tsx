import { Button, Card, Page } from "@shopify/polaris";
import Head from "next/head";
import * as React from "react";
import Catalogue from "./c";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return <Catalogue initialProducts={{}} initialUsers={{}} />;
};

export default Home;
