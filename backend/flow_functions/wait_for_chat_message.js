const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  console.log("Executing test_node with data:", data);

  try {
    await new Promise((resolve, reject) => {
      const messageListener = (message, messagePosition, jsonMsg, sender) => {
        console.log("Message received:", message);
        if (
          toString(message)
            .toLocaleLowerCase()
            .includes(toString(data.keyword).toLocaleLowerCase())
        ) {
          console.log("Message matched:", message);
          bot.off("messagestr", messageListener); // Remove this specific listener
          resolve();
        }
      };

      // Add the listener
      bot.on("messagestr", messageListener);

      // Add a timeout to reject the promise if the message is not received within a certain time
      const timeoutId = setTimeout(() => {
        bot.off("messagestr", messageListener); // Remove the listener in case of timeout
        reject(new Error("Timeout waiting for the message"));
      }, data["timeout (seconds)"] * 1000);
    });
    console.log("Message processing complete");
  } catch (error) {
    console.error(error);
    throw new Error("Error waiting for the message");
  }
}

module.exports = { main };
