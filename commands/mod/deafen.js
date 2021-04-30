const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        description: "Mute une personne dans un vocal",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Je n'arrive pas à trouver l'utilisateur.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Succés ✅ : Membre mis en sourdine")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Erreur interne !.")
        }

    }
}