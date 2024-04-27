/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { type Application } from 'express'
import morgan from 'morgan'

import { CaseManagerRouter } from './routes/casemanager.routes'
import { connect } from './domain/db/connect'
const cors = require('cors')
const patientRoutes = require('./routes/patient.routes')
const careGiverRoutes = require('./routes/caregiver.routes')

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
app.use(cors())

app.use('/patients', patientRoutes)
app.use('/caregiver', careGiverRoutes)
app.use('/casemanager', CaseManagerRouter)

connect.authenticate().then(() => {
  console.log('Connected to database successfully')
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error)
})

app.listen(5001, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
