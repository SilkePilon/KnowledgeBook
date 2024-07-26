const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  console.log("Executing test_node with data:", data);

  try {
    await new Promise((resolve, reject) => {
      // Use await here
      bot.on("messagestr", (message, messagePosition, jsonMsg, sender) => {
        console.log("Message received:", message);
        if (message === data.message) {
          console.log("Message matched:", message);
          resolve();
        }
      });

      // Add a timeout to reject the promise if the message is not received within a certain time
      setTimeout(() => {
        reject(new Error("Timeout waiting for the message"));
      }, 30000); // e.g., wait for 30 seconds
    });
    console.log("Message processing complete");
  } catch (error) {
    console.error(error);
    throw new Error("Error waiting for the message");
  }
}

module.exports = { main };
