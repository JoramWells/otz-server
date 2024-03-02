/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express,{Application} from 'express';
const cors = require('cors');
import morgan from 'morgan'
const sequelize = require('./domain/db/connect');
const patientRoutes = require('./routes/patient.routes');

const app: Application = express();

const PORT = process.env.PORT || 5001;
const corsOption = {
  origin: ['*'],
};

app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// enable cors
app.use(cors());

app.use('/patient', patientRoutes);

sequelize.authenticate().then(() => {
  console.log('Connected to database successfully');
}).catch((error: Error) => {
  console.error('Unable to connect to database: ', error);
});

app.listen(5001, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
