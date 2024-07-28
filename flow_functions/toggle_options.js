// toggle_sneak.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  for (const key in data) {
    try {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        await bot.setControlState(key, value);
        console.log(`Toggled ${key} to ${value}`);
      }
    } catch (error) {
      console.error(`Error toggling ${key}`);
    }
  }
}

module.exports = { main };
