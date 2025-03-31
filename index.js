const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/connectDb.js");
const FetchProducts = require("./Apis/User/products.js");
const { FetchCategories } = require("./Apis/User/categories.js");
const { InsertManyCategories } = require("./Apis/Admin/insertcategories.js");
const { InsertProduct } = require("./Apis/Admin/insertproduct.js");
const insertProducts = require("./Apis/Admin/insertproducts.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allowed frontend URLs
    credentials: true, // Allow cookies and sessions to be shared across origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

connectDb();

app.get("/products", FetchProducts);
app.post("/insertProducts", insertProducts);
app.post("/insertProduct", InsertProduct);
app.get("/categories", FetchCategories);
app.post("/insertCategories", InsertManyCategories);

// Starting the Express server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));
