const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5000;

const categoryRoute = require("./routes/categories.js");
const writeRoute = require("./routes/write.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB çalıştı.");
  } catch (error) {
    throw error;
  }
};

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/writes", writeRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connect();
  console.log(`Çalışıyor ${port}`);
});
