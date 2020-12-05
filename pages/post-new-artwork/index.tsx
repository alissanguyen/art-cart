import {
  Button,
  Form,
  FormLayout,
  Layout,
  Page,
  TextField,
} from "@shopify/polaris";
import * as React from "react";
import { FirestoreInstance } from "../../lib/firebase/firebase";

interface Props {}

const PostNewArtwork: React.FC<Props> = ({}) => {
  //   const { user } = useAuthContext();

  const [artworkName, setArtworkName] = React.useState("My fantastic orange");
  const [artworkPrice, setArtworkPrice] = React.useState("123");
  const [imageUrl, setImageUrl] = React.useState(
    "https://i.imgur.com/DNBm8an.jpeg"
  );

  //   if (!user) {
  //     return null;
  //   }

  const handleArtworkNameChange = (value: string) => setArtworkName(value);
  const handleArtworkPrice = (value: string) => setArtworkPrice(value);

  const handleImageUrl = (value: string) => setImageUrl(value);

  const postNewArtwork = () => {
    /**
     * TODO:
     * Validate everything before writing to firebase.
     * Implement uploading image with shopify dropzone
     * 
     * e.g.
     * - display name max length/no inappropriate words (HARD)/no weird symbols/no emojis in the name
     * - preview image is appropriate (HARD)
     *     - When a user submits a piece of artwork, it isn't visible to other users until an admin approves it
     * - price is a valid number
     */
    FirestoreInstance.collection("artwork").add({
      associated_artist_id: "abc123",
      display_name: artworkName,
      preview_image_src: imageUrl,
      price_in_usd: Number(artworkPrice),
      number_of_copies: 0,
      number_of_favorites: 0,
    });
  };

  return (
    <Page title="Post Your Art">
      <Layout>
        <Layout.Section fullWidth>
          <Form
            onSubmit={() => {
              postNewArtwork(); //TODO: implement this
            }}
          >
            <FormLayout>
              {/* One field for the name */}
              <TextField
                onChange={handleArtworkNameChange}
                label="Artwork's Name"
                type="text"
                helpText={
                  <span>This will be the name displayed on your listing</span>
                }
                value={artworkName}
              />
              <TextField
                onChange={handleArtworkPrice}
                label="Price (in USD)"
                type="number"
                value={artworkPrice}
              />
              {/* One field for the picture URL */}
              <TextField
                onChange={handleImageUrl}
                label="Image URL"
                type="text"
                value={imageUrl}
              />

              <Button submit>Post</Button>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default PostNewArtwork;
