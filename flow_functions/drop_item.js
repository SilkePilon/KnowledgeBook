// craft_item.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { itemName, amount } = data;

  try {
    const item = await bot.inventory.slots.find(
      (item) =>
        item && item.name.toLocaleLowerCase() === itemName.toLocaleLowerCase()
    );
    if (!item) {
      throw new Error(`Unknown item: ${itemName}`);
    }
    await bot.toss(item.type, null, amount);
    console.log(`Tossed ${amount} ${itemName}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error tossing item");
  }
}

module.exports = { main };
