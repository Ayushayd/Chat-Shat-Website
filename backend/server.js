// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectMongoDB from "./db/connectMongoDB.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/user", userRoutes);

// app.listen(PORT, () => {
//   connectMongoDB();
//   console.log(`Server is running on port ${PORT}`);
// });

import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://avatar.iran.liara.run"], // Add other domains as needed
      },
    },
  })
);
app.use(cors());

// Rate limiter to limit repeated requests to public APIs
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

// Connect to MongoDB and start server
connectMongoDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
