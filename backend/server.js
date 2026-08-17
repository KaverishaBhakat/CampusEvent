require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/events", eventRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/",(req,res)=>{
    res.send("CampusEvent Backend is running");
});

app.listen(PORT ,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

