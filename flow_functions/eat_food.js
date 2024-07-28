// eat_food.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { foodName } = data;

  try {
    const food = bot.inventory.items().find((item) => item.name === foodName);
    if (!food) {
      throw new Error(`Food not found in inventory: ${foodName}`);
    }

    await bot.equip(food, "hand");
    await bot.consume();
    console.log(`Ate ${foodName}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error eating food");
  }
}

module.exports = { main };
