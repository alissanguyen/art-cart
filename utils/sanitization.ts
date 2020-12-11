import {
  RawFirestoreArtwork,
  RawFirestoreCart,
  RawFirestoreUser,
} from "../firestore-collections";
import { Artwork, Cart, User } from "../types";

export const sanitizeArtwork = (
  rawFirestoreArtwork: RawFirestoreArtwork
): Artwork => {
  return {
    priceInUsd: rawFirestoreArtwork.price_in_usd,
    numberOfCopiesSold: rawFirestoreArtwork.number_of_copies_sold,
    numberOfFavorites: rawFirestoreArtwork.number_of_favorites,
    artistId: rawFirestoreArtwork.associated_artist_id,
    previewImageSrc: rawFirestoreArtwork.preview_image_src,
    displayName: rawFirestoreArtwork.display_name,
    id: rawFirestoreArtwork.id,
    isFavorited: false,
    // TODO: reference the likes of the currently logged in user and see if the ID of this artwork exists in the set of liked artwork IDs in the user object.
  };
};

export const sanitizeUser = (rawFirestoreUser: RawFirestoreUser): User => {
  return {
    displayName: rawFirestoreUser.display_name,
    bio: rawFirestoreUser.bio,
    id: rawFirestoreUser.id,
  };
};

export const sanitizeCart = (rawFirestoreCart: RawFirestoreCart): Cart => {
  return {
    id: rawFirestoreCart.id,
    userId: rawFirestoreCart.user_id,
    itemsInCart: transformItemsInCart(rawFirestoreCart.items_in_cart),
  };
};

export const getFirstAndLastName = (fullName: string) => {
  return {
    firstName: fullName.split(" ")[0],
    lastName: fullName.split(" ")[1],
  };
};

/**
 * Go through this object that looks like
 * {
 *  'id_123': '3',
 *  'id_345': '5',
 *  'id_678': '9'
 * }
 *
 * such that all the values are numbers but everything else is kept the same
 *
 *
 * @param itemsInCart
 */
const transformItemsInCart = (
  itemsInCart: Record<string, string>
): Record<string, number> => {
  return Object.entries(itemsInCart).reduce<Record<string, number>>(
    (acc, [key, value]) => {
      acc[key] = +value;
      return acc;
    },
    {}
  );
};
