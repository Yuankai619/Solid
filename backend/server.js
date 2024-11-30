import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import conversionRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./repository/connectToMongoDB.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/conversations", conversionRoutes);
app.use("/api/v1/messages", messageRoutes);
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
