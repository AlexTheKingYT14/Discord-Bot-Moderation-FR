const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "warn",
        description: "warn members",
        usage: "m/warn <mention member/member id> [reason]",
        aliases: []
    },
    run: async (bot, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**Erreur !**")
        .setDescription("**Tu n'as pas la permission d'executer cette commande ! ❌**")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Cet utilisateur n'existe pas");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(Aucune raison)";
            
            member.send(`Vous avez été warn par <${message.author.username}> pour la raison : ${reason}`)
            .catch(error => message.channel.send(`Désolé <${message.author}> Je ne peux pas warn parce que : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`**<@${member.user.id}> à été warn par <@${message.author.id}>**`)
            .addField(`**Raison:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Modérateur:**`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
}