const nbt = require("prismarine-nbt");

/**
 * @description Automatically equips the best tool for that bot
 * @param {import("mineflayer").Bot} bot
 * @param {import("prismarine-block").Block} block
 */
async function autoTool(bot, block) {
  if (!block) return;

  const bestTool = bestHarvestTool(bot, block);

  if (!bestTool) return;

  const toolInInventory = await getItem(bot, bestTool.name);

  if (!toolInInventory) return;

  await bot.equip(bestTool);
}

/**
 *
 * @param {import("mineflayer").Bot} bot
 * @param {Bloimport("prismarine-block").Block} block
 * @returns
 */
function bestHarvestTool(bot, block) {
  const availableTools = bot.inventory.items();
  const effects = bot.entity.effects;

  let fastest = Number.MAX_VALUE;
  let bestTool = null;
  for (const tool of availableTools) {
    const enchants =
      tool && tool.nbt ? nbt.simplify(tool.nbt).Enchantments : [];
    const digTime = block.digTime(
      tool ? tool.type : null,
      false,
      false,
      false,
      enchants,
      effects
    );
    if (digTime < fastest) {
      fastest = digTime;
      bestTool = tool;
    }
  }

  return bestTool;
}

/**
 *
 * @param {import("mineflayer").Bot} bot
 * @param {string} item
 */
async function getItem(bot, item) {
  const itemInRegistry = mcData.itemsByName[item];

  if (!itemInRegistry) return;

  const ItemInInventory = bot.inventory
    .items()
    .find((iteme) => iteme.name === itemInRegistry.name);

  if (!ItemInInventory) return null;

  return ItemInInventory;
}

module.exports = {
  autoTool,
  bestHarvestTool,
  getItem,
};
