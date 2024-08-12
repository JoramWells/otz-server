const PatientVisits = require("../../models/patient/patientVisits.model");
const createConsumer = require("../adapter/kafkaConsumerAdapter.");

async function handleMessage({message}){
    try {
        if(message.value){
            const data = JSON.parse(message.value.toString());
            return await PatientVisits.create(data)
        }
    } catch (error) {
        console.log(error)
    }
}

async function startPatientVisitConsumer (){
    
    console.log('patient visit consumer started in lab service **********')
    await createConsumer('lab-patient-visit', 'lab', handleMessage)
}

module.exports = startPatientVisitConsumer