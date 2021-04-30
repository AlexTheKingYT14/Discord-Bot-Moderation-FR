const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        aliases: ["ub", "unbanish"],
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [BAN_MEMBERS]**")

        if (!args[0]) return message.channel.send("**Tu as oublié de mentionner l'utilisateur**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**Pseudo invalide, Pseudo ou ID de cet utilisateur n'est peut être pas banni**")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]**")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag} a été déban pour ${reason}**`)
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag} a été déban**`)
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Modération**", "unban")
            .addField("**Débanni**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**Modérateur**", message.author.username)
            .addField("**Raison**", `${reason}` || "**No Reason**")
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
}