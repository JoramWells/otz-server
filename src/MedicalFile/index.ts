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

import { adverseDrugsReactionRepositoryRouter } from './routes/adverseDrugsReaction.routes'
import { allergiesRouter } from './routes/allergies.routes'
import { patientAllergiesRouter } from './routes/patientAllergies.routes'
import { chronicIllnessRouter } from './routes/chronicIllness.routes'
const cors = require('cors')

const app: Application = express()

const PORT = process.env.PORT || 5006
// const corsOption = {
//   origin: ['*']
// }

// enable cors *
app.use(cors())

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// confirm cors
app.use('/adverse-drugs', adverseDrugsReactionRepositoryRouter)
app.use('/allergies', allergiesRouter)
app.use('/chronic-illness', chronicIllnessRouter)
app.use('/patient-allergies', patientAllergiesRouter)

connect.authenticate().then(() => {
  console.log('Connected to database successfully')
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error)
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
