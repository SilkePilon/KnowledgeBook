<file-attachment-contents filename="README.md">

<h1 align="center">
  <br>
  <a href="/"><img src="assets/logo3.png" alt="..." width="900"></a>
  <br>
</h1>

<h4 align="center">🤖 An web platform for a block game.</h4>

<p align="center">
    <img alt="Node version" src="https://img.shields.io/static/v1?label=node&message=%20%3E=18.0.0&logo=node.js&color=2334D058" />
      <a href="https://python.org/"><img src="https://img.shields.io/badge/Python-FFD43B?logo=python&logoColor=blue" alt="Python"></a>
  <a href="https://github.com/reworkd/AgentGPT/blob/master/docs/README.zh-HANS.md"><img src="https://img.shields.io/badge/JavaScript-323330?logo=minecraft&logoColor=F7DF1E" alt="javascript"></a>
  <a href="soon!"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Hungarian"></a>
</p>

<p align="center">
  <a href="#about-">About</a> •
  <a href="#freature-and-plugins-">Features</a> •
  <a href="#how-to-install-">Install</a>
</p>

## About 📬

Project Skyview (idk if this is a good name?) is an open-source Minecraft bot management platform that provides players with a user-friendly web interface to create and control helpful bots. Our goal is to enhance the Minecraft multiplayer experience with powerful automation tools, all at no cost to the player.

## Getting Started

Check our [Wiki](link-to-wiki) for detailed guides on:

- Setting up Project Skyview
- Creating and managing bots
- Using the item delivery system
- Accessing the 2D map view
- And more!

## Features 🕹

| Feature name        | Description                               | Available   |
| ------------------- | ----------------------------------------- | ----------- |
| Defender            | Follows and attacks nearby players        | No          |
| Shield Aura         | Follows and protects owner                | No          |
| Schematic Builder   | Builds structures from schematics         | Planned     |
| Raid Alerts         | Sends alerts on explosions and mob spawns | No          |
| Area Miner          | Mines designated areas                    | No          |
| Chat Spy            | Views the bot's chat                      | Planned     |
| Sugar Cane Farmer   | Harvests and stores sugar cane            | Coming soon |
| Cactus Farm Builder | Builds cactus farms                       | Yes         |
| Container Viewer    | Checks bots' inventories                  | Coming soon |
| Chat to Discord     | Forwards chat to Discord                  | Planned     |
| Wander              | Moves bots randomly                       | Planned     |
| Auto Eater          | Eats when hungry or damaged               | Planned     |
| Crop Farmer         | Farms crops                               | Planned     |
| Inventory Manager   | Manages bot inventories                   | Planned     |

## How To Install 📥

# SOON!

## Adding Custom Nodes to the Project

Welcome to the project! This guide will walk you through the steps to add custom nodes. Follow these instructions to contribute your custom functionality.

### 1. Clone the Repository

First, make a local copy of the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
```

Open the cloned repository in your preferred IDE.

### 2. Create a New Node File

Navigate to the `flow_functions` folder in the project directory. Create a new file for your node with the following naming conventions:

- **Name Format:** `your_node_name.js`
- **Rules:**
  - Use lowercase letters
  - Use underscores (`_`) to separate words
  - Do not include numbers in the file name

For example, if you want to create a node for crafting planks, you might name the file `craft_planks.js`.

### 3. Implement the Node

Open your newly created file and implement your node using the following structure:

```javascript
"use strict";

import { bot } from "../main.js";
import { mcData } from "../main.js";

function main(data) {
  try {
    // Check if bot has enough resources
    if (bot.inventory.count(mcData.itemsByName.oak_log.id) >= 1) {
      // Craft planks
      bot.craft(mcData.findItemOrBlockByName("oak_planks").id, 4, 1, (err) => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export { main };
```

**Key Points:**

- The file must use `"use strict";` at the top.
- Any arguments from the frontend like amounts will be passed as first argument to the `main` function. In this example we get the amount from the frontend. This can be accessed with data.amount. This is set by converting `inputLabel` from `functions.json` to lowercase.
- Import `bot` and `mcData` from `../main.js`.
- The `main` function should be defined and exported. This function is executed when the node runs.
- Use `try` and `catch` statements for error handling. If an error occurs, log it and rethrow it to ensure it can be caught elsewhere.

### 4. Update `functions.json`

In the `flow_functions` directory, open the `functions.json` file and add an entry for your new node:

```json
{
  "YOUR_NODE_NAME": {
    "name": "YOUR_NODE_NAME",
    "file": "YOUR_NODE_NAME.js",
    "id": "YOUR_NODE_NAME",
    "label": "DISPLAY NAME",
    "hasInput": true,
    "description": "YOUR NODE DESCRIPTION",
    "inputLabel": "Amount",
    "inputType": "number",
    "author": "YOUR NAME"
  }
}
```

**Replace the placeholders:**

- `YOUR_NODE_NAME` - The name of your node (in lowercase with underscores)
- `DISPLAY NAME` - The name displayed in the UI
- `YOUR NODE DESCRIPTION` - A description of what your node does
- `YOUR NAME` - Your GitHub username

### 5. Submit a Pull Request

Once you’ve added your node and updated the `functions.json` file, push your changes to a new branch and open a pull request on GitHub.

```bash
git checkout -b your-feature-branch
git add .
git commit -m "Add custom node YOUR_NODE_NAME"
git push origin your-feature-branch
```

Go to the GitHub repository and create a pull request. Your changes will be reviewed, and if everything looks good, they will be merged!

## Thank You!

Thank you for contributing to the project! If you have any questions or need further assistance, feel free to reach out.

Happy coding! 🚀

## images:

<!-- 
![alt text](https://i.imgur.com/RRHOgzp.png) -->

## Support

If you encounter any issues or have questions, please open an issue on this GitHub repository. We're here to help!

</file-attachment-contents>
