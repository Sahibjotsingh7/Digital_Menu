const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const bodyParser  = require('body-parser');
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/items', require('./routes/itemRoutes')); // Item Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
