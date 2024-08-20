/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { type Application } from 'express'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import { connect } from './domain/db/connect'
import { userRoutes } from './routes/user.routes'
import { caregiverRoutes } from './routes/caregiver.routes'
import { caseManagerRoutes } from './routes/caseManager.routes'
import { nextOfKinRouter } from './routes/nextOfKin.routes'
import { patientVisitRouter } from './routes/patientVisits.routes'
import { userAvailabilityRoutes } from './routes/userAvailability.routes'
import { patientRouter } from './routes/patient.routes'
const cors = require('cors')
const app: Application = express()

const PORT = process.env.PORT || 5001
// const corsOption = {
//   origin: ['*']
// }

app.set('trust proxy', true)

const whitelist = ['http://localhost:3000', 'https://otzplus.xyz']

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})

const corsOption = {
  origin: whitelist,
  optionSuccessStatus: 200
}

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

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
app.use(limiter)

// confirm cors
app.use('/patients', patientRouter)
app.use('/patient-visits', patientVisitRouter)
app.use('/caregiver', caregiverRoutes)
app.use('/casemanager', caseManagerRoutes)
app.use('/users', userRoutes)
app.use('/user-availability', userAvailabilityRoutes)
app.use('/next-of-kin', nextOfKinRouter)

connect.authenticate().then(() => {
  console.log('Connected to database successfully')
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error)
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
