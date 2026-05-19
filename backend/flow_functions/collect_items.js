// collect_items.js
const { getBot } = require("../main.js");
const { goals: pathfinderGoals } = require("@nxg-org/mineflayer-pathfinder");
const { GoalNear } = pathfinderGoals;

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

    await bot.pathfinder.goto(new GoalNear(items.position.x, items.position.y, items.position.z, 1));
    console.log("Collected dropped items");
  } catch (error) {
    console.error(error);
    throw new Error("Error collecting items");
  }
}

module.exports = { main };
