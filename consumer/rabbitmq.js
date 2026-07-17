const amqp=require("amqplib");
const { pool } = require("./db");

async function startConsumer(){

const connection=await amqp.connect(process.env.RABBITMQ_URL);

const channel=await connection.createChannel();

await channel.assertQueue(process.env.QUEUE_NAME);

console.log("Waiting For Orders...");

channel.consume(process.env.QUEUE_NAME,async(msg)=>{

try{

const order=JSON.parse(msg.content.toString());

console.log(order);

await pool.query(

`INSERT INTO orders(order_id,product,quantity)

VALUES($1,$2,$3)`,

[

order.orderId,

order.product,

order.quantity

]

);

console.log("Inserted Into PostgreSQL");

channel.ack(msg);

}catch(error){

console.log(error);

}

});

}

module.exports=startConsumer;