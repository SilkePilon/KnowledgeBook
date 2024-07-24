curl -X POST http://localhost:3001/deliver -H "Content-Type: application/json" -d "{\"items\": [{\"type\": \"diamond\", \"count\": 5}, {\"type\": \"iron_ingot\", \"count\": 10}], \"destination\": {\"x\": 150, \"y\": 64, \"z\": -180}}"
curl -X POST http://localhost:3001/store-items-in-ender-chest

bot.once('messagestr', message, messagePosition, jsonMsg, sender => {
}
