interface LoggedInUser {
  username: string;
  avatarUrl: string;
  accessToken: string;
  isNewUser: boolean;
  firstName?: string;
  lastName?: string;
  loggedInUtcTimestamp: number;
}

interface Product {
  productId: string;
  displayName: string;
  priceInUsd: number;
  artistId: string;
  numberOfCopiesSold: number;
  isFavorited: boolean;
  numberOfFavorites: number;
  previewImageSrc: string;
}

type ProductNotableBadgeId =
  | "best_seller"
  | "trending"
  | "free_shipping"
  | "limited_edition";

interface Artist {
  displayName: string;
  artistId: string;
  bio: string;
}

interface User {
  displayName: string;
  userId: string;
  isArtist: boolean;
  bio: string;
  reviews: string[];
  overallRating: number;
  favoriteArtworks: string[];
}

interface AirtableArtist {
  id: string;
  fields: {
    displayName: string;
    bio: string;
    artistId: string;
  };
}

interface AirtableProduct {
  id: string;
  fields: {
    productId: string;
    displayName: string;
    priceInUsd: number;
    artistId: string;
    numberOfCopiesSold: number;
    isFavorited: boolean;
    numberOfFavorites: number;
    previewImageSrc: string;
  };
}
