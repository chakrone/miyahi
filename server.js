const express = require("express");
const { PORT } = require("./backend/src/config/environment");
const logger = require("./backend/src/config/logger");
const connectDB = require("./backend/src/config/db");

// Load the routes (
const routes = require("./backend/src/routes");

const app = express();


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
