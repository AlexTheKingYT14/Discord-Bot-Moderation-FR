const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    description: "Remove a role from a member",
    usage: "m/roledel <member mention/member id> <role mention/role id>",
    aliases: ['role del', 'role delete', 'rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Tu n'as pas la permission d'executer cette commande !")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Tu as oublié l'utilisateur.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Tu as oublié le role.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Erreur avec mes permissions !")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`#FF0000`)
      .setDescription(`Erreur ❌ | ${rMember.displayName}, Cette personne n'a pas la le role`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`#00FF00`)
      .setDescription(`Success ✅ | ${rMember} a été enlevé du role **${role.name}**`)

      message.channel.send(rolDEL)
    
    }

  },
};
