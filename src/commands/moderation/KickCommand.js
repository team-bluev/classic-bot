const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
 
module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }
 
  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use this command..");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join();
    if (!reason) reason = "No reason given"
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from the server ${message.guild.name} `)
      .setDescription(`Reason: ${reason}`)
      .setColor("#00E3FF")
      .setTimestamp()
      .setFooter(client.user.tag ,client.user.displayAvatarURL());
 
 
    //-kick @user 
    if (!args[0]) return message.channel.send("You  need to mention a user to kick! \`-kick @user reason\`");
    if (!mentionedMember) return message.channel.send("The mentioned user is not in the server");
    try {
      await mentionedMember.send(kickEmbed);
    } catch(err) {
      console.log(`I Was unable to message the member.`);
    }
 
    try {
     await mentionedMember.kick(reason);
    } catch (err) {
      console.log(err);
      return message.channel.send("I Was unable to kick the member mentioned.");
    }
  }
}
 