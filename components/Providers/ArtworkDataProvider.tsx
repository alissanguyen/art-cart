import * as React from "react";
import { RawFirestoreArtwork } from "../../firestore-collections";
import { transformFirestoreData } from "../../lib/firebase/dataTransforms";
import { FirestoreInstance } from "../../lib/firebase/firebase";
import { Artwork } from "../../types";
import { sanitizeArtwork } from "../../utils/sanitization";
import { useAuthContext } from "./AuthProvider";

interface ArtworkDataContextValue {
  artworks: Record<string, Artwork>;
}

const ArtworkDataContext = React.createContext<
  ArtworkDataContextValue | undefined
>(undefined);

const ArtworkDataProvider: React.FC = (props) => {
  const [artworkData, setArtworkData] = React.useState<Record<string, Artwork>>(
    {}
  );

  const { userAuthentication } = useAuthContext();

  React.useEffect(() => {
    const fetchArtworkData = async () => {
      const rawArtworks = await FirestoreInstance.collection("artwork").get();
      const formattedArtworks = transformFirestoreData<RawFirestoreArtwork>(
        rawArtworks
      );

      const artworksRecord = formattedArtworks
        .map(sanitizeArtwork)
        .reduce<Record<string, Artwork>>((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

      setArtworkData(artworksRecord);
    };

    fetchArtworkData();
  }, [userAuthentication]);

  return (
    <ArtworkDataContext.Provider value={{ artworks: artworkData }}>
      {props.children}
    </ArtworkDataContext.Provider>
  );
};

export const useArtworkDataContext = () => {
  const artworkContextValue = React.useContext(ArtworkDataContext);

  if (!artworkContextValue) {
    throw new Error(
      "You are trying to use artworkDataContext without rendering its provider somewhere above this component in the component tree."
    );
  }

  return artworkContextValue;
};

export default ArtworkDataProvider;
