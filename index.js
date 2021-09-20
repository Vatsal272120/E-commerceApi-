const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Authentication = require('./routes/Authentication');
const https = require('https');

dotenv.config();

// initialise app
const app = express();

// db config and connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        'App listening on port: ' +
          process.env.PORT +
          ' and is connected to the database'
      )
    );
  })
  .catch((err) => console.error(err));

// using middlewares
app.use(express.json());
app.use(cors());

/* Routes */
app.use('/api/authentication', Authentication);
