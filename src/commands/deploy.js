import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';

config();

console.log('Reading commands for deployment');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && !file.includes('loader.js') && !file.includes('handler.js') && !file.includes('init.js') && !file.includes('deploy.js'));
const commands = [];

for (const file of commandFiles) {
    const command = (await import(pathToFileURL(path.join(__dirname, file)))).default;
    commands.push(command.data.toJSON());
}

(async () => {
    try {
        console.log('Starting refersh of application (/) commands.');

        if (process.env.RESET_COMMANDS) {
            console.log('Deleting old commands.');
            rest.get(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID)).then(data => {
                const promises = [];
                for (const command of data) {
                    const deleteUrl = `${Routes.applicationCommands(process.env.DISCORD_CLIENT_ID)}/${command.id}`;
                    promises.push(rest.delete(deleteUrl));
                }
                return Promise.all(promises);
            }).then(() => console.log('Old commands deleted.'))
                .catch(() => console.error);

            console.log('Setting up new commands.');
            rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
                .then(() => console.log('Successfully registered application commands.'))
                .catch(console.error);
        }
        console.log('Successfully reloaded application (/) commands.');
    } catch (e) {
        console.log(e);
    }
})();
