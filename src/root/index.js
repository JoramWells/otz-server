/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
// const Sentry = require('@sentry/node');
// const { nodeProfilingIntegration } = require('@sentry/profiling-node');
const { Server } = require('socket.io');
const helmet = require('helmet');

require('dotenv').config();

const sequelize = require('./db/connect');

const locationRoutes = require('./Location/routes/location.routes');
const countyRoutes = require('./Location/routes/county.routes');
const subCountyRoutes = require('./Location/routes/subCounty.routes');
const wardRoutes = require('./Location/routes/ward.routes');
const occupationRoutes = require('./Location/routes/occupation.routes');
const userLocationRoutes = require('./Location/routes/userLocation.routes');
const schoolRoutes = require('./Location/routes/school.routes');
const hospitalRoutes = require('./Hospital/routes/hospital.routes');
const appModulesRouter = require('./routes/appModules.routes');
const appModuleSessionRouter = require('./routes/appModuleSession.routes');

const app = express();

// create redis clietn
// let redisClient;

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// const corsOption = {
//   origin: ['*'],
// };

// enable cors
app.use(cors());
app.use(helmet());

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

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Sentry.Integrations.Express({ app }),
//     nodeProfilingIntegration(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set sampling rate for profiling - this is relative to tracesSampleRate
//   profilesSampleRate: 1.0,
// });

// // The request handler must be the first middleware on the app
// app.use(Sentry.Handlers.requestHandler());

// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// setup server
const server = http.createServer(app);

app.use(express.static('uploads'));
// use morgan
app.use(morgan('dev'));

// setup io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
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

app.use('/location', locationRoutes);
app.use('/user-location', userLocationRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/occupations', occupationRoutes);
app.use('/counties', countyRoutes);
app.use('/sub-counties', subCountyRoutes);
app.use('/wards', wardRoutes);
app.use('/schools', schoolRoutes);
app.use('/app-modules', appModulesRouter);
app.use('/app-module-session', appModuleSessionRouter);

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
