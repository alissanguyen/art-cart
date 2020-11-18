interface Product {
  productId: string;
  displayName: string;
  priceInUsd: number;
  artistId: string;
  numberOfCopiesSold: number;
  isFavorited: boolean;
  numberOfFavorites: number;
  previewImageSrc: string;
  notableBadges: ProductNotableBadgeId[];
}

type ProductNotableBadgeId =
  | "best_seller"
  | "trending"
  | "free_shipping"
  | "limited_edition";

interface Artist {
  displayName: string;
  artistId: string;
  associatedArtworkIds: string[];
  bio: string;
  reviews: string[];
  overallRating: number;
  favoriteArtworks: string[];
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
