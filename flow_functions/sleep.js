const { getBot } = require("../main.js");

// Helper function to sleep for a given number of milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// main function to execute the flow node
async function main(data) {
  await sleep(data.seconds * 1000);
}

module.exports = { main };
