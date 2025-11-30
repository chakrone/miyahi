const express = require("express");
const cors = require("cors");
const { PORT } = require("./backend/src/config/environment");
const logger = require("./backend/src/config/logger");
const connectDB = require("./backend/src/config/db");

// Load the routes (
const routes = require("./backend/src/routes/index.routes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Register API routes
app.use("/api", routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is starting at http://localhost:${PORT}`);
    });
});
