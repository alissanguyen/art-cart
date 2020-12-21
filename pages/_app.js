import { AppProvider } from "@shopify/polaris";
import reportWebVitals from "../utils/reportWebVitals";
import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { APP_THEME } from "../utils/theme";
import NavbarFrame from "../components/NavbarFrame";
import Head from "next/head";
import * as React from "react";
import { initializeFirebaseApp } from "../lib/firebase/firebase";
import AuthProvider from "../components/Providers/AuthProvider";
import ArtworkDataProvider from "../components/Providers/ArtworkDataProvider";
import UserDataProvider from "../components/Providers/UserDataProvider";
import CartDataProvider from "../components/Providers/CartDataProvider";
import "../components/Reusable/spinner.css";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    initializeFirebaseApp();
  }, []);

  return (
    <AuthProvider>
      <UserDataProvider>
        <ArtworkDataProvider>
          <CartDataProvider>
            <Head>
              <link rel="icon" href="/logo.svg" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta name="theme-color" content="#000000" />
            </Head>
            <AppProvider theme={APP_THEME} i18n={enTranslations}>
              <NavbarFrame>
                <Component {...pageProps} />
              </NavbarFrame>
            </AppProvider>
          </CartDataProvider>
        </ArtworkDataProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}

reportWebVitals();

export default MyApp;
