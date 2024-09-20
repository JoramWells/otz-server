/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import express from "express";
import { appointmentRouter } from "./routes/appointments/appointment.routes";
import { connect } from "./db/connect";
import { scheduleJob } from "node-schedule";
import * as schedule from "node-schedule";
import { createServer } from "http";
import helmet from "helmet";
const Sentry = require("@sentry/node");
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { Server } from "socket.io";
import { appointmentAgendaRouter } from "./routes/appointments/appointmentAgenda.routes";
import { appointmentStatusRouter } from "./routes/appointments/appointmentStatus.routes";
import compression from "compression";
import { disclosureChecklistRouter } from "./routes/treatmentplan/disclosureChecklist.routes";
import { followUpChecklistRouter } from "./routes/treatmentplan/followUpChecklist.routes";
import { mmasFourRouter } from "./routes/treatmentplan/mmasFour.routes";
import { mmasEightRouter } from "./routes/treatmentplan/mmasEight.routes";
import { partialDisclosureRouter } from "./routes/treatmentplan/partial/partialDisclosure.routes";
import { disclosureEligibilityRouter } from "./routes/treatmentplan/partial/disclosureEligibility.routes";
import { childCaregiverReadinessRouter } from "./routes/treatmentplan/partial/childCaregiverReadiness.routes";
import { logger } from "./utils/logger";
import {
  markMissedAppointments,
  rescheduleOnUnavailable,
} from "./utils/markMissedAppointment";
import {
  startAppointmentConsumer,
  startCompleteAppointmentConsumer,
} from "./adapters/consumer/appointment.consumer";
import { appointmentMessageRouter } from "./routes/appointments/messages.routes";
import { google } from "googleapis";

require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
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

markMissedAppointments();
rescheduleOnUnavailable();

// dailyPillUpdate();

// schedulePatientNotifications();

// realtime

// setInterval(schedulePatientNotifications, 3600000); // 3600000 milliseconds = 1 hour

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Publication API",
      description: "CRUD API for managing publications",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Path to the API routes folder
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

//
const monitorConfig = {
  schedule: {
    type: "crontab",
    value: "* * * * *",
  },
  checkinMargin: 2,
  maxRuntime: 10,
};

//
// const scheduleWithCheckIn = Sentry.cron.instrumentNodeSchedule(schedule);
// scheduleWithCheckIn.scheduleJob('daily-pill-update-cron','0 0 * * *', () => {
//   dailyPillUpdate();
// }, monitorConfig);

// Sentry.withMonitor('monitor-daily-pill-update',()=>{
//   dailyPillUpdate()
// })

//
const checkInId = Sentry.captureCheckIn({
  monitorSlug: "monitor-daily-pill-update",
  status: "in_progress",
});

// ok
Sentry.captureCheckIn({
  checkInId,
  monitorSlug: "monitor-daily-pill-update",
  status: "ok",
});

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
  console.log("Connected to IO sever", client.id);

  //
  client.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// io.on('error', () => { console.log('err'); });

// notification realtime
// notificationEmitter.on('notificationCreated', (data) => {
//   io.emit('notificationCreated', []);
//   console.log('Success', data);
// });

const PORT = process.env.PORT || 5005;

// sasa
//
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const scopes = [
  "https://www.googleapis.com/auth/blogger",
  "https://www.googleapis.com/auth/calendar",
];

app.get("/", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  console.log("get");

  res.redirect(url);
});



app.get("/google/redirect", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    res.cookie('tokens', tokens)
    res.redirect('/events')
    console.log(tokens, 'tokens');
    // res.send("its working!!");
  } catch (error) {
    console.error(error);
    res.status(500).send('Google Authentication failed!!')
  }
});

app.get('/events', async(req,res)=>{
  // const tokens = req.cookies.tokens
  // oauth2Client.setCredentials(tokens)
  console.log(oauth2Client.credentials.access_token)

  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: oauth2Client
    })

    const events = await calendar.events.list({
      calendarId:'primary',
      timeMin:(new Date()).toISOString(),
      maxResults:10,
      singleEvents: true,
      orderBy:'startTime'
    })
    // res.send('events')

    res.json(events.data.items)
    
  } catch (error) {
    console.error(error)
    res.status(500).send('Error Fetching calendar events')
  }

})

app.use("/appointments", appointmentRouter);
app.use("/appointment-agenda", appointmentAgendaRouter);
app.use("/appointment-status", appointmentStatusRouter);
app.use("/mmas-4", mmasFourRouter);
app.use("/mmas-8", mmasEightRouter);

app.use("/disclosure-checklist", disclosureChecklistRouter);
app.use("/follow-checklist", followUpChecklistRouter);

app.use("/partial-disclosure", partialDisclosureRouter);
app.use("/disclosure-eligibility", disclosureEligibilityRouter);
app.use("/child-readiness", childCaregiverReadinessRouter);
app.use("/appointment-messages", appointmentMessageRouter);

connect
  .authenticate()
  .then(() => {
    console.log("Connected to database Successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });

//
(async () => {
  try {
    await startAppointmentConsumer();
    //  await startCompleteAppointmentConsumer();
  } catch (error) {
    console.log("Error connecting to kafka!!", error);
  }
})();

server.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = server;
