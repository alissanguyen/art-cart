import {
  minifyProductRecords,
  ProductsTable,
} from "../../backend-utils/Airtable";

const getProducts = async (req, res) => {
  try {
    const records = await ProductsTable.select({}).firstPage();
    const minifiedRecords = minifyProductRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};

export default getProducts;
