/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { type Application } from 'express'
import morgan from 'morgan'

import { connect } from './domain/db/connect'
import { userRoutes } from './routes/user.routes'
import { caregiverRoutes } from './routes/caregiver.routes'
import { caseManagerRoutes } from './routes/caseManager.routes'
import { otzRouter } from './routes/enrollment/otz.routes'
const cors = require('cors')
const patientRoutes = require('./routes/patient.routes')

const app: Application = express()

const PORT = process.env.PORT || 5001
// const corsOption = {
//   origin: ['*']
// }
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// enable cors
app.use(
  cors({
    origin: '*'
  })
)

// confirm cors
app.use('/patients', patientRoutes)
app.use('/caregiver', caregiverRoutes)
app.use('/casemanager', caseManagerRoutes)
app.use('/users', userRoutes)
app.use('/otz-enrollment', otzRouter)

connect.authenticate().then(() => {
  console.log('Connected to database successfully')
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error)
})

app.listen(5001, '0.0.0.0', () => {
  console.log(`App running on http://localhost:${PORT}`)
})
