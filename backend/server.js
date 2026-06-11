const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const newsRoutes = require("./routes/newsRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Tongue backend is running"
  });
});

app.use("/api", newsRoutes);

const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connesso correttamente");

    app.listen(PORT, () => {
      console.log(`Server avviato sulla porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Errore connessione MongoDB:", error.message);
  });