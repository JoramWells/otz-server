/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');
const { Server } = require('socket.io');
const twilio = require('twilio');
const schedule = require('node-schedule');

require('dotenv').config();

const { Op } = require('sequelize');
const sequelize = require('./db/connect');
const viralLoadRoutes = require('./ViralLoad/routes/viralLoad.routes');
const internalLabRequestRoutes = require('./ViralLoad/routes/internalLabRequests.routes');
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
const smsWhatsappRoutes = require('./Appointment/routes/smsWhatsapp.routes');
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
const measuringUnitRoutes = require('./ArtRegimen/routes/measuringUnit.routes');
const SMSWhatsapp = require('./Appointment/models/smsWhatsapp.model');
const pillRoutes = require('./ArtRegimen/routes/pill.routes');
const dailyUptake = require('./TreatementPlan/middleware/dailyUptake');

const app = express();

// create redis clietn
// let redisClient;

// (async () =>{
//   redisClient = await redis.createClient(6379, 'redis',{})
//   await redisClient.on('connect', function(){
//     console.log('connected to redis |@@@@@@')
//   })

// check error
// await redisClient.on("error", function (error) {
//   console.error('@@@@@@@',error);
// });

// await redisClient.connect()
// app.locals.redisClient = redisClient
// console.log('Connected to redis')
// })

// redisClient.on('connect',function(){
//   console.log('Connected to Redis')
// })

const twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

const runDailyUptakeMiddleware = () => {
  dailyUptake({}, {}, () => {});
};

schedule.scheduleJob({ hour: 0, minute: 0 }, async () => { await runDailyUptakeMiddleware(); });

app.use(dailyUptake);

// job
// schedule.scheduleJob('* * * * * *', async (fireDate) => {
//   const currentTime = new Date();
//   const nextMinute = new Date(currentTime.getTime() + 6000);
//   const smses = await SMSWhatsapp.findAll({
//     where: {
//       scheduledTime: currentTime,
//     },
//   });

//   if (smses) {
//     console.log(`Task was supposed to run at${fireDate}but ran at${new Date()}`);
//   }

// smses.forEach(async (sms) => {
//   try {
//     await twilioClient.messages.create({
//       body: smses.messageText,
//       to: '+254799980846',
//       from: process.env.TWILIO_PHONE,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
// });

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// setup server
const server = http.createServer(app);

// use morgan
app.use(morgan('dev'));

// setup io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// set up socket.io instance
app.locals.io = io;

// check connection
io.on('connection', (socket) => {
  console.log('Connected to IO sever', socket.id);

  //
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
// const corsOption = {
//   origin: ['*'],
// };

// enable cors
// app.use(cors(corsOption));

//

// sendsms
// app.post('/sms/send', async (req, res, next) => {
//   const { to, message } = req.body;
//   console.log(message);

//   try {
//     const response = await twilioClient.messages.create({
//       body: message,
//       to,
//       from: process.env.TWILIO_PHONE,
//     });

//     if (response) {
//       res.json(response);
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// app.use('/patient', patientRoutes);
app.use('/users', userRoutes);
app.use('/viral-load', viralLoadRoutes);
app.use('/internal-lab-request', internalLabRequestRoutes);
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
app.use('/sms', smsWhatsappRoutes);
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
app.use('/pills', pillRoutes);
app.use('/measuring-unit', measuringUnitRoutes);

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

server.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = server;
