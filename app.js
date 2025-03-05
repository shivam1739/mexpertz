const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index.js');



const app = express();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI

// Middleware for parsing JSON and URL-encoded data
app.use(cors({
      credentials: true,
      // origin: process.env.FRONTEND_BASE_URL,
}));

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
      }
      catch (err) {

      }
}


startServer()

