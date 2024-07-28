// place_block_nearby.js
const { getBot } = require("../main.js");
const Vec3 = require("vec3");

async function main(data) {
  const bot = getBot();
  const { blockName, range } = data;

  try {
    const item = bot.inventory.findInventoryItem(blockName);
    if (!item) {
      throw new Error(`${blockName} not found in inventory`);
    }

    const botPosition = bot.entity.position.floored();
    const placementPositions = bot.findBlocks({
      matching: (block) => !block.name === "air" && !isLiquid(block),
      maxDistance: range,
      count: 100, // Increase this if needed
    });

    if (placementPositions.length === 0) {
      throw new Error(
        `No suitable location found within ${range} blocks to place ${blockName}`
      );
    }

    // Sort positions by distance to the bot
    placementPositions.sort(
      (a, b) =>
        bot.entity.position.distanceTo(a) - bot.entity.position.distanceTo(b)
    );

    const placementPos = placementPositions[0].offset(0, 1, 0);
    const referenceBlock = bot.blockAt(placementPositions[0]);

    if (!referenceBlock) {
      throw new Error("Failed to get reference block for placement");
    }

    await bot.equip(item, "hand");

    // Move closer to the placement position if needed
    if (bot.entity.position.distanceTo(placementPos) > 4) {
      await bot.pathfinder.goto(placementPos);
    }

    // Look at the placement position
    await bot.lookAt(placementPos);

    // Place the block
    await bot.placeBlock(referenceBlock, new Vec3(0, 1, 0));

    console.log(`Placed ${blockName} at ${placementPos}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Error placing ${blockName} nearby: ${error.message}`);
  }
}

function isLiquid(block) {
  return block && (block.name === "water" || block.name === "lava");
}

module.exports = { main };
