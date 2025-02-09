import { ActiveRound, ScoreboardData } from 'schemas';
import { textBlinkSwap } from 'src/graphics/helpers';
import gsap from 'gsap';

const teamAScore = document.getElementById('team-a-score')!;
const teamAName = document.getElementById('team-a-name')!;
const teamAColor = document.getElementById('team-a-color')!;

const teamBScore = document.getElementById('team-b-score')!;
const teamBName = document.getElementById('team-b-name')!;
const teamBColor = document.getElementById('team-b-color')!;

const flavorTextElem = document.getElementById('scoreboard-flavor-text')!;

const activeRound = nodecg.Replicant<ActiveRound>('activeRound', 'ipl-overlay-controls');
const scoreBoardData = nodecg.Replicant<ScoreboardData>('scoreboardData', 'ipl-overlay-controls');

activeRound.on('change', (newValue, oldValue) => {
    teamAScore.innerText = newValue!.teamA.score.toString();
    teamBScore.innerText = newValue!.teamB.score.toString();

    if (newValue!.teamA.name !== oldValue!.teamA.name) {
        textBlinkSwap(newValue!.teamA.name, teamAName);
    }
    if (newValue!.teamB.name !== oldValue!.teamB.name) {
        textBlinkSwap(newValue!.teamB.name, teamBName);
    }

    if (newValue!.teamA.color !== oldValue!.teamA.color) {
        gsap.to(teamAColor, { duration: 0.3, backgroundColor: newValue!.teamA.color });
    }
    if (newValue!.teamB.color !== oldValue!.teamB.color) {
        gsap.to(teamBColor, { duration: 0.3, backgroundColor: newValue!.teamB.color });
    }
});

scoreBoardData.on('change', (newValue, oldValue) => {
    if (newValue!.flavorText === oldValue!.flavorText) {
        textBlinkSwap(newValue!.flavorText, flavorTextElem);
    }
});