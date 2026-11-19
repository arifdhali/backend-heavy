import express from "express";
import dotenv from "dotenv";

import bookRoute from "./routes/book.routes.js";
import notificationsRoute from "./routes/notifications.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { connectDatabase } from "./config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;



app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoute);
app.use("/api/notifications", notificationsRoute);




async function startServer() {
    try {


        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Unable to connect to MySQL:");
        console.error(error.message);

        process.exit(1);
    }

}

startServer();