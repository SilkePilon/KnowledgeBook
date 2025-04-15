const { getBot } = require("../main.js");
const { Vec3 } = require("vec3");
const { GoalNear } = require("mineflayer-pathfinder").goals;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(data) {
  const bot = getBot();
  const location = new Vec3(data.x, data.y, data.z);

  if (!bot.supportFeature("hasElytraFlying")) {
    console.log("Elytra flying is not supported in this version of Minecraft");
    return;
  }

  const elytraItem = bot.inventory.slots.find(
    (item) => item && item.name === "elytra"
  );
  if (!elytraItem) {
    console.log("No elytra available for long-distance travel");
    return;
  }

  await bot.equip(elytraItem, "torso");
  const fireworkItem = bot.inventory.slots.find(
    (item) => item && item.name === "firework_rocket"
  );
  if (!fireworkItem) {
    console.log("No fireworks available");
    return;
  }
  await bot.equip(fireworkItem, "hand");

  await sleep(1000);
  bot.elytrafly.start();

  console.log("Ascending to Y=150");
  while (bot.entity.position.y < 150) {
    bot.look(0, Math.PI / 2, true); // Look straight up
    bot.elytrafly.setControlState("up", true);
    bot.activateItem();
    await sleep(500);
  }
  bot.elytrafly.setControlState("up", false);
  console.log("Reached Y=150, starting horizontal flight");

  const maxFlightTime = 300000; // 5 minutes max flight time
  const flightStartTime = Date.now();

  while (true) {
    const currentPos = bot.entity.position.clone();
    const distanceToTarget = currentPos.xzDistanceTo(location);
    console.log(
      `Current distance to target: ${distanceToTarget.toFixed(2)} blocks`
    );

    if (distanceToTarget <= 40) {
      console.log("Within 40 blocks of target, starting descent");
      break;
    }

    if (Date.now() - flightStartTime > maxFlightTime) {
      console.log("Max flight time reached. Forcing landing.");
      break;
    }

    await bot.lookAt(new Vec3(location.x, currentPos.y, location.z));
    bot.elytrafly.setControlState("forward", true);

    if (bot.entity.velocity.xzDistanceTo(new Vec3(0, 0, 0)) < 0.8) {
      bot.activateItem();
      await sleep(1000);
    }

    await sleep(100);
  }

  console.log("Starting landing procedure");
  bot.elytrafly.setControlState("forward", false);
  let descending = true;

  while (!bot.entity.onGround) {
    await bot.lookAt(new Vec3(location.x, bot.entity.position.y, location.z));

    if (descending) {
      bot.elytrafly.setControlState("down", true);
    } else {
      bot.elytrafly.setControlState("down", false);
    }

    bot.elytrafly.setControlState("forward", true);
    await sleep(500);
    bot.elytrafly.setControlState("forward", false);
    bot.elytrafly.setControlState("back", true);
    await sleep(500);
    bot.elytrafly.setControlState("back", false);

    if (bot.entity.position.y > location.y + 10) {
      descending = true;
    } else {
      descending = false;
      if (bot.entity.velocity.y < -0.5) {
        bot.elytrafly.setControlState("up", true);
        await sleep(100);
        bot.elytrafly.setControlState("up", false);
      }
    }

    await sleep(100);
  }

  bot.elytrafly.stop();
  bot.elytrafly.forceStop();
  console.log("Bot has landed");

  await sleep(1000);
  await bot.pathfinder.cancel();
  bot.clearControlStates();
  bot.pathfinder.goto(new GoalNear(location.x, location.y, location.z, 2));
}

module.exports = { main };
