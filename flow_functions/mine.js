const { getBot } = require("../main.js");
const { autoTool } = require("../utils.js");

async function main(data) {
  const bot = getBot();
  let { amount, "block name": blockName } = data;

  while (amount > 0) {
    const blockInRegistry = bot.registry.blocksByName[blockName];

    if (!blockInRegistry) {
      return;
    }

    const block = getBlock(bot, blockName);

    if (block) {
      const distance = bot.entity.position.distanceTo(block.position);

      if (distance > 3) {
        const { x, y, z } = block.position;
        await bot.goToLocation({ x, y, z }, false);
      }

      try {
        const distance = bot.entity.position.distanceTo(block.position);

        if (distance > 4) {
          continue;
        }

        await autoTool(bot, block);
        await bot.dig(block);
      } catch (err) {
        throw new Error(`Failed to mine ${block.name}`);
      }
    } else {
      throw new Error(`Could not find block: ${block}`);
    }

    amount--;
    await sleep(100);
  }
}

/**
 * Find a block near the bot
 * @param {import("mineflayer").Bot} bot
 * @param {string} targetBlock - The name of the target block.
 * @returns {import("prismarine-block").Block | null} - The closest block matching the target name or null if none found.
 */
function getBlock(bot, targetBlock) {
  const possibleBlocks = {};

  const blockPositions = bot.findBlocks({
    matching: (block) => block.name.includes(targetBlock),
    maxDistance: 64,
    count: 128,
    point: bot.entity.position,
  });

  if (blockPositions.length === 0) {
    return null;
  }

  let closestBlockPosition = null;
  let minDistance = Infinity;

  for (const position of blockPositions) {
    const block = bot.blockAt(position);

    if (!block) continue;

    possibleBlocks[position] = block;

    const distance = getDistance(position, bot.entity.position);
    if (distance < minDistance) {
      minDistance = distance;
      closestBlockPosition = position;
    }
  }

  if (!closestBlockPosition) {
    return null;
  }

  return possibleBlocks[closestBlockPosition];
}

/**
 * Calculate the distance between two vectors.
 * @param {Vec3} vec1
 * @param {Vec3} vec2
 * @returns {number} - The distance between the two vectors.
 */
function getDistance(vec1, vec2) {
  return vec1.distanceTo(vec2);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { main };
