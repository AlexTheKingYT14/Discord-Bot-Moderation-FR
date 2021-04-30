const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
      name: "dm",
      description: "DM a user in the guild",
      aliases: ['pm']
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Tu dois mentionner un utilisateur`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Où est ton message ?");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("Erreur !"))
        .then(() => message.channel.send(`Envoie du message à ${user.user.tag}`));
    },
  };