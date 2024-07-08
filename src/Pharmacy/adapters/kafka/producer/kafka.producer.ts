import { Message } from "kafkajs";
import { kafka } from "../../../config/kafka.config";

export class KafkaAdapter {
    private readonly kafkaProducer: any
    constructor(){
        this.kafkaProducer = kafka.producer();
    }
    
    async connect (){
        try {
            await this.kafkaProducer.connect();
        } catch (error) {
            console.log('Error connecting to producer')
        }
    }

    async disconnect(){
        return this.kafkaProducer.disconnect()
    }

    async sendMessage(topic: string, messages: Message[]){
        await this.connect()
        if(!Array.isArray(messages)){
            console.log('Expected array messages')
        }
        await this.kafkaProducer.send({ topic, messages });
        await this.disconnect();
    }

}



