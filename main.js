const mineflayer = require("mineflayer");
const {
  pathfinder,
  Movements,
  goals: { GoalNear, GoalBlock },
} = require("mineflayer-pathfinder");
const { mineflayer: mineflayerViewer } = require("prismarine-viewer");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const Vec3 = require("vec3").Vec3;
const cors = require("cors");

// Bot configuration
const bot = mineflayer.createBot({
  host: "localhost",
  port: 50874,
  username: "DeliveryBot",
  version: "1.19",
});
const mcData = require("minecraft-data")(bot.version);
bot.loadPlugin(pathfinder);

// Express API setup
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes
const PORT = 3001;

// Bot state
let storageArea = null;
let isDelivering = false;
let chestIndex = {};
const CHEST_CHECK_INTERVAL = 60000 * 1; // Check chests every 5 minutes
const SEARCH_RADIUS = 20; // Search radius for chests

bot.once("spawn", () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true });
  const defaultMove = new Movements(bot);
  bot.pathfinder.setMovements(defaultMove);

  console.log("Bot spawned and ready!");
  loadChestIndex();
  startChestMonitoring();
});

async function loadChestIndex() {
  try {
    const data = await fs.readFile("chestIndex.json", "utf8");
    chestIndex = JSON.parse(data);
  } catch (error) {
    console.log("No existing chest index found. Starting fresh.");
  }
}

async function saveChestIndex() {
  await fs.writeFile("chestIndex.json", JSON.stringify(chestIndex, null, 2));
}

async function startChestMonitoring() {
  while (true) {
    if (!isDelivering && storageArea) {
      await updateChestContents();
    }
    await new Promise((resolve) => setTimeout(resolve, CHEST_CHECK_INTERVAL));
  }
}

async function findWaterOrLavaAndRespawn() {
  try {
    console.log("Searching for water to respawn...");
    const water = bot.findBlock({
      matching: (block) => block.name === "water" || block.name === "lava",
      maxDistance: 1000,
    });

    if (!water) {
      console.log(
        "No water or lava found nearby. Searching for a larger area..."
      );
      return;
    }

    console.log(
      `Water or lava found at ${water.position}. Moving to location.`
    );
    await bot.pathfinder.goto(
      new GoalBlock(water.position.x, water.position.y, water.position.z)
    );

    console.log("Jumping into water/lava to respawn...");
    bot.setControlState("sneak", true);

    // Wait for the bot to respawn
    await new Promise((resolve) => bot.once("spawn", resolve));

    console.log("Respawned at spawn point.");
    bot.setControlState("sneak", false);
  } catch (error) {
    console.error("Error during respawn process:", error);
  }
}

async function updateChestContents() {
  try {
    await goToLocation(storageArea);
    const chests = await findChestsInArea();
    for (const chest of chests) {
      console.log(chest);
      await updateSingleChestContents(chest);
    }
    await saveChestIndex();
    console.log("Chest contents updated");
  } catch (error) {
    console.error("Error updating chest contents:", error.message);
  }
}

async function updateSingleChestContents(chestBlock) {
  await goToLocation(chestBlock);
  const chest = await bot.openContainer(bot.blockAt(chestBlock));
  console.log("Updating chest contents:", chestBlock);
  const items = chest.containerItems();
  const chestPos = `${chestBlock.x},${chestBlock.y},${chestBlock.z}`;

  chestIndex[chestPos] = items.reduce((acc, item) => {
    if (item.name.endsWith("shulker_box")) {
      const shulkerItems = getShulkerContents(item);
      acc[`${item.name}`] = shulkerItems;
    } else {
      acc[item.name] = (acc[item.name] || 0) + item.count;
    }
    return acc;
  }, {});

  await chest.close();
}

function getShulkerContents(item) {
  if (
    item.nbt &&
    item.nbt.value.BlockEntityTag &&
    item.nbt.value.BlockEntityTag.value.Items
  ) {
    const items = item.nbt.value.BlockEntityTag.value.Items.value.value;
    return items.map((i) => `${i.id.value}: ${i.Count.value}`);
  }
  return [];
}

