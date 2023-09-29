const mongoose = require("mongoose");

const WriteSchema = mongoose.Schema(
  {
    writeTitle: { type: String, require: true },
    img: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
    category: { type: String, require: true },
    status: { type: String, require: true, default: "False" },
  },
  { timestamps: true }
);

const Write = mongoose.model("write", WriteSchema);
module.exports = Write;
