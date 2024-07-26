const { getBot } = require("../main.js");

async function main(data) {
  // Your function logic here
  const bot = getBot();
  console.log("Executing test_node with data:", data);
  // Use bot as needed
  try {
    await bot.goToLocation(data["x y z"], (useElytra = false));
    console.log("Reached destination");
  } catch (error) {
    console.error(error);
    throw new Error("Error walking to location");
  }
}

module.exports = { main };
