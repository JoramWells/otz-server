import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:'pharmacy',
    brokers:['kafka:29092']
})

export { kafka }