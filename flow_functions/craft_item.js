// craft_item.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { itemName, amount } = data;

  try {
    const item = bot.registry.itemsByName[itemName];
    if (!item) {
      throw new Error(`Unknown item: ${itemName}`);
    }

    const recipe = bot.recipesFor(item.id, null, 1, null)[0];
    if (!recipe) {
      throw new Error(`No recipe found for ${itemName}`);
    }

    await bot.craft(recipe, amount, null);
    console.log(`Crafted ${amount} ${itemName}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error crafting item");
  }
}

module.exports = { main };
