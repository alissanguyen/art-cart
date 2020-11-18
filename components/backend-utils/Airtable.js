const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const ArtistsTable = base(process.env.AIRTABLE_ARTISTS_TABLE_NAME);

const getMinifiedArtist = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyArtistRecords = (records) => {
  return records.map((record) => getMinifiedArtist(record));
};

const ProductsTable = base(process.env.AIRTABLE_PRODUCTS_TABLE_NAME);

const getMinifiedProduct = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyProductRecords = (records) => {
  return records.map((record) => getMinifiedProduct(record));
};

export {
  ArtistsTable,
  ProductsTable,
  getMinifiedArtist,
  minifyArtistRecords,
  minifyProductRecords,
  getMinifiedProduct,
};
