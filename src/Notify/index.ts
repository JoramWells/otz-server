/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import express from "express";
import { connect } from "./db/connect";
import { scheduleJob } from "node-schedule";
import { createServer } from "http";
// const Sentry = require('@sentry/node');
// const { nodeProfilingIntegration } = require('@sentry/profiling-node');
import { Server } from "socket.io";
import helmet from "helmet";
// import { dailyPillUpdate } from './utils/dailyPillUpdate';

import { notificationTypeRouter } from "./routes/notify/notificationType.routes";
import { notificationRouter } from "./routes/notify/notification.routes";
import { notificationCategoryRouter } from "./routes/notify/notificationCategory.routes";
import { notificationSubCategoryRouter } from "./routes/notify/notificationSubCategory.routes";
import { userNotificationRouter } from "./routes/notify/userNotification.routes";
import { patientNotificationRouter } from "./routes/notify/patientNotification.routes";
import { messageTextReplyRouter } from "./routes/notify/messageTextReply.routes";
import { schedulePatientNotifications } from "./utils/scheduleMessages";
import { chatRouter } from "./routes/chat/chat.routes";
import { messageRouter } from "./routes/chat/messages.routes";
import { PatientNotification } from "./domain/models/notify/patientNotifications.model";
import { sendPushNotification } from "./utils/fcm";
import { friendRequestRouter } from "./routes/chat/request.routes";
// import { sendPushNotification } from './utils/fcm';
// import { initSentry } from "./config/sentryInit";
import { startRefillConsumer } from "./adapters/consumer/notify.consumer";
import { Messages } from "./domain/models/chats/messages.model";
import { phoneNumberVerificationRouter } from "./routes/contacts/phoneNumberVerification.routes";
import { addPhoneNumber } from "./utils/addPhoneNumber";

const morgan = require("morgan");
require("dotenv").config();


// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
const cors = require("cors");
const sequelize = require("./db/connect");

// const { schedulePatientNotifications, notificationEmitter } = require('./utils/scheduleMessages');

const app = express();

app.use(cors());
// app.use(helmet())
//
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("uploads"));

// morgan
app.use(morgan("dev"));

// scheduleJob({ hour: 0, minute: 0 }, () => { dailyPillUpdate(); });
// scheduleJob('0 0 * *',)
// dailyPillUpdate();

schedulePatientNotifications();

// realtime

// setInterval(schedulePatientNotifications, 3600000); // 3600000 milliseconds = 1 hour

// Swagger configuration options
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Publication API',
//       description: 'CRUD API for managing publications',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./routes/*.js'], // Path to the API routes folder
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// init sentry
// initSentry((app))

// setup server
const server = createServer(app);
scheduleJob(('*/30 * * *'), async function(){ await addPhoneNumber();})

// (async () => {
//   await addPhoneNumber();
// })();

// use morgan

// setup io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  path: "/socket.io",
});
// set up socket.io instance
app.locals.io = io;

let onlineUsers: any[] = [];

// check connection
io.on("connection", (socket) => {
  console.log("Connected to IO sever", socket.id);

  //
  socket.on("addNewUsers", (connect) => {
    const { patientID, expoPushToken } = connect;
    !onlineUsers.some((user) => user.patientID === patientID) &&
      onlineUsers.push({
        patientID,
        expoPushToken,
        clientId: socket.id,
      });

    //
    console.log(onlineUsers, "online");

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("newChat", (chats) => {
    // const user = onlineUsers.find(user=> user.patientID)
    console.log("emitting new chat", chats.clientID);
    io.to(chats.clientID).emit("getNewChats", chats);
  });

  // add number

  //

  // socket.on('sendMessage', socket=>{
  // const receiver = onlineUsers.find(user=> user.patientID === message.recipientID)
  // const receiver = socket.onlineUsers?.find(user=> user.id === socket.message.id)
  // if(receiver){
  //   io.to(receiver.clientId).emit('getMessage', socket.message)
  //   console.log('Message sent!!', receiver.clientId)

  // }
  //     io.emit("getMessage", socket);

  //   console.log(socket, socket.clientID, 'Sendin..');
  // })

  socket.on("getPendingMessage", async (socket) => {
    // console.log("Checking user pending messages...", socket.onlineUsers);

    // const receiver = socket.onlineUsers.find((user: PatientAttributes) => user.id === socket.id);
    // if(receiver){
    const messageStatus = await Messages.findAll({
      where: {
        senderID: socket.id,
        isSent: false,
      },
    });

    //
    if (messageStatus) {
      console.log(messageStatus);
      messageStatus.forEach(async (message) => {
        await Promise.all([
          sendPushNotification([socket.expoPushToken], {
            body: message.text as string,
            id: message.chatID,
          }),
          // message.update({
          //   isSent: true
          // })
        ]);
      });

      //
    }
    // }
  });

  //
  socket.on("getNotifications", async (socket) => {
    const receiver = socket.onlineUsers.find((user) => user.id === socket.id);
    console.log(socket, "receiver online users!!");

    if (receiver) {
      //
      const notificationStatus = await PatientNotification.findAll({
        where: {
          patientID: receiver.id,
          isSent: false,
        },
      });

      if (notificationStatus) {
        notificationStatus.forEach(async (notification) => {
          await sendPushNotification(
            [socket.expoPushToken],
            notification.message
          );
        });

        console.log([socket.expoPushToken, "expo token"]);

        notificationStatus.forEach(async (notification) => {
          await notification.update({
            isSent: true,
            isSentDate: new Date(),
          });
        });
      }
    }
  });

  //
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.clientId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log("A user disconnected");
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
app.use("/phone-number-verification", phoneNumberVerificationRouter);

connect
  .authenticate()
  .then(() => {
    console.log("Connected to database Successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });

server.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = server;
