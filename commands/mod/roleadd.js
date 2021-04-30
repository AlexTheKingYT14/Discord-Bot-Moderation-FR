const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../owner.json")
module.exports = {
  config: {
    name: "roleadd",
    description: "Add a role to a member",
    usage: "m/roleadd <member mention/id> <role mention/role id>",
    aliases: ['role add', 'radd']
  },
  run: async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"]) && !ownerID.includes(message.author.id)) return message.channel.send("Tu n'as pas la permission d'executer cette commande !")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Tu as oublié l'utilisateur.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Tu as oublié le role.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Erreur au niveau de mes permissions !")

    if(rMember.roles.cache.has(role.id)) {
        
      return message.channel.send(`${rMember.displayName}, possèdent déjà ce role!`)
    
    } else {
        
      await rMember.roles.add(role.id).catch(e => console.log(e.message))
      
      message.channel.send(`${rMember.displayName} a été rajouté au role **${role.name}**`)
    
    }

  },
};