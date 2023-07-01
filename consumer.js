const amqp = require("amqplib");

const exchangeName = "exchangeName";

async function getMsg() {
    const connection = await amqp.connect("amqp:localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout");
    const asertedQueue = await channel.assertQueue("", { exclusive: true });
    channel.bindQueue(asertedQueue.queue, (msg) => {
        console.log(msg);
        channel.ack(msg);
    });
}

getMsg();
