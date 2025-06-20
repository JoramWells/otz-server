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
import { artRouter } from "./routes/art.routes";
import { measuringUnitRouter } from "./routes/measuringUnit.routes";
import { artCategoryRouter } from "./routes/artCategory.routes";
import { artSwitchReasonRouter } from "./routes/artSwitcReason.routes";
import { prescriptionRouter } from "./routes/prescription.routes";
import { artPrescriptionRouter } from "./routes/artPrescription.routes";
// import { calculatePills, calculatePills2 } from './utils/calculatePills'
// import { adherenceMonitor } from './utils/adherence'
import { pillUptakeRouter } from "./routes/pillUptake.routes";
import { createServer } from "http";
// import { initSentry } from './config/sentryInit'
import { sendRefillNotification } from "./utils/sendRefillNotification";
import { timeAndWorkRouter } from "./routes/treatmentplan/timeAndWork.routes";
import { enhancedAdherenceRouter } from "./routes/treatmentplan/enhancedAdherence.routes";
import { calculatePills2 } from "./utils/calculatePills";
import { adherenceMonitor2 } from "./utils/adherence2";
import { scheduleJob } from "node-schedule";
import { homeVisitReasonRouter } from "./routes/homevisit/homeVisitReason.routes";
import { homeVisitFrequencyRouter } from "./routes/homevisit/homeVisitFrequency.routes";
import { homeVisitRouter } from "./routes/homevisit/homeVisit.routes";
import { homeVisitConfigRouter } from "./routes/homevisit/homeVisitConfig.routes";
import { pharmacySocketController } from "./adapters/controllers/socketio/pharmacySocketController";
import { otzRouter } from "./routes/enrollment/otz.routes";
import { pamaRouter } from "./routes/enrollment/pama.routes";
import { pmtctProfileRouter } from "./routes/enrollment/pmtctProfile.routes";
import { viralLoadRouter } from "./routes/lab/viralLoad.routes";
import { vlJustificationRouter } from "./routes/lab/vlJustification.routes";
import { vitalSignRouter } from "./routes/lab/vitalSigns.routes";
import { mmasFourRouter } from "./routes/treatmentplan/mmasFour.routes";
import { mmasEightRouter } from "./routes/treatmentplan/mmasEight.routes";
import { disclosureChecklistRouter } from "./routes/treatmentplan/disclosureChecklist.routes";
import { followUpChecklistRouter } from "./routes/treatmentplan/followUpChecklist.routes";
import { partialDisclosureRouter } from "./routes/treatmentplan/partial/partialDisclosure.routes";
import { disclosureEligibilityRouter } from "./routes/treatmentplan/partial/disclosureEligibility.routes";
import { childCaregiverReadinessRouter } from "./routes/treatmentplan/partial/childCaregiverReadiness.routes";
import { executeDisclosureRouter } from "./routes/treatmentplan/full/executeDisclosure.routes";
import { postDisclosureRouter } from "./routes/treatmentplan/full/postDisclosure.routes";
import { fullDisclosureRouter } from "./routes/treatmentplan/full/fullDiclosure.routes";
import { disclosureTrackerRouter } from "./routes/treatmentplan/disclosureTracker.routes";

const cors = require("cors");

const app: Application = express();

const PORT = process.env.PORT || 5003;

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

scheduleJob("*/1 * * *", function () {
  adherenceMonitor2();
});
// adherenceMonitor2();

scheduleJob("*/15 * * *", function () {
  calculatePills2();
});

// calculatePills2();

// (async () => {
//   console.log(await vlAdherence());
// })();
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

// confirm cors
app.use("/art-regimen", artRouter);
app.use("/art-regimen-category", artCategoryRouter);
app.use("/measuring-unit", measuringUnitRouter);
app.use("/art-switch-reason", artSwitchReasonRouter);
app.use("/prescription", prescriptionRouter);
app.use("/art-prescription", artPrescriptionRouter);
app.use("/daily-uptake", pillUptakeRouter);
app.use("/time-and-work", timeAndWorkRouter);
app.use("/enhanced-adherence", enhancedAdherenceRouter);

// homevisit
app.use("/home-visit-reason", homeVisitReasonRouter);
app.use("/home-visit-frequency", homeVisitFrequencyRouter);
app.use("/home-visit", homeVisitRouter);
app.use("/home-visit-config", homeVisitConfigRouter);
app.use("/otz-enrollment", otzRouter);
app.use("/pama-enrollment", pamaRouter);
app.use("/pmtct-enrollment", pmtctProfileRouter);
// app.use("/vital-sign", vitalSignRoutes);
// app.use("/internal-lab-request", internalLabRequestRoutes);
// app.use("/user-location", userLocationRoutes);
// init sentry
// initSentry((app))
// sendRefillNotification()

// lab
app.use("/viral-load-tests", viralLoadRouter);
app.use("/vl-justification", vlJustificationRouter);
app.use("/vital-signs", vitalSignRouter);

// tt
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
app.use("/disclosure-tracker", disclosureTrackerRouter);


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
