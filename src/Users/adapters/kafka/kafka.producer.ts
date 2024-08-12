import { Message } from "kafkajs"
import { kafka } from "../../config/kafka.config"

export class KafkaAdapter{
    private readonly kafkaProducer: any
    constructor (){

        this.kafkaProducer = kafka.producer()
    }

    async connect (){
        try {
            await this.kafkaProducer.connect()
        } catch (error) {
            console.log(error)
        }
    }

    async disconnect(){
        return this.kafkaProducer.disconnect()
    }

    async sendMessage (topic: string, messages: Message[]){
    try {
        await this.connect();
        if (!Array.isArray(messages)) {
            console.log("Expected completed messages");
        }

        await this.kafkaProducer.send({ topic, messages });
        await this.disconnect();
    } catch (error) {
        console.log(error)
}
    }
}