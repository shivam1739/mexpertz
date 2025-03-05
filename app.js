const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index.js');

const app = express();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// Middleware for parsing JSON and URL-encoded data
app.use(cors({
      credentials: true,
      origin: '*', // Allow all origins
}));

app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
      if (req.method === 'OPTIONS') {
            return res.sendStatus(200); // Handle preflight requests
      }
      next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
      res.send('Hello World!');
});

app.use('/api', router);

const startServer = async () => {
      app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
      });

      try {
            await mongoose.connect(uri, {
                  writeConcern: { w: 'majority' },
                  readPreference: 'primary'
            });

            console.log("MongoDB Connection Status:", mongoose.connection.readyState);
            console.log("Successfully connected to MongoDB!");
      } catch (err) {
            console.error("Failed to connect to MongoDB", err);
      }
}

startServer();
