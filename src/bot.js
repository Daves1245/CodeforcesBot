import { Client, Intents } from 'discord.js';

const state = {};

async function init() {
    state.clientID = process.env.DISCORD_CLIENT_ID;
    state.focusedGuild = process.env.DISCORD_GUILD_ID;

    state.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
    
    state.client.once('ready', () => {
        console.log('Ready!');
    });
    
    // init commands
    import('./commands/init.js');
    // init listeners
    import('./listeners/loader.js');

    await state.client.login();
}

export { state, init };
