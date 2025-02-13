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
    teamAScore.innerText = newValue?.teamA.score.toString() ?? '';
    teamBScore.innerText = newValue?.teamB.score.toString() ?? '';

    if (newValue!.teamA.name !== oldValue?.teamA.name) {
        textBlinkSwap(newValue!.teamA.name, teamAName);
    }
    if (newValue!.teamB.name !== oldValue?.teamB.name) {
        textBlinkSwap(newValue!.teamB.name, teamBName);
    }

    if (newValue!.teamA.color !== oldValue?.teamA.color) {
        gsap.to(teamAColor, { duration: 0.3, backgroundColor: newValue!.teamA.color });
    }
    if (newValue!.teamB.color !== oldValue?.teamB.color) {
        gsap.to(teamBColor, { duration: 0.3, backgroundColor: newValue!.teamB.color });
    }
});

scoreBoardData.on('change', (newValue, oldValue) => {
    if (newValue!.flavorText !== oldValue?.flavorText) {
        textBlinkSwap(newValue!.flavorText, flavorTextElem);
    }

    if (newValue!.isVisible !== oldValue?.isVisible) {
        const tl = gsap.timeline({
            defaults: {
                immediateRender: false,
                force3D: false
            }
        });

        if (newValue!.isVisible) {
            tl
                .fromTo('.scoreboard-extra', {
                    width: '29.8%',
                    alignSelf: 'flex-end'
                }, {
                    opacity: 1, duration: 0.35
                })
                .to('.scoreboard-extra', {
                    width: '100%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '-=0.1')
                .to('.scoreboard-content', {
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                }, '+=0.1');
        } else {
            tl
                .to('.scoreboard-content', {
                    y: 140,
                    duration: 0.5,
                    ease: 'power2.in'
                })
                .fromTo('.scoreboard-extra', {
                    y: 140,
                    duration: 0.5,
                    ease: 'power2.in'
                }, {
                    width: '29.8%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '+=0.1')
                .to('.scoreboard-extra', {
                    opacity: 0, duration: 0.35
                });
        }
    }
});