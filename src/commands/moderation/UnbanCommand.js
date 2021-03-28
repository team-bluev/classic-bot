const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }
 
  async run(client, message, args) {
 
    //Permission checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban someone.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("My role does not have ban permissions.");
 
    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];
 
    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You must state someone to unban.`\` $unban ID reason \`');
    if (isNaN(args[0])) return message.channel.send('The id stated is not a number.\`$unban ID reason \`')
 
    //Executing:
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send('This server does not have anyone banned');
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send('The user ID stated is not banned.');
      await message.guild.members.unban(bUser.user,reason).catch(err => {
        console.log(err);
        return message.channel.send('Something went wrong unbanning this id.');
      }).then(() => {
        message.channel.send(`Succefully Unbaned ${args[0]}`);
      });
    });
  }
}