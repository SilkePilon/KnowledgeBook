const { getBot } = require("../main.js");

function main(data) {
  // Get the bot object
  const bot = getBot();
  // Your function logic here
  console.log("Executing test_node with data:", data);
}

module.exports = { main };
