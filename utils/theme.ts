import { ThemeConfig } from "@shopify/polaris/dist/types/latest/src/utilities/theme";
import { APP_HOST_NAME } from "../lib/constants/constants";

/**
 * TODO: customize our colors here to fit our brand.
 */
export const APP_THEME: ThemeConfig = {
  colors: {
    topBar: {
      background: "#A971FF",
    },
  },
  logo: {
    width: 180,
    topBarSource: "https://i.imgur.com/p5Ksvx2.png",
    url: "/",

    accessibilityLabel: "ArtCart",
  },
};
