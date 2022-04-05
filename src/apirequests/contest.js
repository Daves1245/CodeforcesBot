import fetch from "node-fetch";
import { contestListURL } from "./defs.js";

async function nextContest() {
    const response = await fetch(contestListURL, {
        method: "GET"
    });

    const json = await response.json();
    if (json.status != "OK") {
        return;
    }

    return json.result[0];
}

export{nextContest};
