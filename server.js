const express = require('express');
const { PORT } = require('./backend/src/config/environment');
const logger = require('./backend/src/config/logger');
const connectDB = require('./backend/src/config/db');

const app = express();

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is starting at http://localhost:${PORT}`);
    });
});
