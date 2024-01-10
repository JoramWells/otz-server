/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
const patientRoutes = require('./_Patient/routes/patient.routes');
const vitalSignRoutes = require('./_VitalSigns/routes/vitalSign.routes');
const viralLoadRoutes = require('./_ViralLoad/routes/viralLoad.routes');
const artRegimeRoutes = require('./_ArtRegimen/routes/artRegimen.routes');

const app = express();

const PORT = process.env.PORT || 5000;
const corsOption = {
  origin: ['http://localhost:3000'],
};

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// enable cors
app.use(cors(corsOption));

app.use('/patient', patientRoutes);
app.use('/vital-sign', vitalSignRoutes);
app.use('/viral-load', viralLoadRoutes);
app.use('/art-regimen', artRegimeRoutes);

// app.use((err, req, res, next) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || 'Something went wrong';
//   return res.status(errStatus).json(errMessage);
// });

sequelize.authenticate().then(() => {
  console.log('Connected to database successfully');
}).catch((error) => {
  console.error('Unable to connect to database: ', error);
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
