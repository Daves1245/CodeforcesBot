import { SlashCommandBuilder } from '@discordjs/builders';
import fetch from 'node-fetch';
import { nextContest } from '../apirequests/contest.js';
import { toDate } from '../utils.js';
import { state } from '../bot.js';

async function execute(interaction) {
    await interaction.deferReply();

    const next = await nextContest();
    let timeTill = next.startTimeSeconds - Math.round(Date.now() / 1000);

    let date = toDate(timeTill);
    console.log("Contest starts in: " + date);
    await interaction.editReply({content: next.name + ' starts in '
    + date.days + ' days, ' + date.hours + ' hours, ' + date.minutes + ', and '
    + date.seconds + ' seconds from now!'});
}

export default {
    data: new SlashCommandBuilder()
    .setName('nextcomp')
    .setDescription('Finds out when the next comp is!'),
    execute,
};
