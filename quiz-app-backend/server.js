require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quizRoutes = require("./routes/quizRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const questionRoutes = require("./routes/questionRoutes");
const app = express();

// Connect Database
// connectDB();

// Middlewares
app.use(cors({
  // origin: "http://localhost:5173",
  origin: "true",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
// Test Route

// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();
//   app.use(express.static("./quiz-app-frontend/dist"));
//   app.get("/{*path}", (req, res) => {
//     res.sendFile(path.resolve(dirPath, "./quiz-app-frontend/dist", "index.html"));
//   });
// }


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "quiz-app-frontend", "dist")));

  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "quiz-app-frontend", "dist", "index.html"));
  });
}


// app.get("/", (req, res) => {
//   res.send("Quiz API Running");
// });

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();