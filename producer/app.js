require("dotenv").config();

const express=require("express");

const {connectRabbitMQ}=require("./rabbitmq");

const orderRoutes=require("./routes/orderRoutes");

const app=express();

app.use(express.json());

connectRabbitMQ();

app.use("/orders",orderRoutes);

app.listen(process.env.PORT,()=>{

console.log(`Producer Running On ${process.env.PORT}`);

});