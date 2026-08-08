require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/",(req,res)=>{
    res.send("CampusEvent Backend is running");
});

app.listen(PORT ,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
