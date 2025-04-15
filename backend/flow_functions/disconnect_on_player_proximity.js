const { getBot } = require("../main.js");

function main(data) {
  const bot = getBot();
  const radius = data.radius;

  if (radius <= 0) {
    throw new Error("Invalid radius. Please provide a positive number.");
  }

  console.log(
    `Starting background player proximity check with radius: ${radius} blocks`
  );

  function checkPlayerProximity() {
    const nearbyPlayers = Object.values(bot.players).filter((player) => {
      if (!player.entity) return false;
      const distance = bot.entity.position.distanceTo(player.entity.position);
      return distance <= radius && player.username !== bot.username;
    });

    if (nearbyPlayers.length > 0) {
      const nearestPlayer = nearbyPlayers[0];
      const distance = bot.entity.position.distanceTo(
        nearestPlayer.entity.position
      );
      console.log(
        `Player ${nearestPlayer.username} detected within ${distance.toFixed(
          2
        )} blocks. Disconnecting...`
      );
      bot.quit("Player detected nearby");
      return true; // Player detected, bot disconnected
    }

    return false; // No players detected
  }

  function startBackgroundCheck() {
    const intervalId = setInterval(() => {
      try {
        if (checkPlayerProximity()) {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error in player proximity check:", error);
        clearInterval(intervalId);
      }
    }, 1000); // Check every second

    // Attach the intervalId to the bot instance for potential cleanup
    bot.proximityCheckIntervalId = intervalId;

    console.log("Background player proximity check started");
  }

  // Start the background check
  startBackgroundCheck();

  // Continue execution immediately
  console.log("Node execution completed, background check is running");
}

module.exports = { main };
