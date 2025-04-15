// place_block.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { blockName, x, y, z } = data;
  if (x == "~") {
    x = bot.entity.position.x;
  }
  if (y == "~") {
    y = bot.entity.position.y;
  }
  if (z == "~") {
    z = bot.entity.position.z;
  }

  try {
    const position = bot.entity.position.offset(x, y, z);
    const block = bot.blockAt(position);

    if (block.name === "air") {
      const itemByName = bot.registry.itemsByName[blockName];
      if (!itemByName) {
        throw new Error(`Unknown block: ${blockName}`);
      }

      await bot.equip(itemByName, "hand");
      await bot.placeBlock(block, new Vec3(0, 1, 0));
      console.log(`Placed ${blockName} at ${position}`);
    } else {
      throw new Error(`Cannot place block at ${position}, space is not empty`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error placing block");
  }
}

module.exports = { main };
