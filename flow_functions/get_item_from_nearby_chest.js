const { getBot } = require("../main.js");
const { Vec3 } = require("vec3");

async function main(data) {
  const bot = getBot();
  const { itemName, radius } = data;

  try {
    const chest = bot.findBlock({
      matching: (block) => block.name === "chest",
      maxDistance: radius,
    });

    if (!chest) {
      throw new Error(`No chest found within ${radius} blocks`);
    }

    const chestInventory = await bot.openChest(chest);
    const item = chestInventory.items().find((item) => item.name === itemName);
    if (!item) {
      throw new Error(`Item ${itemName} not found in chest`);
    }

    await bot.collect(item);
    console.log(`Collected ${itemName} from chest at ${chest.position}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error getting item from nearby chest");
  }
}

module.exports = { main };