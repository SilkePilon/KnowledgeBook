const { getBot } = require("../main.js");
const { Vec3 } = require("vec3");

async function main(data) {
  const bot = getBot();
  const { item_name, range } = data;

  try {
    const chests = bot.findBlocks({
      matching: (block) => block.name === "chest",
      maxDistance: range,
    });

    if (chests.length === 0) {
      throw new Error(`No chests found within ${range} blocks`);
    }

    for (const chest of chests) {
      const chestInventory = await bot.openChest(chest);
      const item = chestInventory.items().find((item) => item.name === item_name);
      if (item) {
        await bot.collect(item);
        console.log(`Found and collected ${item_name} from chest at ${chest.position}`);
        return;
      }
    }

    throw new Error(`Item ${item_name} not found in any chest within ${range} blocks`);
  } catch (error) {
    console.error(error);
    throw new Error("Error finding item in chests");
  }
}

module.exports = { main };