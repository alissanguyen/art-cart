import { TopBar } from "@shopify/polaris";
import * as React from "react";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const userMenuMarkup = null;

  return <TopBar showNavigationToggle userMenu={userMenuMarkup}></TopBar>;
};

export default Navbar;
