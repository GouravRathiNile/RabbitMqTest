const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {

    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    await channel.assertQueue(process.env.QUEUE_NAME);

    console.log("RabbitMQ Connected");

}

function publishMessage(message){

    channel.sendToQueue(

        process.env.QUEUE_NAME,

        Buffer.from(JSON.stringify(message))
        

    );
console.log("Message Sent:", message);
}

module.exports={

    connectRabbitMQ,

    publishMessage

};