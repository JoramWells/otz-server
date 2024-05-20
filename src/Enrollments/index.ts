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
import { otzRouter } from './routes/otz.routes'
import { pamaRouter } from './routes/pama.routes'
import { pmtctProfileRouter } from './routes/pmtctProfile.routes'
const cors = require('cors')

const app: Application = express()

const PORT = process.env.PORT || 5007
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

// confirm cors
app.use('/otz-enrollment', otzRouter)
app.use('/pama-enrollment', pamaRouter)
app.use('/pmtct-enrollment', pmtctProfileRouter)

connect.authenticate().then(() => {
  console.log('Connected to database successfully')
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error)
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
