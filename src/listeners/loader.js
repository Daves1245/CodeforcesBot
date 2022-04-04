import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

console.log('Initializing Listeners...');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listenerFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && !file.includes('loader.js') && !file.includes('handler.js') && !file.includes('init.js'));

for (const file of listenerFiles) {
    import(pathToFileURL(path.join(__dirname, file)));
}

console.log('Listeners Initialized Successfully.');
