import { ProductInCart } from "./firestore-collections";

export interface LoggedInUser {
  id: string;
  username: string;
  avatarUrl: string | null;
  firstName?: string;
  lastName?: string;
  loggedInUtcTimestamp: number;
  favoritedArtworkIds: Record<string, string>;
}

export interface Artwork {
  id: string;
  displayName: string;
  priceInUsd: number;
  artistId: string;
  numberOfCopiesSold: number;
  isFavorited: boolean;
  numberOfFavorites: number;
  previewImageSrc: string;
}

export type ProductNotableBadgeId =
  | "best_seller"
  | "trending"
  | "free_shipping"
  | "limited_edition";

export interface User {
  displayName: string;
  id: string;
  bio: string;
}

export interface Cart {
  id: string;
  userId: string;
  itemsInCart: Record<ProductId, number>;
}
