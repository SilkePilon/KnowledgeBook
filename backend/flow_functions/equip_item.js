// equip_item.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { itemName, destination } = data;

  try {
    const item = bot.inventory.items().find((item) => item.name === itemName);
    if (!item) {
      throw new Error(`Item not found in inventory: ${itemName}`);
    }

    await bot.equip(item, destination);
    console.log(`Equipped ${itemName} to ${destination}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error equipping item");
  }
}

module.exports = { main };
