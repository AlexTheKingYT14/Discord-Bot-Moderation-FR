const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "setnick",
        aliases: ["sn", 'nick'],
        category: "moderation",
        description: "Sets Or Changes Nickname Of An User",
        usage: "[mention | name | nickname | ID] <nickname>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("**L'utilisateur n'existe pas**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Merci d'entrer un pseudo !**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Erreur, je ne peux pas moficier le pseudo !**')

        if (!args[1]) return message.channel.send("**Merci d'entrer un pseudo !**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Changement du pseudo de ${member.displayName} en ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Modération**", "setnick")
            .addField("**Utilisateur modfié**", member.user.username)
            .addField("**Changé par**", message.author.username)
            .addField("**Changé en**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}