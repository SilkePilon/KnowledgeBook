"use strict";
const mineflayer = require("mineflayer");
// const {
//   pathfinder,
//   Movements,
//   goals: { GoalNear, GoalBlock },
// } = require("mineflayer-pathfinder");
const { mineflayer: mineflayerViewer, viewer } = require("prismarine-viewer");
const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const toolPlugin = require("mineflayer-tool").plugin;
const https = require("https");
const http = require("http");
const path = require("path");
const { Image } = require("canvas");
const fs = require("fs").promises;
const Vec3 = require("vec3").Vec3;
const cors = require("cors");
const { elytrafly } = require("mineflayer-elytrafly");
const e = require("express");
const { createCanvas, loadImage } = require("canvas");
const WebSocket = require("ws");
const { fetch } = require("node-fetch");
const { EventEmitter } = require("events");
const sharp = require("sharp");
const pathfinder = require("mineflayer-pathfinder").pathfinder;
const Movements = require("mineflayer-pathfinder").Movements;
const { GoalNear, GoalBlock } = require("mineflayer-pathfinder").goals;
const {
  default: loader,
  EntityState,
} = require("@nxg-org/mineflayer-physics-util");
// const pathfinder = createPlugin();
// Express API setup
console.clear();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

// set up rate limiter: maximum of five requests per minute
var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

const PORT = 3001;
const versions = require("minecraft-data").supportedVersions.pc;
// Bot state
let botState = {
  created: false,
  spawned: false,
  username: "",
  data: {},
  versions: versions,
};
let storageArea = { x: "-34", y: "122", z: "-50" };
let isDelivering = false;
let chestIndex = {};
let bot;
let botviewer;
const CHEST_CHECK_INTERVAL = 60000 * 10; // Check chests every 5 minutes
const SEARCH_RADIUS = 20; // Search radius for chests
const mapData = {};
const entityPositions = {};
const textureCache = {};
const TEXTURE_BASE_URL = "http://localhost:3000/block/";
const chatMessages = [];
const MAX_CHAT_MESSAGES = 100;
const chatEmitter = new EventEmitter();
chatEmitter.setMaxListeners(50);

const FALLBACK_TEXTURE = "obsidian.png";

// Add this function after bot creation
function setupChatListener() {
  if (!bot) return;

  bot.on("messagestr", (message, messagePosition, jsonMsg, sender) => {
    const chatMessage = {
      message,
      messagePosition,
      sender: sender ? sender.username : "Unknown",
      timestamp: new Date().toISOString(),
    };

    chatMessages.unshift(chatMessage);
    if (chatMessages.length > MAX_CHAT_MESSAGES) {
      chatMessages.pop();
    }

    chatEmitter.emit("newMessage", chatMessage);
  });
}

// Function to process and cache textures
async function processTexture(buffer, blockName) {
  const image = await loadImage(buffer);
  textureCache[blockName] = image;
  return image;
}

// Function to load textures
function getTexture(blockName) {
  if (textureCache[blockName]) {
    return textureCache[blockName];
  }

  const texturePath = getTexturePathForBlock(blockName);
  const url = TEXTURE_BASE_URL + texturePath;

  // const image = loadImage(`frontend/public/block/${texturePath}`);
  const img = new Image();
  img.src = `frontend/public/block/${texturePath}`;
  textureCache[blockName] = img;
  return img;
}

