const { getBot } = require("../main.js");
const { Vec3 } = require("vec3");

async function main(data) {
  const bot = getBot();
  const { chestLocation, itemName } = data;

  let position;
  if (chestLocation.includes(",")) {
    position = chestLocation.split(",");
  } else if (chestLocation.includes(" ")) {
    position = chestLocation.split(" ");
  }
  const chestPosition = new Vec3(position[0], position[1], position[2]);

  try {
    const chest = bot.blockAt(chestPosition);
    if (!chest || chest.name !== "chest") {
      throw new Error(`No chest found at location ${chestLocation}`);
    }

    const chestInventory = await bot.openChest(chest);
    const item = chestInventory.items().find((item) => item.name === itemName);
    if (!item) {
      throw new Error(`Item ${itemName} not found in chest`);
    }

    await bot.collect(item);
    console.log(`Collected ${itemName} from chest at ${chestLocation}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting item from chest: ${error.message}`);
  }
}

module.exports = { main };