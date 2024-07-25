"use strict";

import { bot } from "../main.js";
import { mcData } from "../main.js";

function main() {
  // check if bot has enough resources
  if (bot.inventory.count(mcData.itemsByName.oak_log.id) >= 1) {
    // craft planks
    bot.craft(mcData.findItemOrBlockByName("oak_planks").id, 4, 1, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  }
}
