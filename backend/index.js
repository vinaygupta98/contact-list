const express = require("express");
const connectDb = require("./config/connectDb");
require("dotenv").config();
connectDb();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
const router = require("./routes");
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is Runinng at ${PORT}`);
});
