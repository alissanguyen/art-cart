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
  QuestionMarkMajor,
  ArrowRightMinor,
} from "@shopify/polaris-icons";
import { signInWithGithub } from "../lib/firebase/authProviders";
import { useAuthContext } from "./AuthProvider/AuthProvider";

const NavbarFrame: React.FC = (props) => {
  const authContext = useAuthContext();

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
        !authContext.user
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
                    url: "/post-new-artwork",
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
      name={authContext.user ? authContext.user.username : "Anonymous"}
      initials={
        authContext.user && authContext.user.firstName
          ? authContext.user.firstName.charAt(0)
          : "?"
      }
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <Card>
      <ActionList
        items={[
          { content: "Shopify help center" },
          { content: "Community forums" },
        ]}
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
          <Icon source={QuestionMarkMajor} />
          <VisuallyHidden>Secondary menu</VisuallyHidden>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [{ content: "Community forums" }],
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
