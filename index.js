/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
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
const locationRoutes = require('./Location/routes/location.routes');
const countyRoutes = require('./Location/routes/county.routes');
const subCountyRoutes = require('./Location/routes/subCounty.routes');
const wardRoutes = require('./Location/routes/ward.routes');
const occupationRoutes = require('./Location/routes/occupation.routes');
const userLocationRoutes = require('./Location/routes/userLocation.routes');
const schoolRoutes = require('./Location/routes/school.routes');
const patientRoutes = require('./Location/routes/patient.routes');
const caregiverRoutes = require('./Patient/routes/caregiver.routes');
const hospitalRoutes = require('./Hospital/routes/hospital.routes');
const regimenPrescriptionRoutes = require('./ArtRegimen/routes/addPrescription.routes');
const artSwitchReasons = require('./ArtRegimen/routes/artSwitchReason.routes');
const artRegimenSwitchRoutes = require('./ArtRegimen/routes/artRegimenSwitch.routes');


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

// app.use('/patient', patientRoutes);
app.use('/users', userRoutes);
app.use('/viral-load', viralLoadRoutes);
app.use('/art-regimen', artRegimeRoutes);
app.use('/art-regimen-phase', artRegimePhaseRoutes);
app.use('/art-regimen-category', artRegimenCategoryRoutes);
app.use('/art-switch-reason', artSwitchReasons);
app.use('/art-regimen-switch', artRegimenSwitchRoutes);
app.use('/home-visit-reason', homeVisitReasonRoute);
app.use('/home-visit-frequency', homeVisitFrequencyRoutes);
app.use('/home-visit', homeVisitRoutes);
app.use('/time-and-work', timeAndWorkRoutes);
app.use('/mmas', mmasRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/disclosure-checklist', disclosureChecklistRoutes);
app.use('/appointment-status', appointmentStatusRoutes);
app.use('/appointment-agenda', appointmentAgendaRoutes);
app.use('/location', locationRoutes);
app.use('/user-location', userLocationRoutes);
app.use('/caregiver', caregiverRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/art-prescription', regimenPrescriptionRoutes);
app.use('/occupations', occupationRoutes);
app.use('/counties', countyRoutes);
app.use('/sub-counties', subCountyRoutes);
app.use('/wards', wardRoutes);
app.use('/schools', schoolRoutes);
app.use('/patients', patientRoutes);

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

app.listen(5000, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
