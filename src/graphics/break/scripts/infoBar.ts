import { ActiveRound } from 'schemas';
import { textBlinkSwap } from 'src/graphics/helpers';

const activeRound = nodecg.Replicant<ActiveRound>('activeRound', 'ipl-overlay-controls');

const teamANameElem = document.getElementById('info-bar-scoreboard__team-a-name')!;
const teamBNameElem = document.getElementById('info-bar-scoreboard__team-b-name')!;
const teamAScoreElem = document.getElementById('info-bar-scoreboard__team-a-score')!;
const teamBScoreElem = document.getElementById('info-bar-scoreboard__team-b-score')!;

activeRound.on('change', (newValue, oldValue) => {
    if (newValue?.teamA.name !== oldValue?.teamA.name || teamANameElem.innerText === '') {
        textBlinkSwap(newValue!.teamA.name, teamANameElem);
    }

    if (newValue?.teamB.name !== oldValue?.teamB.name || teamBNameElem.innerText === '') {
        textBlinkSwap(newValue!.teamB.name, teamBNameElem);
    }

    teamAScoreElem!.innerText = newValue!.teamA.score.toString();
    teamBScoreElem!.innerText = newValue!.teamB.score.toString();
});