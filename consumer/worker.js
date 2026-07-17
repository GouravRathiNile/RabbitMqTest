require("dotenv").config();

console.log("Password:", process.env.DB_PASSWORD);
const { connectDB } = require("./db");
const startConsumer = require("./rabbitmq");
const startApp = async () => {
    await connectDB();
    await startConsumer();
};

startApp();