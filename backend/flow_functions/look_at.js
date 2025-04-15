// look_at.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { x, y, z } = data;

  try {
    if (x == "~") {
      x = bot.entity.position.x;
    }
    if (y == "~") {
      y = bot.entity.position.y;
    }
    if (z == "~") {
      z = bot.entity.position.z;
    }
    await bot.lookAt(new Vec3(x, y, z));
    console.log(`Looking at x: ${x}, y: ${y}, z: ${z}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error looking at position");
  }
}

module.exports = { main };
