export const sanitizeProduct = (airtableProduct: AirtableProduct): Product => {
  return {
    ...airtableProduct.fields,
  };
};


export const sanitizeArtist = (airtableArtist: AirtableArtist): Artist => {
    return {
        ...airtableArtist.fields,
    };
}