const db = require('quick.db');

module.exports = {
    config: {
        name: 'disablexp',
        aliases: ['dxp'],
        description: 'Disables Server XP Messages',
        usage: ' '
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [ADMINISTRATOR]**")

        try {
            let a  = await db.fetch(`guildMessages_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**XP Messages Are Already Disabled In The Server!**")
            } else {
                db.delete(`guildMessages_${message.guild.id}`)

                message.channel.send("**XP Messages Are Disabled Successfully!**")
            }
            return;
        } catch {
            return message.channel.send("**Something Went Wrong!**")
        }
    }
}