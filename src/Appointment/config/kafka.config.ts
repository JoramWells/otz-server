import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:'appointment',
    brokers:['kafka:9092']
})

export { kafka }