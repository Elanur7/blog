const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    status: { type: String, require: true, default: "false" },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
