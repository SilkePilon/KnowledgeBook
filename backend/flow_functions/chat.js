const { getBot } = require("../main.js");

async function main(data) {
  // Your function logic here
  const bot = getBot();
  console.log("Executing test_node with data:", data);
  // Use bot as needed
  try {
    await bot.chat(data.message);
    console.log("Chat message sent");
  } catch (error) {
    console.error(error);
    throw new Error("Error sending chat message");
  }
}

module.exports = { main };
