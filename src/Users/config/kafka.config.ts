import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'lab',
    brokers:['kafka:29092']
})

export {kafka}