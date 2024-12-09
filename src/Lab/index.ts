/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { type Application } from "express";

import { connect } from "./domain/db/connect";
import { Server } from "socket.io";

// import { calculatePills, calculatePills2 } from './utils/calculatePills'
// import { adherenceMonitor } from './utils/adherence'
import { createServer } from "http";
// import { initSentry } from './config/sentryInit'
import { scheduleJob } from "node-schedule";
import { pharmacySocketController } from "./adapters/controllers/socketio/pharmacySocketController";
import { viralLoadRouter } from "./routes/lab/viralLoad.routes";
import { vlAdherence } from "./utils/vlAdheherence";
import { vlJustificationRouter } from "./routes/lab/vlJustification.routes";
import { vitalSignRouter } from "./routes/lab/vitalSigns.routes";
const cors = require("cors");

const app: Application = express();

const PORT = process.env.PORT || 5002;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  path: "/socket.io",
});
// const corsOption = {
//   origin: ['*']
// }

// enable cors *
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// calculatePills()

// scheduleJob("*/1 * * *", function () {
//   adherenceMonitor2();
// });
// adherenceMonitor2();

// scheduleJob("*/15 * * *", function () {
//   calculatePills2();
// });

// calculatePills2();

(async () => {
  console.log(await vlAdherence());
})();
let onlineUsers: any[] = [];

io.on("connection", (socket) => {
  console.log("New client connected to Pharmacy IO server", socket.id);

  //

  //
  // socket.on("getPharmacyNotifications", (pharmacySocket) => {
  //   console.log(pharmacySocket, "pharmacy-data");

  //   io.emit('newPharmacyNotifications', pharmacySocket)
  // });

  pharmacySocketController(io, socket);

  socket.on("addNewUser", (patientID) => {
    !onlineUsers.some((user) => user.patientID === patientID) &&
      onlineUsers.push({
        patientID,
        clientId: socket.id,
      });

    //
    console.log(onlineUsers, "online");

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("morning-uptake", (message) => {
    const receiver = onlineUsers.find(
      (user) => user.patientID === message.recipientID
    );
    if (receiver) {
      io.to(receiver.clientId).emit("getMessage", message);
      console.log("Message sent updated !!", receiver.clientId);
    }

    console.log(message.recipientID, receiver);
    console.log(onlineUsers);
  });

  //
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.clientId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log("A user disconnected from Pharmacy IO server");
  });
});

// app.use("/vital-sign", vitalSignRoutes);
// app.use("/internal-lab-request", internalLabRequestRoutes);
app.use("/viral-load-tests", viralLoadRouter);
app.use("/vl-justification", vlJustificationRouter);
app.use("/vital-signs", vitalSignRouter);
// app.use("/user-location", userLocationRoutes);
// init sentry
// initSentry((app))
// sendRefillNotification()

connect
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to database: ", error);
  });

server.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
