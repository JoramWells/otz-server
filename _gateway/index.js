const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

// const corsOption = {
//   origin: ['http://localhost:3000'],
// };

// adding cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/', proxy('http://localhost:5002'));
app.use('/patient', proxy('http://localhost:5001'));
app.use('/otz-enrollment', proxy('http://localhost:5003'));
// app.use('/users', proxy('http://localhost:5003'));
// app.use('/medication', proxy('http://localhost:5004'));

app.listen(5000, () => {
  console.log('Gateway on port 5000');
});
