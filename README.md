<file-attachment-contents filename="README.md">

<h1 align="center">
  <br>
  <a href="/"><img src="assets/9990F441-DB4B-4BE1-AAE6-2E8A3EBC5D12.png" alt="Beehive" width="560"></a>
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

Project Beehive is an open source Minecraft bot with a goal to provide players access to helpful gameplay features at no cost. Developed with a clean user interface, Project Beehive offers various plugins and options similar to paid alternatives out there. The project is completely free, open source, and welcoming to contributions from the Minecraft community. Check the wiki for information on plugins, setup guides, contributing, and more. We aim to provide Minecraft players with an easy-to-use bot to enhance their gameplay experience without needing to pay. Feel free to open issues for bugs, suggestions, or questions!

## Freature and Plugins 🕹

| Plugin                | Description                               | Available   |
| --------------------- | ----------------------------------------- | ----------- |
| Defender              | Follows and attacks nearby players        | No          |
| Shield Aura           | Follows and protects owner                | No          |
| Schematic Builder     | Builds structures from schematics         | Yes         |
| Raid Alerts           | Sends alerts on explosions and mob spawns | No          |
| Area Miner            | Mines designated areas                    | No          |
| Hypixel Auto Crafting | Automates Hypixel crafting tasks          | No          |
| Chat Spy              | Views the bot's chat                      | Yes         |
| Sugar Cane Farmer     | Harvests and stores sugar cane            | Coming soon |
| Ore Miner             | Mines ores using X-ray                    | Coming soon |
| Cactus Farm Builder   | Builds cactus farms                       | Yes         |
| Auto AFK              | Automates farming tasks                   | Coming soon |
| Container Viewer      | Checks bots' inventories                  | Coming soon |
| Chat to Discord       | Forwards chat to Discord                  | Yes         |
| Knockback             | Simulates knockback physics               | Yes         |
| Chatbot               | Responds to chat commands                 | Yes         |
| Captcha Breaker       | Solves in-game captchas                   | No          |
| Sand Printer          | Places sand blocks                        | No          |
| Wander                | Moves bots randomly                       | Yes         |
| Farm Builder          | Builds sugar cane farms                   | No          |
| Auto Fisher           | Gets max fishing level                    | No          |
| Ban Checker           | Checks if accounts are banned             | No          |
| Auto Eater            | Eats when hungry or damaged               | Yes         |
| Crop Farmer           | Farms crops                               | Coming soon |
| Inventory Manager     | Manages bot inventories                   | No          |
| Mob Aura              | Attacks nearby mobs                       | No          |
| Netherwart Farmer     | Farms nether wart                         | No          |
| Tree Farmer           | Farms trees                               | No          |
| GUI Captcha Breaker   | Solves GUI captchas                       | No          |
| No Fall               | Prevents fall damage                      | Yes         |
| Killaura              | Attacks nearby players                    | Coming soon |
| Tunneler              | Digs tunnels and mines ore                | No          |
| Anti-Captcha          | Solves chat captchas                      | No          |
| Auto Armor            | Equips best armor automatically           | Coming soon |
| Chat to Discord       | Forwards chat to Discord                  | Yes         |
| Anti-Cheat Compliance | Bypasses anti-cheat plugins               | No          |
| Container Navigator   | Navigates container GUIs                  | No          |

## How To Install 📥

### Docker 🐳 (Not recommended at the moment)

Using Docker at the moment is not recommended as it may be slower updated than the python version below.

If you have Docker installed, you can easily get Project Beehive up and running. Follow the steps below:

1. Open your terminal.
2. Pull the Docker image from the Docker Hub using the following command:

```bash
docker pull ghcr.io/the-lodestone-project/beehive:latest
```

After pulling the image, run the Docker container with the following command:

```bash
docker run -p 8000:8000 ghcr.io/the-lodestone-project/beehive:latest
```

This command will start Project Beehive and map it to port 8000 on your local machine.

Open your web browser and navigate to http://localhost:8000 to access the bot.
Please note that Docker must be installed and running on your machine to execute these steps. If you don't have Docker installed, you can download it from [here](https://docs.docker.com/get-docker/).

### Python 🐍

If you dont have Docker installed, you can easily get Project Beehive up and running using python. Follow the steps below:

1. Open your terminal.
2. Clone the latest version of this repository using the following command:

```bash
git clone https://github.com/the-lodestone-project/Beehive.git
```

3. Move to the new directory:

```bash
cd Beehive
```

4. Install all the dependencies using following command:

```bash
pip install -r requirements.txt
```

After cloning the repository and installing all the dependencies, run the python script with the following command:

```bash
python main.py
```

This command will start Project Beehive and map it to port 8000 on your local machine.

Open your web browser and navigate to http://localhost:8000 to access the bot.
Please note that Python and pip must be installed and running on your machine to execute these steps. If you don't have python and pip installed, you can download it from [here](https://www.python.org/downloads/).

## images:

![alt text](https://i.imgur.com/RRHOgzp.png)

</file-attachment-contents>
