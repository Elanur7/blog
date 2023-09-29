const Write = require("../models/Write.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const write = await Write.find();
    res.status(200).json(write);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get", async (req, res) => {
  try {
    const writes = await Write.find({ status: "true" });
    res.status(200).json(writes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-id", async (req, res) => {
  try {
    const writes = await Write.find({ _id: req.body.writeId });
    res.status(200).json(writes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-write", async (req, res) => {
  try {
    const newWrite = new Write(req.body);
    await newWrite.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update-write", async (req, res) => {
  try {
    await Write.findOneAndUpdate({ _id: req.body.writeId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete-write", async (req, res) => {
  try {
    await Write.findOneAndDelete({ _id: req.body.writeId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
