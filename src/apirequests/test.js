import { nextContest } from './contest.js';
import { toDate } from './utils.js';

const next = await nextContest();
console.log("next contest is ", next);

let timeTill = next.startTimeSeconds - Math.round(new Date().getTime() / 1000);
console.log("time till the contest: ", toDate(timeTill));
