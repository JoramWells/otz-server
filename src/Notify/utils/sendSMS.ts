import twilio from 'twilio'


async function sendSMS(messageText: string)
{
const twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
try {
    await twilioClient.messages.create({
      body: messageText,
      to: "+254799980846",
      from: process.env.TWILIO_PHONE,
    }); 
} catch (error) {
    console.log(error)
}   
}

export {sendSMS}

