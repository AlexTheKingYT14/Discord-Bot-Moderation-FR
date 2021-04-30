const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config: {
        name: "kick",
        category: "moderation",
        description: "Kicks the user",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: [],
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**Tu n'as pas la permission d'executer cette commande ! - [KICK_MEMBERS]**");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");

            if (!args[0]) return message.channel.send("**Tu as oublié de mentionner l'utilisateur !**")

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**Cette personne n'est pas sur le serveur**");

            if (kickMember.id === message.member.id) return message.channel.send("**Tu ne peux pas te kick toi même !**")

            if (!kickMember.kickable) return message.channel.send("**Erreur !**")
            if (kickMember.user.bot) return message.channel.send("**Erreur !**")

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Tu as été expulser de ${message.guild.name} parce que - ${reason || "Aucune raison !"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** a été expulser parce que ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** a été expulser !`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Modération**", "kick")
                .addField("**Utilisateur expulser :**", kickMember.user.username)
                .addField("**Expulser par**", message.author.username)
                .addField("**Raison**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}