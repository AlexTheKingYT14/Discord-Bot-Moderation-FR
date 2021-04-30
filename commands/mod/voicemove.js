const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "vcmove",
        description: "moves a member in from one voice channel to another",
        usage: "vcmove <user> <channel>",
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("MOVE_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [MOVE_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Utilisateur inconnu.")

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "voice") return message.channel.send("Canal vocal innexistant!") 

        try {
            member.voice.setChannel(channel);
            message.channel.send("Succés ✅ : Membre déplacé !")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("Erreur.")
        }

    }
}