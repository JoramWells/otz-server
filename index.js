/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
const patientRoutes = require('./Patient/routes/patient.routes');
const vitalSignRoutes = require('./VitalSigns/routes/vitalSign.routes');
const viralLoadRoutes = require('./ViralLoad/routes/viralLoad.routes');
const artRegimeRoutes = require('./ArtRegimen/routes/artRegimen.routes');
const userRoutes = require('./Users/routes/user.routes');
const homeVisitReasonRoute = require('./HomeVisit/routes/reasonDetails.routes');
const homeVisitFrequencyRoutes = require('./HomeVisit/routes/homeVisitFrequency.routes');
const homeVisitRoutes = require('./HomeVisit/routes/homeVisit.routes');
const timeAndWorkRoutes = require('./TreatementPlan/routes/timeAndWork.routes');
const mmasRoutes = require('./TreatementPlan/routes/mmas.routes');
const appointmentRoutes = require('./Appointment/routes/appointment.routes');
const appointmentStatusRoutes = require('./Appointment/routes/appointmentStatus.routes');
const appointmentAgendaRoutes = require('./Appointment/routes/appointmentAgenda.routes');
const disclosureChecklistRoutes = require('./TreatementPlan/routes/disclosureChecklist.routes');
const artRegimePhaseRoutes = require('./ArtRegimen/routes/artRegimenPhase.routes');
const artRegimenCategoryRoutes = require('./ArtRegimen/routes/artRegimenCategory.routes');

const app = express();

const PORT = process.env.PORT || 5000;
const corsOption = {
  origin: ['*'],
};

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// enable cors
app.use(cors());

app.use('/patient', patientRoutes);
app.use('/users', userRoutes);
app.use('/vital-sign', vitalSignRoutes);
app.use('/viral-load', viralLoadRoutes);
app.use('/art-regimen', artRegimeRoutes);
app.use('/art-regimen-phase', artRegimePhaseRoutes);
app.use('/art-regimen-category', artRegimenCategoryRoutes);
app.use('/home-visit-reason', homeVisitReasonRoute);
app.use('/home-visit-frequency', homeVisitFrequencyRoutes);
app.use('/home-visit', homeVisitRoutes);
app.use('/time-and-work', timeAndWorkRoutes);
app.use('/mmas', mmasRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/disclosure-checklist', disclosureChecklistRoutes);
app.use('/appointment-status', appointmentStatusRoutes);
app.use('/appointment-agenda', appointmentAgendaRoutes);

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
