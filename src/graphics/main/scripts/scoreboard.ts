import { activeRound, scoreboardData } from 'schemas';

const teamAScore = document.getElementById('team-a-score')!;
const teamAName = document.getElementById('team-a-name')!;
const teamAColor = document.getElementById('team-a-color')!;

const teamBScore = document.getElementById('team-b-score')!;
const teamBName = document.getElementById('team-b-name')!;
const teamBColor = document.getElementById('team-b-color')!;

const flavorTextElem = document.getElementById('scoreboard-flavor-text')!;

const activeRound = nodecg.Replicant<activeRound>('activeRound', 'ipl-overlay-controls');
const scoreBoardData = nodecg.Replicant<scoreboardData>('scoreboardData', 'ipl-overlay-controls');

activeRound.on('change', (newValue, oldValue) => {
    teamAScore.innerText = newValue.teamA.score.toString();
    teamBScore.innerText = newValue.teamB.score.toString();

    teamAName.innerText = newValue.teamA.name;
    teamBName.innerText = newValue.teamB.name;
});

scoreBoardData.on('change', (newValue, oldValue) => {
    if (newValue.flavorText === oldValue.flavorText) {
        flavorTextElem.innerText = newValue.flavorText;
    }
});