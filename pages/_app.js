import { AppProvider } from "@shopify/polaris";
import reportWebVitals from "../utils/reportWebVitals";
import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { APP_THEME } from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider theme={APP_THEME} i18n={enTranslations}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

reportWebVitals();

export default MyApp;
