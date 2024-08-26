/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const PatientVisits = require('../../models/patient/patientVisits.model');
const createConsumer = require('../adapter/kafkaConsumerAdapter.');

async function handleMessage({ message }) {
  try {
    if (message.value === null) {
      // const data = JSON.parse(message.value.toString());
      // return await PatientVisits.create(data);
      console.log('Error');
    }
    const data = JSON.parse(message.value.toString());
    // return await PatientVisits.create(data);
    console.log('Called patient visit consumer**')
  } catch (error) {
    console.log(error);
  }
}

async function startPatientVisitConsumer() {
  console.log('patient visit consumer started in lab service **********');
  await createConsumer('lab-patient-visit', 'lab', handleMessage);
}

module.exports = startPatientVisitConsumer;
