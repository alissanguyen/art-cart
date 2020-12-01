import {
  ActionList,
  Card,
  Frame,
  Icon,
  TopBar,
  VisuallyHidden,
} from "@shopify/polaris";
import * as React from "react";
import {
  ArrowLeftMinor,
  CartMajor,
  ArrowRightMinor,
} from "@shopify/polaris-icons";
import { signInWithGithub } from "../lib/firebase/authProviders";
import { useAuthContext } from "./Providers/AuthProvider";
import { useArtworkDataContext } from "./Providers/ArtworkDataProvider";
import { useCartDataContext } from "./Providers/CartDataProvider";
import { useRouter } from "next/router";

const NavbarFrame: React.FC = (props) => {
  const authContext = useAuthContext();
  const artworkDataContext = useArtworkDataContext();
  const cartDataContext = useCartDataContext();
  const router = useRouter();

  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = React.useState(false);
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const toggleIsUserMenuOpen = React.useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpen = React.useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const handleSearchResultsDismiss = React.useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = React.useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = React.useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={
        !authContext.userAuthentication
          ? [
              {
                items: [
                  {
                    content: "Sign In",
                    icon: ArrowRightMinor,
                    onAction: () =>
                      signInWithGithub().then((user) =>
                        authContext.login(user)
                      ),
                  },
                ],
              },
            ]
          : [
              {
                items: [
                  {
                    content: "Post Artwork",
                    onAction: () => {
                      router.push("/post-new-artwork");
                    },
                  },
                  {
                    content: "Sign Out",
                    icon: ArrowLeftMinor,
                    onAction: authContext.logOut,
                  },
                ],
              },
            ]
      }
      name={
        authContext.userAuthentication
          ? authContext.userAuthentication.username
          : "Anonymous"
      }
      initials={
        authContext.userAuthentication &&
        authContext.userAuthentication.firstName
          ? authContext.userAuthentication.firstName.charAt(0)
          : "?"
      }
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <Card>
      <ActionList
        items={Object.values(artworkDataContext.artworks)
          .filter((el) => {
            const regex = new RegExp(searchValue, "i");
            return regex.test(el.displayName);
          })
          .map((el) => ({
            content: el.displayName,
            id: el.id,
          }))}
      />
    </Card>
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={CartMajor} />
          <VisuallyHidden>Secondary menu</VisuallyHidden>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: "Review Cart",
              onAction: () => {
                router.push("/cart");
              },
            },
          ], //TODO: Show list of items
        },
      ]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return <Frame topBar={topBarMarkup}>{props.children}</Frame>;
};

export default NavbarFrame;
