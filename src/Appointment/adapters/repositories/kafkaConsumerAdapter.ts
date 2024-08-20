import { EachMessagePayload } from "kafkajs";
import { kafka } from "../../config/kafka.config";

const consumers = kafka.consumer({ groupId: "appointment-group" });

// 
// 

const connectConsumer = async()=>{
  try {
    await consumers.connect()
    // await consumers.seek({topic:'complete', partition:0, offset:'earliest'})
  } catch (error) {
    console.log(error)
    setTimeout(connectConsumer, 5000);
  }
}

// 
// (async()=> await connectConsumer())()

// 
const createConsumer = async (groupId: string, topic:string, handleMessage:(message: EachMessagePayload)=>void ) =>{
  const consumer = kafka.consumer({ groupId: groupId});

  // 
  const connectConsumer2 = async () => {
    try {
      await consumer.connect();
    } catch (error) {
      console.log(error);
      setTimeout(connectConsumer2, 5000);
    }
  };

  const start =async () =>{
    try {
      await connectConsumer2();

      // await consumer.connect().then(()=>console.log('Appointment consumer created successfully..'))
      await consumer.subscribe({topic, fromBeginning:true})
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            handleMessage({
              topic,
              partition,
              message,
              heartbeat: function (): Promise<void> {
                throw new Error("Function not implemented.");
              },
              pause: function (): () => void {
                throw new Error("Function not implemented.");
              },
            });
          },
        });
    } catch (error) {
      // setTimeout(start, 5000)
      console.log(error)
    }
  }

   start()
}



// consumer topics
const consumeMessages = async ( topic: string, handleMessage:(message: EachMessagePayload)=>void ) => {
  await connectConsumer()
  await consumers.subscribe({ topic, fromBeginning: true });
  await consumers.run({
    eachMessage: async ({ topic, partition, message }) => {
      await handleMessage({
        topic, partition, message,
        heartbeat: function (): Promise<void> {
          throw new Error("Function not implemented.");
        },
        pause: function (): () => void {
          throw new Error("Function not implemented.");
        }
      });
    },
  });
};

export { createConsumer, consumeMessages };
