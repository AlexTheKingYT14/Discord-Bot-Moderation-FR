const { PREFIX, LAVA_HOST, LAVA_PASSWORD, LAVA_PORT  } = require('../../config');
const { MessageEmbed } = require("discord.js")

module.exports = async bot => {
    console.log(`${bot.user.username} est actuellement connecté !`)
    var activities = [ `${bot.guilds.cache.size} servers`, `${bot.users.cache.size} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${PREFIX}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)
    
};
