// toggle_sneak.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { sneak } = data;
  console.log("sneak", sneak);
  let sneakBool;
  if (sneak.toLowerCase() === "true") {
    sneakBool = true;
  }
  if (sneak.toLowerCase() === "false") {
    sneakBool = false;
  }
  try {
    bot.setControlState("sneak", sneakBool);
    console.log(`Sneak mode ${sneakBool}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error toggling sneak mode");
  }
}

module.exports = { main };
