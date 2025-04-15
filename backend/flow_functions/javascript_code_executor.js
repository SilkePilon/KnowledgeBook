const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { code } = data;

  try {
    // Execute the JavaScript code with access to the bot
    const result = eval(code);
    console.log("Code executed successfully:", result);
  } catch (error) {
    console.error("Error executing code:", error);
    throw new Error("Error executing JavaScript code");
  }
}

module.exports = { main };