const kafka = require("../../config/kafka.config");

const createConsumer = async(groupId, topic, handleMessage)=>{
    const consumer = kafka.consumer({groupId})

    const connect = async()=>{
        try {
            await consumer.connect()
        } catch (error) {
            console.log(error)
            setTimeout(connect, 5000)
        }
    }

    await connect()

    const start = async () =>{
        try {
            await consumer.subscribe({topic, fromBeginning:true})
            await consumer.run({
                eachMessage: async ({topic, partition, message})=>{
                    await handleMessage({
                        topic,
                        partition,
                        message,
                        heartBeat: function (){
                            throw new Error('Function not implemented')
                        },
                        pause: function(){
                            throw new Error('Function not implemented!!')
                        }
                    })
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    start()
}

module.exports =  createConsumer