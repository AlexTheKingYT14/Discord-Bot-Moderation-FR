const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
    config: {
        name: "unlock",
        description: "unlock channel",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**Erreur !**")
        .setDescription("**Tu n'as pas la permission d'executer cette commande ! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`Succés | Canal dévérouillé`);
    }
}