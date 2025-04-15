// collect_items.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { range } = data;

  try {
    const items = bot.nearestEntity(
      (entity) =>
        entity.type === "object" &&
        bot.entity.position.distanceTo(entity.position) <= range
    );
    if (!items) {
      console.log("No dropped items found within range");
      return;
    }

    await bot.pathfinder.goto(items.position);
    console.log("Collected dropped items");
  } catch (error) {
    console.error(error);
    throw new Error("Error collecting items");
  }
}

module.exports = { main };
