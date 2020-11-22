export interface RawFirestoreArtwork {
  price_in_usd: number;
  number_of_copies_sold: number;
  number_of_favorites: number;
  associated_artist_id: string;
  preview_image_src: string;
  display_name: string;
  id: string;
}

export interface RawFirestoreUser {
  display_name: string;
  bio: string;
  id: string;
}
