// use_block.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { x, y, z } = data;

  try {
    const targetPosition = bot.entity.position.offset(x, y, z);
    const targetBlock = bot.blockAt(targetPosition);

    if (!targetBlock) {
      throw new Error(`No block found at relative position ${x}, ${y}, ${z}`);
    }

    await bot.lookAt(targetPosition);
    await bot.activateBlock(targetBlock);
    console.log(`Used block at ${targetPosition}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error using block");
  }
}

module.exports = { main };
