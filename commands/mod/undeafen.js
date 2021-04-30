const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "undeafen",
        description: "Undeafen a member in a voice channel",
        usage: "Undeafen <user>",
        aliases: ["undeaf"]
       
    },

    run: async(bot, message, args) => {
     if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [DEAFEN_MEMBERS]**");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Cette utilisateur n'existe pas.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison"


        try {
            member.voice.setDeaf(false, reason);
            message.channel.send("Succés ✅ : Le membre n'est plus sourd")
        } 
        
        catch (error) {
            console.log(error)
            message.channel.send("Erreur !")
        }

    }
}