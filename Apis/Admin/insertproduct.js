const connectDb = require("../../Db/connectDb");

async function InsertProduct(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("products");

    const {
      name,
      categoryid,
      brand,
      price,
      description,
      images,
      quantity,
      rating,
      featured,
    } = req.body;

    const insertProduct = await collection.insertOne({
      name,
      categoryid,
      brand,
      price,
      description,
      images,
      quantity,
      rating,
      featured,
    });

    if (insertProduct.length == 0) {
      return res.status(404).json({ message: "Data Not Inserted." });
    } else {
      return res.status(200).json({ message: "Data Inserted Successful" });
    }
  } catch (error) {
    return res.json(500).json({ message: error.message });
  }
}

module.exports = { InsertProduct };
