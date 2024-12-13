/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import express from "express";
import { connect } from "./db/connect";
import { scheduleJob } from "node-schedule";
// import * as schedule from "node-schedule";
import { createServer } from "http";
import helmet from "helmet";
// const Sentry = require("@sentry/node");
// import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { Server } from "socket.io";
import compression from "compression";
import { disclosureChecklistRouter } from "./routes/treatmentplan/disclosureChecklist.routes";
import { followUpChecklistRouter } from "./routes/treatmentplan/followUpChecklist.routes";
import { mmasFourRouter } from "./routes/treatmentplan/mmasFour.routes";
import { mmasEightRouter } from "./routes/treatmentplan/mmasEight.routes";
import { partialDisclosureRouter } from "./routes/treatmentplan/partial/partialDisclosure.routes";
import { disclosureEligibilityRouter } from "./routes/treatmentplan/partial/disclosureEligibility.routes";
import { childCaregiverReadinessRouter } from "./routes/treatmentplan/partial/childCaregiverReadiness.routes";

import { AppModuleSession } from "./domain/models/appModules/appModuleSession.model";
import { AppModule } from "./domain/models/appModules/appModules";
import { executeDisclosureRouter } from "./routes/treatmentplan/full/executeDisclosure.routes";
import { postDisclosureRouter } from "./routes/treatmentplan/full/postDisclosure.routes";
import { updatePartialDisclosure } from "./utils/updatePartialDisclosure";
import { updateFullDisclosure } from "./utils/updateFullDisclosure";
import { fullDisclosureRouter } from "./routes/treatmentplan/full/fullDiclosure.routes";

require("dotenv").config();

// const swaggerUi = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

// const { schedulePatientNotifications, notificationEmitter } = require('./utils/scheduleMessages');

const app = express();

app.use(cors());

app.use(helmet());

//
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(express.static("uploads"));

// const shouldCompress = (req: Request,res:Response) =>{
//   if(req.headers['x-no-compression']){
//     return false
//   }

//   return compression.filter(req,res)
// }

// use compression
app.use(compression({ threshold: 9 }));

// morgan
// app.use(morgan('dev'));

// scheduleJob('0 0 * *',)

const fourHours = new Date(Date.now() + 4 * 60 * 60 * 1000);
const twoHours = new Date(Date.now() + 2 * 60 * 60 * 1000);

scheduleJob(fourHours, async function () {
    await Promise.all([
      updatePartialDisclosure(),
      updateFullDisclosure(),
    ]);
});


const monitorConfig = {
  schedule: {
    type: "crontab",
    value: "* * * * *",
  },
  checkinMargin: 2,
  maxRuntime: 10,
};

// setup server
const server = createServer(app);

// use morgan

// setup io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
// set up socket.io instance
app.locals.io = io;


// check connection
io.on("connection", (client) => {
  const socketUserID = client.handshake.query.userID;
  const socketModuleID = client.handshake.query.moduleID;

  console.log("Connected to Appointment IO sever", client.id);

  //
  const connectedAt = new Date();

  //
  client.on("disconnect", async () => {
    console.log("A user disconnected");
    const disconnectedAt = new Date();
    const duration = Math.floor((disconnectedAt - connectedAt) / 1000);
    if (
      socketModuleID &&
      socketUserID &&
      socketModuleID !== "undefined" &&
      socketModuleID !== "null" &&
      socketModuleID !== null
    ) {
      const isModulePresent = await AppModule.findByPk(socketModuleID);
      if (isModulePresent) {
        await AppModuleSession.create({
          userID: socketUserID,
          appModuleID: isModulePresent.id,
          disconnectedAt: disconnectedAt,
          connectedAt: connectedAt,
          duration: duration,
        });
      }
    }
  });
});

// io.on('error', () => { console.log('err'); });

// notification realtime
// notificationEmitter.on('notificationCreated', (data) => {
//   io.emit('notificationCreated', []);
//   console.log('Success', data);
// });

const PORT = process.env.PORT || 5006;

app.use("/mmas-4", mmasFourRouter);
app.use("/mmas-8", mmasEightRouter);

app.use("/disclosure-checklist", disclosureChecklistRouter);
app.use("/follow-checklist", followUpChecklistRouter);

app.use("/partial-disclosure", partialDisclosureRouter);
app.use("/disclosure-eligibility", disclosureEligibilityRouter);
app.use("/child-readiness", childCaregiverReadinessRouter);
app.use("/execute-disclosure", executeDisclosureRouter);
app.use("/post-disclosure", postDisclosureRouter);
app.use("/full-disclosure", fullDisclosureRouter);


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