function getObsidianTexture() {
  return new Promise((resolve, reject) => {
    if (textureCache[FALLBACK_TEXTURE]) {
      resolve(textureCache[FALLBACK_TEXTURE]);
      return;
    }

    const url = TEXTURE_BASE_URL + FALLBACK_TEXTURE;

    http
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to fetch fallback texture: ${response.statusCode} ${url}`
            )
          );
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const buffer = Buffer.concat(chunks);
          processTexture(buffer, FALLBACK_TEXTURE).then(resolve).catch(reject);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// async function processTexture(buffer, blockName) {
//   const image = await loadImage(buffer);
//   textureCache[blockName] = image;
//   return image;
// }

function processTexture(buffer, textureName) {
  sharp(buffer)
    .resize(16, 16, { fit: "cover" })
    .raw()
    .toBuffer((err, resizedBuffer, info) => {
      if (err) {
        reject(err);
        return;
      }

      const texture = {
        data: new Uint8Array(resizedBuffer),
        width: info.width,
        height: info.height,
      };

      textureCache[textureName] = texture;
      return loadImage(texture);
    });
}

// Helper function to get texture path for a block
function getTexturePathForBlock(blockName) {
  // Add more mappings as needed
  const textureMap = {
    grass_block: "grass_block_side.png",
    stone: "stone.png",
    dirt: "dirt.png",
    water: "water_still.png",
    // Add more block types here
  };

  return textureMap[blockName] || `${blockName}.png`;
}

// Function to update map data
async function updateMapData(x, z) {
  const maxY = bot.game.height - 1; // Get the maximum height of the world
  let y;

  // Start from the top and move down until we find a non-air block
  for (y = maxY; y >= 0; y--) {
    const block = bot.blockAt(new Vec3(x, y, z));
    if (
      block &&
      block.type !== 0 &&
      block.name !== "grass" &&
      block.name !== "tall_grass" &&
      block.name != "chest" &&
      block.name !== "ender_chest" &&
      block.name !== "water" &&
      block.name != "stairs"
    ) {
      console.log("Found block:", block.name, x, y, z);
      // 0 is the ID for air
      break;
    }
  }

  if (y >= 0) {
    const block = bot.blockAt(new Vec3(x, y, z));
    mapData[`${x},${z}`] = block.name;
  } else {
    // If no non-air block was found, we can consider it as void or some default
    mapData[`${x},${z}`] = "void";
  }
}

// Function to scan area around bot
async function scanArea(radius) {
  const botPos = bot.entity.position;
  for (
    let x = Math.floor(botPos.x) - radius;
    x <= Math.floor(botPos.x) + radius;
    x++
  ) {
    for (
      let z = Math.floor(botPos.z) - radius;
      z <= Math.floor(botPos.z) + radius;
      z++
    ) {
      await updateMapData(x, z);
    }
  }
}

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
      maxDistance: 100,
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
    try {
      await bot.pathfinder.goto(
        new GoalBlock(water.position.x, water.position.y, water.position.z)
      );
    } catch (error) {
      console.error("Notice respawn");
    }

    console.log("Jumping into water/lava to respawn...");
    bot.setControlState("sneak", true);

    // Wait for the bot to respawn
    await new Promise((resolve) => bot.once("death", resolve));
    bot.pathfinder.stop();
    console.log("Respawned at spawn point.");
    bot.setControlState("sneak", false);
  } catch (error) {
    console.error("Error during respawn process:", error);
  }
}

async function updateChestContents() {
  try {
    await goToLocation(storageArea, false);
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
  await goToLocation(chestBlock, false);
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

async function storeItemsInClosestEnderChest() {
  try {
    const enderChestBlock = bot.findBlock({
      matching: bot.registry.blocksByName["ender_chest"].id,
      maxDistance: 20,
    });

    if (!enderChestBlock) {
      throw new Error("No ender chest found nearby.");
    }

    await goToLocation(enderChestBlock.position, false);
    try {
      await bot.unequip("torso");
    } catch (error) {}

    const enderChest = await bot.openContainer(enderChestBlock);
    console.log("Storing items in ender chest...");
    for (const item of bot.inventory.slots) {
      if (item != null) {
        console.log(item);
        await enderChest.deposit(item.type, null, item.count);
        await bot.waitForTicks(20);
      }
    }

    await enderChest.close();
  } catch (error) {
    console.error("Error storing items in ender chest:", error.message);
    throw error;
  }
}

async function generateMapImage() {
  const width = 64;
  const height = 64;
  const blockSize = 16; // Size of each block in pixels
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Render map data
  for (const [key, blockName] of Object.entries(mapData)) {
    const [x, z] = key.split(",").map(Number);
    const texture = await getTexture(blockName);

    if (texture) {
      console.log(texture);
      ctx.drawImage(texture, x, z, blockSize, blockSize);
      console.log("Rendered block:", blockName, x, z);
    }
  }

  // Render entities
  Object.values(entityPositions).forEach((entity) => {
    ctx.fillStyle = entity.type === "player" ? "red" : "blue";
    ctx.beginPath();
    ctx.arc(entity.x * blockSize, entity.z * blockSize, 8, 0, 2 * Math.PI); // Scale and size adjustments for visibility
    ctx.fill();
  });

  console.log("Map image generated");
  return canvas.toBuffer();
}

// API endpoints

// API endpoint to get bot state
app.get("/bot-state", (req, res) => {
  botState.versions = versions;
  res.json(botState);
});

app.get("/functions", async (req, res) => {
  try {
    const functionsPath = path.join(
      __dirname,
      "flow_functions",
      "functions.json"
    );
    const functionsData = await fs.readFile(functionsPath, "utf-8");
    const functionsJson = JSON.parse(functionsData);

    const formattedFunctions = Object.entries(functionsJson).map(
      ([key, value]) => ({
        id: key,
        label: value.label,
        hasInput: value.hasInput,
        description: value.description,
        inputLabel: value.inputLabel,
        inputType: value.inputType,
        author: value.author,
        input: value.input,
        badges: value.badges,
      })
    );

    res.json(formattedFunctions);
  } catch (error) {
    console.error("Error reading functions.json:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/flow/:flowName", async (req, res) => {
  const flowName = req.params.flowName;
  const inputData = req.body;

  try {
    const flowPath = path.join(__dirname, "flow_functions", `${flowName}.js`);
    const flowModule = require(flowPath);

    if (typeof flowModule.main !== "function") {
      throw new Error("Invalid flow function");
    }

    await flowModule.main(inputData);
    delete require.cache[require.resolve(flowPath)];
    res.status(200).json({ message: "Flow executed successfully" });
  } catch (error) {
    console.error(`Error executing flow ${flowName}: %s`, error);
    res
      .status(500)
      .json({ error: "Flow execution failed", details: error.message });
  }
});

// API endpoint to stop the bot.
app.post("/stop-bot", async (req, res) => {
  if (bot) {
    try {
      await bot.quit();
    } catch (error) {
      console.error("Error stopping bot:", error.message);
    }
    botState = {
      created: false,
      spawned: false,
    };
    try {
      await bot.viewer.close();
    } catch (error) {
      console.error("Error stopping bot:", error.message);
    }
    try {
      bot = null;
    } catch (error) {
      console.error("Error stopping bot:", error.message);
    }

    res.json({ message: "Bot stopped successfully" });
  } else {
    res.status(400).json({ error: "Bot not found" });
  }
});

function waitForEvent(emitter, event) {
  return new Promise((resolve) => {
    emitter.once(event, resolve);
  });
}

app.post("/create-bot", async (req, res) => {
  const { username, server, port, version } = req.body;
  console.log("Creating bot...");
  console.log("Username:", username);
  let auth = "microsoft";
  if (server === "localhost") {
    auth = "offline";
  } else {
    auth = "microsoft";
  }
  console.log("Auth:", auth);
  try {
    bot = mineflayer.createBot({
      auth: auth,
      host: server,
      profilesFolder: "./profiles",
      username: username,
      port: port || 25565,
      // check if version is below 1.20.5 number as you can compair strings if so use it otherwise use the version auto.
      version: version < "1.20.5" ? version : "auto",
      onMsaCode: (code) => {
        console.log("MSA code:", code);
        io.emit("msaCode", code["user_code"]);
      },
    });
    console.log("Bot created successfully");

    await waitForEvent(bot, "login");

    bot.once("spawn", () => {
      botState.spawned = true;
      io.emit("botSpawned");
      mineflayerViewer(bot, {
        port: 3007,
        firstPerson: true,
      });
      bot.loadPlugin(pathfinder);
      bot.loadPlugin(loader);
      bot.loadPlugin(require("mineflayer-collectblock").plugin);

      bot.loadPlugin(elytrafly);
      bot.loadPlugin(toolPlugin);
      setupChatListener();

      bot.physics.autojumpCooldown = 0;
      const defaultMove = new Movements(bot);

      defaultMove.digCost = 10;
      defaultMove.placeCost = 10;
      bot.pathfinder.setMovements(defaultMove); // Update the movement instance pathfinder uses

      console.log("Bot spawned and ready!");
      // loadChestIndex();
      // startChestMonitoring();
      // Scan area periodically
      // console.log("Scanning area...");
      // (async () => {
      //   await scanArea(4); // Adjust radius as needed
      // })();
      // setInterval(async () => {
      //   await scanArea(4); // Adjust radius as needed
      // }, 10000); // Every 10 seconds
    });
    console.log("Bot spawned and ready!");

    bot.on("death", async () => {
      await bot.waitForChunksToLoad();
      await bot.waitForTicks(20);
    });

    // Error handling
    bot.on("error", console.error);

    // Track entity positions
    bot.on("entityMoved", (entity) => {
      if (entity.type === "player" || entity.type === "mob") {
        entityPositions[entity.id] = {
          x: Math.floor(entity.position.x),
          z: Math.floor(entity.position.z),
          type: entity.type,
          name: entity.name,
        };
      }
    });
    botState.created = true;
    botState.username = username;
    botState.data = bot.entity;
    res.json({ message: "Bot creation initiated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to send chat messages
app.post("/send-chat", (req, res) => {
  const { message } = req.body;

  if (!bot) {
    return res.status(400).json({ error: "Bot is not connected" });
  }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    bot.chat(message);
    res.json({ success: true, message: "Chat message sent" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send chat message", details: error.message });
  }
});

io.on("connection", (socket) => {
  // console.log("Client connected");

  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });

  chatEmitter.on("newMessage", (message) => {
    socket.emit("chatMessage", message);
  });
});

app.post("/set-storage-area", (req, res) => {
  const { x, y, z } = req.body;
  storageArea = { x, y, z };
  res.json({ message: "Storage area set successfully" });
});

// API endpoint to get map image
app.get("/map-image", async (req, res) => {
  // const mapImage = await generateMapImage();
  // res.writeHead(200, {
  //   "Content-Type": "image/png",
  //   "Content-Length": mapImage.length,
  // });
  // res.end(mapImage);
  // NEEDS TO BE FIXED
  res.json(mapData);
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    if (message === "getMap") {
      ws.send(JSON.stringify({ mapData, entityPositions }));
    }
  });
});

app.get("/chest-index", (req, res) => {
  res.json(chestIndex);
});

app.get("/index", async (req, res) => {
  await updateChestContents();
});

app.post("/retrieve-and-toss-items", async (req, res) => {
  try {
    await retrieveAndTossItemsFromEnderChest();
    res.json({ message: "Items retrieved and tossed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/store-items-in-ender-chest", async (req, res) => {
  try {
    await storeItemsInClosestEnderChest();
    res.json({
      message: "Items stored in the closest ender chest successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

async function retrieveAndTossItemsFromEnderChest() {
  try {
    const enderChestBlock = bot.findBlock({
      matching: bot.registry.blocksByName["ender_chest"].id,
      maxDistance: 20,
    });

    if (!enderChestBlock) {
      throw new Error("No ender chest found nearby.");
    }

    await goToLocation(enderChestBlock.position, false);
    const enderChest = await bot.openContainer(enderChestBlock);
    console.log("Retrieving items from ender chest...");

    for (const item of enderChest.slots) {
      if (item != null) {
        if (item.count > 1) {
          await bot.tossStack(item);
          await bot.waitForTicks(20);
        } else {
          await bot.toss(item.type);
          await bot.waitForTicks(20);
        }
      }
    }
    await enderChest.close();
    // for (const item in bot.inventory.items()) {
    //   console.log(`Tossing item: ${item.name} (${item.count})`);
    //   if (item.count > 1) {
    //     // enderChest.withdraw(item.type, null, item.count);
    //     await bot.tossStack(item);
    //   } else {
    //     // enderChest.withdraw(item.type, null, item.count);
    //     await bot.toss(item.type);
    //   }
    // }
  } catch (error) {
    console.error(
      "Error retrieving and tossing items from ender chest:",
      error.message
    );
    throw error;
  }
}

async function retrieveItemsFromEnderChest() {
  try {
    const enderChestBlock = bot.findBlock({
      matching: bot.registry.blocksByName["ender_chest"].id,
      maxDistance: 20,
    });

    if (!enderChestBlock) {
      console.log("No ender chest found nearby.");
      return;
    }

    await goToLocation(enderChestBlock.position, false);
    const enderChest = await bot.openContainer(enderChestBlock);
    console.log("Retrieving items from ender chest...");

    for (const item of enderChest.containerItems()) {
      console.log(item);
      if (
        item.name.endsWith("helmet") ||
        item.name.endsWith("chestplate") ||
        item.name.endsWith("leggings") ||
        item.name.endsWith("boots")
      ) {
        await bot.equip(item, "torso");
      } else if (
        item.name.endsWith("sword") ||
        item.name.endsWith("pickaxe") ||
        item.name.endsWith("axe") ||
        item.name.endsWith("shovel") ||
        item.name.endsWith("hoe")
      ) {
        await bot.equip(item, "hand");
      } else {
        // Withdraw the item from ender chest and put in inventory
        await withdrawAndPutInInventory(item, enderChest);
      }
    }

    await enderChest.close();
  } catch (error) {
    console.error("Error retrieving items from ender chest:", error.message);
  }
}

async function withdrawAndPutInInventory(item, container) {
  try {
    const itemID = bot.registry.itemsByName[item.name].id;
    const count = item.count || 1; // Ensure count is at least 1

    // Withdraw the item from the container
    await container.withdraw(itemID, null, count);

    // Find an empty slot in inventory
    const emptySlot = bot.inventory.firstEmptySlot();

    if (emptySlot === null) {
      console.log(`No empty slot found for ${item.name}.`);
      return;
    }

    // Put the item in the empty slot
    await bot.putInventoryItem(emptySlot, itemID, count);
  } catch (error) {
    console.error(
      `Error withdrawing ${item.name} from ender chest:`,
      error.message
    );
  }
}
async function storeItemsInEnderChest() {
  try {
    const enderChestItem = bot.inventory.findInventoryItem("ender_chest");

    if (!enderChestItem) {
      console.log("No ender chest in inventory.");
      const enderChestBlock = bot.findBlock({
        matching: bot.registry.blocksByName["ender_chest"].id,
        maxDistance: 20,
      });
      const enderChest = await bot.openContainer(enderChestBlock);
      console.log("Storing items in ender chest...");

      for (const item of bot.inventory.slots) {
        if (item != null) {
          console.log(item);
          await enderChest.deposit(item.type, null, item.count);
          await bot.waitForTicks(20);
        }
      }
      await sleep(100);
      await enderChest.close();
      return;
    }

    const openLocation = await findOpenSpaceNearby();

    if (!openLocation) {
      console.log("No open space to place ender chest.");
      return;
    }

    await bot.equip(enderChestItem, "hand");
    try {
      await bot.placeBlock(bot.blockAt(openLocation), new Vec3(0, 1, 0));
    } catch (error) {
      console.log("Error placing ender chest:", error.message);
    }
    const enderChestBlock = bot.blockAt(openLocation);
    try {
      await bot.unequip("torso");
    } catch (error) {}
    const enderChest = await bot.openContainer(enderChestBlock);
    console.log("Storing items in ender chest...");

    for (const item of bot.inventory.slots) {
      if (item != null) {
        console.log(item);
        await enderChest.deposit(item.type, null, item.count);
        await bot.waitForTicks(20);
      }
    }
    await sleep(100);
    await enderChest.close();
    try {
      await bot.dig(enderChestBlock);
    } catch (error) {
      console.error("Error digging ender chest:", error.message);
    }
  } catch (error) {
    console.error("Error storing items in ender chest:", error.message);
  }
}

async function findOpenSpaceNearby() {
  block_ = bot.findBlock({
    matching: (block) => block.name != "air",
    // useExtraInfo: true,
    useExtraInfo: (block) => {
      const hasAirAbove =
        bot.blockAt(block.position.offset(0, 1, 0)).name === "air";
      const botNotStandingOnBlock =
        block.position.xzDistanceTo(bot.entity.position) > 2;
      return hasAirAbove & botNotStandingOnBlock;
    },
    maxDistance: 30,
  });
  return block_.position;
}

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
    await retrieveItemsFromEnderChest();
    await goToLocation(destination);
    await depositItemsInChest(items);
    bot.chat("Delivery completed!");
    await storeItemsInEnderChest();
    await findWaterOrLavaAndRespawn();
    await updateChestContents();
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

async function goToLocation(location, useElytra = true) {
  const distanceToLocation = bot.entity.position.distanceTo(
    new Vec3(location.x, location.y, location.z)
  );

  if (distanceToLocation <= 50) {
    console.log("Close enough, using pathfinding");
    return usePathfinding(location);
  }

  if (!bot.supportFeature("hasElytraFlying")) {
    console.log("Elytra flying is not supported in this version of Minecraft");
    return usePathfinding(location);
  }

  const elytraItem = bot.inventory.slots.find(
    (item) => item?.name === "elytra"
  );
  if (!elytraItem || !useElytra) {
    console.log("No elytra available for long-distance travel");
    return usePathfinding(location);
  }

  await bot.equip(elytraItem, "torso");
  const fireworkItem = bot.inventory.slots.find(
    (item) => item?.name === "firework_rocket"
  );
  if (!fireworkItem) {
    console.log("No fireworks");
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
  await sleep(1000);
  return;
}

async function usePathfinding(location) {
  // await bot.pathfinder.goto(
  //   new GoalNear(location.x, location.y, location.z, 1)
  // );
  await bot.pathfinder.setGoal(
    new GoalNear(location.x, location.y, location.z, 1)
  );
  await sleep(1000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isNearGround() {
  const blocks = await bot.findBlocks({
    matching: (block) => block.type !== 0, // not air
    maxDistance: 5,
    count: 1,
    point: bot.entity.position.offset(0, -1, 0),
  });
  return blocks.length > 0;
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
  await goToLocation(chestBlock.position, false);
  if (!chestBlock) {
    throw new Error("No chest found nearby");
  }
  return await bot.openContainer(chestBlock);
}

/**
 *
 * @returns {import("mineflayer").Bot}
 */
function getBot() {
  bot.usePathfinding = usePathfinding;
  bot.goToLocation = goToLocation;
  return bot;
}

// Start the API server
server.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(
    `Backend server is running. Please go to https://open-delivery-bot.vercel.app/`
  );
});
module.exports = { getBot };
