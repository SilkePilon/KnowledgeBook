// attack_entity.js
const e = require("express");
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { entityName, range } = data;
  let entity;
  try {
    if (bot.players[entityName]) {
      entity = bot.players[entityName].entity;
    } else {
      entity = bot.nearestEntity(
        (entity) =>
          entity.name === entityName &&
          bot.entity.position.distanceTo(entity.position) <= range
      );
    }
    if (!entity) {
      throw new Error(`No ${entityName} found within ${range} blocks`);
    }

    await bot.lookAt(entity.position.offset(0, entity.height, 0));
    await bot.attack(entity);
    console.log(`Attacked ${entityName}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error attacking entity");
  }
}

module.exports = { main };
