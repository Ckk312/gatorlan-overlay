import { ActiveRound } from 'schemas';

const activeRound = nodecg.Replicant<ActiveRound>('activeRound', 'ipl-overlay-controls');

const teamANameElem = document.getElementById('info-bar-scoreboard__team-a-name');
const teamBNameElem = document.getElementById('info-bar-scoreboard__team-b-name');
const teamAScoreElem = document.getElementById('info-bar-scoreboard');
const teamBScoreElem = document.getElementById('info-bar-scoreboard__team-b-score');

activeRound.on('change', (newValue, oldValue) => {
    if (newValue!.teamA.name !== oldValue!.teamA.name) {
        teamANameElem!.innerText = newValue!.teamA.name;
    }

    if (newValue!.teamB.name !== oldValue!.teamB.name) {
        teamBNameElem!.innerText = newValue!.teamB.name;
    }

    teamAScoreElem!.innerText = newValue!.teamA.score.toString();
    teamBScoreElem!.innerText = newValue!.teamB.score.toString();
});