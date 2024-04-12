/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
const viralLoadRoutes = require('./ViralLoad/routes/viralLoad.routes');
const internalLabRequestRoutes = require('./ViralLoad/routes/internalLabRequests.routes');
const vitalSignRoutes = require('./routes/vitalSign.routes');
const viralLoadTestRoutes = require('../routes/viralLoadTests.routes');


const app = express();

const PORT = process.env.PORT || 5002;
const corsOption = {
  origin: ['*'],
};

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// enable cors
app.use(cors());

app.use('/vital-signs', vitalSignRoutes);
app.use('/viral-load', viralLoadRoutes);
app.use('/internal-lab-request', internalLabRequestRoutes);
app.use('/viral-load-tests', viralLoadTestRoutes);


sequelize.authenticate().then(() => {
  console.log('Connected to database successfully');
}).catch((error) => {
  console.error('Unable to connect to database: ', error);
});

app.listen(5003, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
