export interface RawFirestoreArtwork {
  price_in_usd: number;
  number_of_copies_sold: number;
  number_of_favorites: number;
  associated_artist_id: string;
  preview_image_src: string;
  display_name: string;
  id: string;
  url: string
}

export interface RawFirestoreUser {
  display_name: string;
  bio: string;
  id: string;
}

type ProductId = string;
type Quantity = number;



export interface RawFirestoreCart {
  user_id: string;
  items_in_cart: Record<ProductId, Quantity>
}
