import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:'appointment',
    brokers:['kafka:29092']
})

export { kafka }