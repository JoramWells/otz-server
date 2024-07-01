require('dotenv').config();


const  {Expo, ExpoPushTicket} = require('expo-server-sdk')

function sendPushNotification(){


    const expo = new Expo({
      accessToken: process.env.EXPO_ACCESS_TOKEN,
      useFcmV1: false,
    });

    const messages = []

    for(let pusToken of pusTokens){
        if(!Expo.isExpoPushToken(pusToken)){
            console.error(`Invalid token`)
            continue;
        }
            messages.push(
              {
                to: pusToken,
                sound: "default",
                body: "Jay",
                data: { withSome: "ello!!" },
              })

            }



    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          const tickerChunk =await  expo.sendPushNotificationsAsync(chunk);
          console.log(tickerChunk);
          tickets.push(...(await tickerChunk));
        } catch (error) {
          console.log(error);
        }
      }
    })();

    let receiptsID = []
    for(let ticket of tickets){
        if(ticket.id){
            receiptsID.push(ticket.id)
        }
    }

    let receiptIDChunks = expo.chunkPushNotificationReceiptIds(receiptsID);

    (async()=>{
        for (let chunk of receiptIDChunks){
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk)
                console.log(receipts)

                for(let receiptID in receipts){
                    let {status, message, details} = receipts[receiptID]
                    if(status == 'ok'){
                        continue;
                    }else if(status === 'error'){
                        console.error(`Error code is ${details?.error} `)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    })()

}
sendPushNotification()

// export {sendPushNotification}