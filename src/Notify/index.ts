/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import express from 'express';
import { connect } from './db/connect';
import {scheduleJob} from 'node-schedule';
import {createServer} from 'http';
// const Sentry = require('@sentry/node');
// const { nodeProfilingIntegration } = require('@sentry/profiling-node');
import { Server } from 'socket.io';
import helmet from 'helmet'
// import { dailyPillUpdate } from './utils/dailyPillUpdate';

import { notificationTypeRouter } from './routes/notify/notificationType.routes';
import { notificationRouter } from './routes/notify/notification.routes';
import { notificationCategoryRouter } from './routes/notify/notificationCategory.routes';
import { notificationSubCategoryRouter } from './routes/notify/notificationSubCategory.routes';
import { userNotificationRouter } from './routes/notify/userNotification.routes';
import { patientNotificationRouter } from './routes/notify/patientNotification.routes';
import { messageTextReplyRouter } from './routes/notify/messageTextReply.routes';
import { schedulePatientNotifications } from './utils/scheduleMessages';
import { chatRouter } from './routes/chat/chat.routes';
import { messageRouter } from './routes/chat/messages.routes';
import { sendPushNotification } from './utils/fcm';
const morgan = require('morgan');
require('dotenv').config();


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const sequelize = require('./db/connect');

// const { schedulePatientNotifications, notificationEmitter } = require('./utils/scheduleMessages');

const app = express();

app.use(cors());
app.use(helmet())
//
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static('uploads'))

// morgan
app.use(morgan('dev'));

// scheduleJob({ hour: 0, minute: 0 }, () => { dailyPillUpdate(); });
// scheduleJob('0 0 * *',)
// dailyPillUpdate();

schedulePatientNotifications();

// realtime

// setInterval(schedulePatientNotifications, 3600000); // 3600000 milliseconds = 1 hour


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
const server = createServer(app);

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
io.on('connection', (client) => {
  console.log('Connected to IO sever', client.id);

  //
  client.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// io.on('error', () => { console.log('err'); });

// notification realtime
// notificationEmitter.on('notificationCreated', (data) => {
//   io.emit('notificationCreated', []);
//   console.log('Success', data);
// });


// sendPushNotification()

const PORT = process.env.PORT || 5008;



app.use("/notification-types", notificationTypeRouter);
app.use("/notifications", notificationRouter);
app.use("/notification-categories", notificationCategoryRouter);
app.use("/notification-sub-categories", notificationSubCategoryRouter);
app.use("/user-notifications", userNotificationRouter);
app.use("/patient-notifications", patientNotificationRouter);
app.use("/messages-text-replies", messageTextReplyRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);



connect.authenticate().then(() => {
  console.log('Connected to database Successfully!');
}).catch((error) => {
  console.error('Unable to connect to database: ', error);
});

server.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = server;
