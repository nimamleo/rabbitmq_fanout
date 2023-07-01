const amqp = require("amqplib");

const exchangeName = "exchangeName";

async function sendMsg() {
    const connection = await amqp.connect("amqp://;oca;host:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout");
    channel.publish(exchangeName, "", Buffer.from("snde msg"));
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 1000);
}

sendMsg();
