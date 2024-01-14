module.exports = {
  name: "ping",
  run: async (client, message, args) => {
    const start = Date.now();

    async function getDatabaseLatency() {
      await client.db4.get("members_np");
      return Date.now() - start;
    }

    const messageLatency = (Date.now() - message.createdTimestamp) / 3;
    const apiLatency = client.ws.ping;
    const dbLatency = await getDatabaseLatency();

    const messageContent = `Pong🏓: ${messageLatency.toFixed(0)}ms | API: ${apiLatency.toFixed(0)}ms | Database: ${dbLatency.toFixed(2)}ms\nI'm up and running!`;

    return message.channel.send(messageContent);
  },
};
