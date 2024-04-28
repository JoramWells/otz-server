/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.development' });
}


const sequelize = require('./src/domain/db/connect');
const enrollmentRoutes = require('./src/adapters/routes/otzEnrollment.routes');

const app = express();

const PORT = process.env.PORT || 5003;
const corsOption = {
  origin: ['*'],
};

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// enable cors
app.use(cors());

app.use('/otz-enrollment', enrollmentRoutes);

sequelize.authenticate().then(() => {
  console.log('Connected to database successfully');
}).catch((error) => {
  console.error('Unable to connect to database: ', error);
});

app.listen(5003, () => {
  console.log(`App running on https://localhost:${PORT}`);
});
