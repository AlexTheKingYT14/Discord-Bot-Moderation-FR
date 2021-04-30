const Discord = require('discord.js')

module.exports = {
    config: {
        name: "lockdown",
        description: "lock server",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**Erreur !**")
        .setDescription("**Tu n'as pas la permission d'executer cette commande ! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") ) return message.channel.send(lockPermErr);

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new Discord.MessageEmbed()
                
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`**\n\nLe serveur a été vérouillé ! 🔒**`)
                .setColor('#2F3136')
            return message.channel.send(lockEmbed);

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new Discord.MessageEmbed()
                .setColor('#2F3136')    
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`**\n\nLe serveur a été déverouillé ! 🔓**`)
            return message.channel.send(lockEmbed2)
        }
    }
}