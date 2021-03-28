const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tool', []);
  }

 async  run(client, message, args) {
   if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require\`MANAGE_ROLES\` permission");

   const role = message.guild.roles.cache.get('803292166796738650');

   await message.member.roles.add(role.id).catch(err => console.log(err));
  }
}