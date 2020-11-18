interface Product {
  displayName: string;
  priceInUsd: number;
  artistId: string;
  numberofCopiesSold: number;
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
}
