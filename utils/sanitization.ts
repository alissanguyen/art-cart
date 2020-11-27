import {
  RawFirestoreArtwork,
  RawFirestoreUser,
} from "../firestore-collections";

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

export const getFirstAndLastName = (fullName: string) => {
  return {
    firstName: fullName.split(" ")[0],
    lastName: fullName.split(" ")[1],
  };
};
