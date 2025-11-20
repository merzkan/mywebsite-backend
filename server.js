const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // <-- Yeni dosyamızı çağırdık

// Ayarları yükle
dotenv.config();

// Veritabanına Bağlan (Fonksiyonu çalıştır)
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Rotası
app.get("/", (req, res) => {
  res.send("Backend çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});