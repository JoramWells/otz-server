/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { type Application } from 'express'
import {Server} from 'socket.io'
import {createServer} 'http'
import { rateLimit } from 'express-rate-limit'
import { connect } from './domain/db/connect'
import { userRoutes } from './routes/user.routes'
import { caregiverRoutes } from './routes/caregiver.routes'
import { caseManagerRoutes } from './routes/caseManager.routes'
import { patientVisitRouter } from './routes/patientVisits.routes'
import { userAvailabilityRoutes } from './routes/userAvailability.routes'
import { patientRouter } from './routes/patient.routes'
import { PatientSessionLog } from './domain/models/patientSessionLog.model'
import { patientSessionLogRouter } from './routes/patientSessionLog.routes'
import { Patient } from './domain/models/patients.models'
import { importantPatientRouter } from './routes/importantPatient.routes'
import { userSessionLogRouter } from './routes/userSession.routes'
import { UserSessionLog } from './domain/models/userSession'

import { User } from './domain/models/user/user.model'
import { countCalHIV } from './utils/countCalHIV'
import { CALHIVRouter } from './routes/calHIV.routes'
import { transferOutRouter } from './routes/transfer/transferOut.routes'
import { transferInRouter } from './routes/transfer/transferIn.routes'
const cors = require('cors')
const app: Application = express()

const server = createServer(app)


// create server
const io = new Server(server,{
  cors:{
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  },
  path: '/socket.io'
})

const PORT = process.env.PORT || 5001
// const corsOption = {
//   origin: ['*']
// }


app.set('trust proxy', true)

const whitelist = ['http://localhost:3000', 'https://otzplus.xyz']

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})

const corsOption = {
  origin: whitelist,
  optionSuccessStatus: 200
}

// app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static('uploads'))


// const corsOption = {
//   origin: (origin: string, callback: (err: Error | null, origin: boolean) => void) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// enable cors
app.use(cors())
app.use(limiter);

( async()=>{
  await countCalHIV()
console.log('runnind')
})()


io.on('connection', socket=>{
let onlineUsers: any[] = []

  console.log('New client to Users microservice!!')

  const connectedAt = new Date()
  const socketPatientID = socket.handshake.query.patientID
  const socketUserID = socket.handshake.query.userID
  const socketModuleID = socket.handshake.query.moduleID;

console.log(socketModuleID, 'socketModuleID!!')

  // 
  socket.on('addNewUser', async (userSocket:string)=>{
    !onlineUsers.some(user=>user.id === userSocket.id) && onlineUsers.push({
      id:userSocket.id,
      clientId: socket.id
    })


    io.emit('getOnlineUsers', onlineUsers)
    console.log(onlineUsers, 'userp')

  });


  
  socket.on('disconnect', async()=>{
    const userDisconnect = onlineUsers.filter(user=>user.clientId)
    onlineUsers = onlineUsers.filter(user=> user.clientId !== socket.id)
    io.emit('getOnlineUsers', onlineUsers)


    // 
    const disconnectedAt = new Date()
    const duration = Math.floor((disconnectedAt-connectedAt)/1000)



      if(socketUserID !== 'undefined'){
    const isUserPresent = await User.findByPk(socketUserID as string)


    if(isUserPresent){
       await UserSessionLog.create({
        userID: socketUserID,
        connectedAt,
        disconnectedAt,
        duration
      })
    }
 
    }

    // check if the user is present in the db
    if(socketPatientID !== 'undefined'){
    const isPresent = await Patient.findByPk(socketPatientID)
    if(isPresent){
       await PatientSessionLog.create({
        patientID: socketPatientID,
        connectedAt,
        disconnectedAt,
        duration
      })
    }
 
    }
    

    // 
    console.log('A user disconnected from Users microservice!!')
  })

})

// confirm cors
app.use('/patients', patientRouter)
app.use('/patient-visits', patientVisitRouter)
app.use('/caregiver', caregiverRoutes)
app.use('/casemanager', caseManagerRoutes)
app.use('/users', userRoutes)
app.use('/user-availability', userAvailabilityRoutes)
app.use('/patient-session-logs', patientSessionLogRouter)
app.use('/important-patients', importantPatientRouter)
app.use('/cal-hiv', CALHIVRouter)
app.use('/transfer-out', transferOutRouter)
app.use('/transfer-in', transferInRouter)
app.use('/user-session-logs', userSessionLogRouter)

connect.authenticate().then(() => {
  console.log('Connected to database successfully')
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error)
})

server.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
