import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { state } from '../bot.js';
import { Collection } from 'discord.js';

console.log('Loading Commands...');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

state.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && !file.includes('loader.js') && !file.includes('handler.js') && !file.includes('init.js') && !file.includes('deploy.js'));

for (const file of commandFiles) {
    const command = (await import(pathToFileURL(path.join(__dirname, file)))).default;
    state.commands.set(command.data.name, command);
}

console.log('Commands Loaded.');
