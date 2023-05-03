import client from 'twilio';

const accountSid = "AC63647697482270fe56829c63bdd7cfd9";
const authToken = "c8c2a0a7b161e6f251fc3d0f96c0de5d";
const verifySid = "VA59794dd742216a0f9cfe143289843463";

const twilioClient = client(accountSid, authToken);

async function sendMessage(mobileNumber, body) {
    try {
    await twilioClient.messages.create({
        to: mobileNumber,
        from: 'whatsapp:+14155238886',
        body: body,
        to: `whatsapp:${mobileNumber}`
    })

    return true;
    } catch (error) {
    return false;
    } 
}

export default sendMessage;
