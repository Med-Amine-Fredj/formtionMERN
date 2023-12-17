import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.get("/verify", (req, res) => {
  res.send("Your server is running at http://localhost:5000/");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

mongoose
  .connect("mongodb://127.0.0.1:1701/MERN")
  .then(() => console.log("Database Connected !"))
  .catch(console.error);
