const { getBot } = require("../main.js");

async function main(data) {
  // Your function logic here
  const bot = getBot();
  console.log("Executing test_node with data:", data);
  // Use bot as needed
  locationList = toString(data["x y z"]).split(" ");
  location = { x: locationList[0], y: locationList[1], z: locationList[2] };
  try {
    await bot.usePathfinding(location);
    console.log("Reached destination");
  } catch (error) {
    console.error(error);
    throw new Error("Error walking to location");
  }
}

module.exports = { main };
