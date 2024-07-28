// smelt_item.js
const { getBot } = require("../main.js");

async function main(data) {
  const bot = getBot();
  const { itemName, fuelName } = data;

  try {
    const furnace = bot.findBlock({
      matching: (block) => block.name === "furnace",
      maxDistance: 32,
    });

    if (!furnace) {
      throw new Error("No furnace found nearby");
    }

    const furnaceBlock = await bot.openFurnace(furnace);
    await bot.waitForTicks(8);
    const item = await furnaceBlock.slots.find(
      (item) => item?.name === itemName
    );
    const fuel = await furnaceBlock.slots.find(
      (item) => item?.name === fuelName
    );
    console.log(item);
    console.log(fuel);
    if (!item) {
      throw new Error(`${itemName} not found in inventory`);
    }
    if (!fuel) {
      throw new Error(`${fuelName} not found in inventory`);
    }
    await furnaceBlock.putFuel(fuel.type, null, fuel.count);
    await furnaceBlock.putInput(item.type, null, item.count);
    console.log(`Started smelting ${itemName}`);

    await new Promise((resolve) => {
      furnaceBlock.on("update", () => {
        if (furnaceBlock.slots[2]?.count === item.count) {
          console.log("Smelting complete");
          resolve();
        }
        if (!furnaceBlock.slots[1]?.count) {
          if (!furnaceBlock.slots[0]?.count) {
            console.log("Fuel depleted");
            resolve();
          }
        }
      });
    });

    const output = await furnaceBlock.takeOutput();
    await furnaceBlock.close();
    console.log(`Finished smelting ${output.name}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error smelting item");
  }
}

module.exports = { main };