async function findChestsInArea() {
  console.log("Searching for chests...");
  return bot.findBlocks({
    matching: bot.registry.blocksByName["chest"].id,
    useExtraInfo: true,
    maxDistance: SEARCH_RADIUS,
    count: 1000, // Adjust this number based on expected number of chests
  });
}

// API endpoints
app.post("/set-storage-area", (req, res) => {
  const { x, y, z } = req.body;
  storageArea = { x, y, z };
  res.json({ message: "Storage area set successfully" });
});

app.get("/chest-index", (req, res) => {
  res.json(chestIndex);
});

app.post("/deliver", (req, res) => {
  if (isDelivering) {
    return res.status(400).json({ error: "Bot is already on a delivery" });
  }

  const { items, destination } = req.body;
  if (!storageArea) {
    return res.status(400).json({ error: "Storage area not set" });
  }

  isDelivering = true;
  deliverItems(items, destination)
    .then(() => {
      isDelivering = false;
      res.json({ message: "Delivery completed successfully" });
    })
    .catch((error) => {
      isDelivering = false;
      res.status(500).json({ error: error.message });
    });
});

async function deliverItems(items, destination) {
  try {
    for (const item of items) {
      console.log(item);
      const chestPos = findChestWithItem(item.type, item.count);
      if (!chestPos) {
        throw new Error(`Not enough ${item.type} available`);
      }
      const numbers = chestPos.split(",");
      const vec3chestPos = new Vec3(numbers[0], numbers[1], numbers[2]);
      console.log(vec3chestPos.x);
      await goToLocation(vec3chestPos);
      await collectItemFromChest(chestPos, item);
    }
    await goToLocation(destination);
    await depositItemsInChest(items);
    bot.chat("Delivery completed!");
    await findWaterOrLavaAndRespawn();
  } catch (error) {
    bot.chat(`Error during delivery: ${error.message}`);
    throw error;
  }
}

function findChestWithItem(itemType, count) {
  for (const [chestPos, contents] of Object.entries(chestIndex)) {
    if (contents[itemType] && contents[itemType] >= count) {
      return chestPos;
    }
  }
  return null;
}

async function collectItemFromChest(chestPos, item) {
  const numbers = chestPos.split(",");
  const vec3chestPos = new Vec3(numbers[0], numbers[1], numbers[2]);
  const chestBlock = bot.blockAt(vec3chestPos);
  const chest = await bot.openContainer(chestBlock);
  const itemID = bot.registry.itemsByName[item.type].id;
  await chest.withdraw(itemID, null, item.count);
  await chest.close();

  // Update chest index
  chestIndex[chestPos][item.type] -= item.count;
  if (chestIndex[chestPos][item.type] <= 0) {
    delete chestIndex[chestPos][item.type];
  }
}

async function goToLocation(location) {
  return new Promise((resolve, reject) => {
    bot.pathfinder.setGoal(new GoalNear(location.x, location.y, location.z, 3));
    bot.once("goal_reached", resolve);
    bot.once("path_update", (results) => {
      if (results.status === "noPath") {
        reject(new Error("No path to the destination"));
      }
    });
  });
}

async function depositItemsInChest(items) {
  const chest = await findAndOpenNearbyChest();
  for (const item of items) {
    const botItem = bot.inventory.findInventoryItem(item.type);
    if (botItem) {
      await chest.deposit(botItem.type, null, item.count);
    }
  }
  await chest.close();
}

async function findAndOpenNearbyChest() {
  const chestBlock = await bot.findBlock({
    matching: bot.registry.blocksByName["chest"].id,
    maxDistance: 100,
  });
  if (!chestBlock) {
    throw new Error("No chest found nearby");
  }
  return await bot.openContainer(chestBlock);
}

// Start the API server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

// Error handling
bot.on("error", console.error);
