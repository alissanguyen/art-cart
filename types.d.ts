interface LoggedInUser {
  id: string;
  username: string;
  avatarUrl: string | null;
  firstName?: string;
  lastName?: string;
  loggedInUtcTimestamp: number;
  favoritedArtworkIds: Record<string, string>;
}

interface Artwork {
  id: string;
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

interface User {
  displayName: string;
  id: string;
  bio: string;
}
