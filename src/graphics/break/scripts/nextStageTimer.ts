import { NextRoundStartTime } from "schemas";
import { toggleMainRow } from "./mainScene";

const nextRoundTime = nodecg.Replicant<NextRoundStartTime>('nextRoundStartTime', 'ipl-overlay-controls');
const timerTextElem = document.getElementById('main-scene-timer');

nextRoundTime.on('change', (newValue, oldValue) => {


    if (newValue!.isVisible !== oldValue!.isVisible) {
        toggleMainRow(newValue!.isVisible, 'info-row-timer');
    }
});
