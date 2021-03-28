const BaseEvent = require('../../utils/structures/BaseEvent');
 
module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' has logged in.');
    client.user.setPresence({
      activity:{
        name:`${serverIn} servers.`,
        type: "WATCHING"
      },
      STATUS: 'online'
    })
    .catch(console.error);
  }
}