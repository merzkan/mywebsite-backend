const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const connectDB = require("./config/db");

const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');
const userRoute = require("./routes/user");

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Güvenlik Middlewarleri

// Helmet – HTTP header güvenliği
app.use(helmet());

// HPP – HTTP parametre pollution koruması
app.use(hpp());

// Rate limit – brute-force saldırılarını engeller
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dk
    max: 100, // 15 dk içinde max 100 istek
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://merzkan.app"],
    credentials: true,
  })
);

// JSON body size limit ekledim (isteğe bağlı ama güvenlik için iyi)
app.use(express.json({ limit: "1mb" }));

//API ROUTES
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
