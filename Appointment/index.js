/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const express = require('express');
const schedule = require('node-schedule');
const http = require('http');
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');
const { Server } = require('socket.io');
const morgan = require('morgan');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const sequelize = require('./db/connect');

const appointmentRoutes = require('./routes/appointment.routes');
const appointmentStatusRoutes = require('./routes/appointmentStatus.routes');
const appointmentAgendaRoutes = require('./routes/appointmentAgenda.routes');
const smsWhatsappRoutes = require('./routes/smsWhatsapp.routes');
const notificationTypeRoutes = require('./routes/notify/notificationType.routes');
const messageTextRepliesTypeRoutes = require('./routes/notify/messageTextReply.routes');
const notificationCategoryRoutes = require('./routes/notify/notificationCategory.routes');
const notificationSubCategoryRoutes = require('./routes/notify/notificationSubCategory.routes');
const notificationRoutes = require('./routes/notify/notification.routes');
const userNotificationRoutes = require('./routes/notify/userNotifications.routes');
const patientNotificationRoutes = require('./routes/notify/patientNotifications.routes');
// const swaggerDocument = require('./swagger.json');

//
const timeAndWorkRoutes = require('./routes/treatmentplan/timeAndWork.routes');
const chatRoutes = require('./routes/chat/chat.routes');
const chatMessagesRoutes = require('./routes/chat/messages.routes');
const mmasRoutes = require('./routes/treatmentplan/mmas.routes');
const disclosureChecklistRoutes = require('./routes/treatmentplan/disclosureChecklist.routes');
const dailyUptakeRoutes = require('./routes/treatmentplan/uptake.routes');
const dailyUptake = require('./middleware/dailyUptake');
const schedulePatientNotifications = require('./utils/scheduleMessages');

const app = express();
//
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// morgan
app.use(morgan('dev'));

schedule.scheduleJob({ hour: 0, minute: 0 }, () => { dailyUptake(); });
schedulePatientNotifications();
setInterval(schedulePatientNotifications, 3600000); // 3600000 milliseconds = 1 hour

// dailyUptake();

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Publication API',
      description: 'CRUD API for managing publications',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

const PORT = process.env.PORT || 5005;

app.use('/appointments', appointmentRoutes);

app.use('/appointment-status', appointmentStatusRoutes);
app.use('/appointment-agenda', appointmentAgendaRoutes);
app.use('/chats', chatRoutes);
app.use('/chat-messages', chatMessagesRoutes);
app.use('/sms', smsWhatsappRoutes);
app.use('/notification-types', notificationTypeRoutes);
app.use('/notifications', notificationRoutes);
app.use('/notification-categories', notificationCategoryRoutes);
app.use('/notification-sub-categories', notificationSubCategoryRoutes);
app.use('/user-notifications', userNotificationRoutes);
app.use('/patient-notifications', patientNotificationRoutes);
app.use('/messages-text-replies', messageTextRepliesTypeRoutes);
//
app.use('/time-and-work', timeAndWorkRoutes);

app.use('/mmas', mmasRoutes);
app.use('/disclosure-checklist', disclosureChecklistRoutes);
app.use('/daily-uptake', dailyUptakeRoutes);

sequelize.authenticate().then(() => {
  console.log('Connected to database successfully!');
}).catch((error) => {
  console.error('Unable to connect to database: ', error);
});

server.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = server;
