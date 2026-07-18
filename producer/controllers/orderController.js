const { publishMessage } = require("../rabbitmq");

const createOrder = async (req, res) => {
    try {

        const { orderId, product, quantity } = req.body;

       
console.log(req.body);
        publishMessage(req.body);

        return res.status(201).json({
            success: true,
            message: "Order Added To Queue",
            data: req.body
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createOrder
};