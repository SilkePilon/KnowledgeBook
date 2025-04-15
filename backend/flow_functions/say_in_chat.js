// say_in_chat.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { message } = data;

  try {
    await bot.chat(message);
    console.log(`Said "${message}" in chat`);
  } catch (error) {
    console.error(error);
    throw new Error("Error saying message in chat");
  }
}

module.exports = { main };