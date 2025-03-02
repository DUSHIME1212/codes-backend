import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import prisma from "./configs/database";
import routes from "./routes"

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Set up CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://codeempowementtech.vercel.app"
      : "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

prisma
  .$connect()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error: any) => {
    console.error("Failed to connect to the database:", error);
  });

// Parse JSON bodies
app.use(express.json());
// Set up routes
app.use("/api/v1", routes)
// Use error handler
app.use(errorHandler);

//start a server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
