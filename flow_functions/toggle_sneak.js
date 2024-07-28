// toggle_sneak.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { sneak } = data;
  console.log("sneak", sneak);
  try {
    bot.setControlState("sneak", sneak);
    console.log(`Sneak mode ${sneak}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error toggling sneak mode");
  }
}

module.exports = { main };
