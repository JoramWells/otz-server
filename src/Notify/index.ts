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
import { PatientNotification } from './domain/models/notify/patientNotifications.model';
import { sendPushNotification } from './utils/fcm';
import { friendRequestRouter } from './routes/chat/request.routes';
// import { sendPushNotification } from './utils/fcm';
import { initSentry } from "./config/sentryInit";
import { startRefillConsumer } from './adapters/consumer/notify.consumer';

const morgan = require('morgan');
require('dotenv').config();


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const sequelize = require('./db/connect');


// const { schedulePatientNotifications, notificationEmitter } = require('./utils/scheduleMessages');

const app = express();

app.use(cors());
// app.use(helmet())
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

// init sentry
initSentry((app))

// setup server
const server = createServer(app);

// use morgan

// setup io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  path: '/socket.io'
});
// set up socket.io instance
app.locals.io = io;

let onlineUsers: any[]=[]

// check connection
io.on('connection', (socket) => {
  console.log('Connected to IO sever', socket.id);

  // 
  socket.on('addNewUser', connect=>{
    const {patientID, expoPushToken} = connect
    !onlineUsers.some(user=>user.patientID === patientID) &&
    onlineUsers.push({
      patientID,
      expoPushToken,
      clientId: socket.id
    })

    // 
      console.log(onlineUsers, "online");

      io.emit("getOnlineUsers", onlineUsers);

  })

  socket.on('newChat', (chats)=>{
    // const user = onlineUsers.find(user=> user.patientID)
    console.log('emitting new chat')
    io.emit('getNewChats', chats)
  })

// 
socket.on('sendMessage', message=>{
  const receiver = onlineUsers.find(user=> user.patientID === message.recipientID)
  if(receiver){
    io.to(receiver.clientId).emit('getMessage', message)
    console.log('Message sent!!', receiver.clientId)

  }
  console.log(message.recipientID, receiver);
})


// 
socket.on('getNotifications', async (socket)=>{
  console.log('Checking user notifications...')
  const receiver = socket.onlineUsers.find(user=>user.id === socket.id)
  console.log(receiver, socket, "receiver online users!!");

  if(receiver){
    // 
    const notificationStatus = await PatientNotification.findAll({
      where:{
        patientID:receiver.id,
        isSent:false
      }
    })

    if(notificationStatus){
      notificationStatus.forEach(async(notification)=>{
          await sendPushNotification([socket.expoPushToken], notification.message)
        
      })

      console.log([socket.expoPushToken, 'expo token'])

      notificationStatus.forEach(async(notification)=>{
        await notification.update({
          isSent: true,
          isSentDate: new Date()
        })
      })
    }


  }
} )

  //
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.clientId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers);
    console.log('A user disconnected');
  });
});

// io.on('error', () => { console.log('err'); });

(async () => {
  try {
    await startRefillConsumer();
  } catch (error) {
    console.log("Error connecting to kafka!!", error);
  }
})();

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
app.use("/friend-requests", friendRequestRouter);



connect.authenticate().then(() => {
  console.log('Connected to database Successfully!');
}).catch((error) => {
  console.error('Unable to connect to database: ', error);
});

server.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = server;
