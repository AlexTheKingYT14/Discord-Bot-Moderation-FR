const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "purge",
        aliases: [],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "m/purge [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permission d'executer cette commande !- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Il manque le nombre de messages que tu veux supprimer**');

        if (args[0] > 100)
            return message.channel.send("**Merci d'entrer un nombre ne dessous de 100 !**");

        if (args[0] < 1)
            return message.channel.send("**Merci d'entrer un nombre au dessus de 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Messages supprimés \`${messages.size}/${args[0]}\` messages ont été supprimés**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}