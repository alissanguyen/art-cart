import * as React from "react";
import { RawFirestoreArtwork } from "../../firestore-collections";
import { transformFirestoreQueryResultData } from "../../lib/firebase/dataTransforms";
import { FirestoreInstance } from "../../lib/firebase/firebase";
import { Artwork } from "../../types";
import { sanitizeArtwork } from "../../utils/sanitization";
import { useAuthContext } from "./AuthProvider";

interface ArtworkDataContextValue {
  artworks: Record<string, Artwork>;
  artworkDataError: string | undefined;
}

const ArtworkDataContext = React.createContext<
  ArtworkDataContextValue | undefined
>(undefined);

const ArtworkDataProvider: React.FC = (props) => {
  const [artworkData, setArtworkData] = React.useState<Record<string, Artwork>>(
    {}
  );
  const [artworkDataError, setArtworkDataError] = React.useState<string | undefined>(undefined)

  const { userAuthentication } = useAuthContext();

  React.useEffect(() => {
    const fetchArtworkData = async () => {
      const rawArtworks = await FirestoreInstance.collection("artwork").get().catch((e) => {
        console.error(e);

        setArtworkDataError("Failed to load artworks.");
      });

      if (!rawArtworks) {
        return;
      }
      
      const formattedArtworks = transformFirestoreQueryResultData<RawFirestoreArtwork>(
        rawArtworks
      );

      const artworksRecord = formattedArtworks
        .map(sanitizeArtwork)
        .reduce<Record<string, Artwork>>((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

      setArtworkData(artworksRecord);
      setArtworkDataError(undefined)
    };

    fetchArtworkData();
  }, [userAuthentication]);

  return (
    <ArtworkDataContext.Provider value={{ artworks: artworkData, artworkDataError: artworkDataError }}>
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
