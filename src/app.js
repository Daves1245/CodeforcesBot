// the new main file for the bot
import { config } from 'dotenv';
import { state, init } from './bot.js';

config();

// main function to run the bot
async function run() {
    while (true) {
        try {
            console.log('Initializing bot');
            await init();
            // TODO more stuff here
            console.log('Initialization completed');
            
            while (true) {
                const waiting = new Promise((resolve) => setTimeout(resolve, 1_000_000_000));
                await waiting;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

run();