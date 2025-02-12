import { ActiveRound, ActiveBreakScene, AssetPaths } from 'schemas';
import { loadImage } from 'src/graphics/helpers';
import { sceneSwitchTl } from './sceneSwitcher';
import gsap from 'gsap';

type ChangedGame = { index: number, stage: string, mode: string };
type UpdatedGames = { isNewMatch: boolean, isFirstLoad: boolean, changedGames: Array<ChangedGame> };
type GameWinner = 'none' | 'alpha' | 'bravo';
type UpdatedWinner = { index: number, winner: GameWinner, oldWinner: GameWinner };

const stagesLayout = document.getElementById('stages-layout')!;
const activeRound = nodecg.Replicant<ActiveRound>('activeRound', 'ipl-overlay-controls')!;
const assetPaths = nodecg.Replicant<AssetPaths>('assetPaths', 'ipl-overlay-controls')!;
const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', 'ipl-overlay-controls')!;

NodeCG.waitForReplicants(activeRound, assetPaths).then(() => {
    activeRound.on('change', (newValue, oldValue) => {
        const games = getUpdatedGames(newValue!, oldValue!);
        const winners = getUpdatedWinners(newValue!, oldValue!);

        updateGames(games, winners);
        
        if (!games.isNewMatch) {
            setWinners(winners);
        }
    })
});

const getStageUrl = (stage: string): string => {
    return assetPaths.value!.stageImages[stage] ?? 'assets/unknown-stage.png';
}

const updateGames = async (games: UpdatedGames, winners: Array<UpdatedWinner>): Promise<void> => {
    if (games.changedGames.length <= 0) {
        return;
    }
        
    const stageElemIds = games.changedGames.map(game => '#stage_' + game.index).join(', ');
    const target = games.isNewMatch ? '#stages-layout > .stage' : stageElemIds;
    const tl = gsap.timeline({
        defaults: {
            force3D: false,
            immediateRender: false
        }
    });

    const createStageElems = () => {
        if (games.isNewMatch) {
            const modeTextMaxWidth = { '3': 380, '5': 258, '7': 217 }[games.changedGames.length];
            stagesLayout.classList.remove('stage-count-3', 'stage-count-5', 'stage-count-7');
            stagesLayout.innerHTML = games.changedGames.reduce((prev, game) => {
                prev += `
                    <div class="stage layout vertical" id="stage_${game.index}" style="opacity: 0">
                        <div class="stage-winner" id="winner_${game.index}">
                            <div class="stage-winner-text"></div>
                        </div>
                        <div class="stage-image" style="background-image: url('${getStageUrl(game.stage)}')"></div>
                        <div class="stage-mode layout horiz c-horiz">
                            <p class="stage-mode-text" align="center" max-width="${modeTextMaxWidth}">${game.mode}</p>
                        </div>    
                        <div class="stage-name layout horiz c-horiz c-vert">
                            <div class="stage-name-text">${game.stage}</div>
                        </div>
                    </div>
                `;

                return prev;
            }, '');
            setWinners(winners);
        } else {
            games.changedGames.forEach(game => {
                const stageElem = document.getElementById('stage_' + game.index)!;

                stageElem.querySelector<HTMLDivElement>('.stage-image')!.style.backgroundImage = `url('${getStageUrl(game.stage)}')`;
                stageElem.querySelector<HTMLParagraphElement>('.stage-mode-text')!.innerText = game.mode;
                stageElem.querySelector<HTMLDivElement>('.stage-name-text')!.innerText = game.stage;
            });
        }

        if (activeBreakScene.value === 'stages') {
            tl.fromTo(target, {
                y: -50
            }, {
                duration: 0.5,
                ease: 'power2.out',
                y: 0,
                opacity: 1,
                stagger: 0.1
            });
        }
    }

    await Promise.all(games.changedGames.map(game => loadImage(getStageUrl(game.stage))));

    if (!games.isFirstLoad && activeBreakScene.value === 'stages') {
        tl.to(target, {
            duration: 0.5,
            ease: 'power2.in',
            y: 50,
            opacity: 0,
            stagger: 0.1,
            onComplete: createStageElems
        });
    } else {
        createStageElems();
    }

    sceneSwitchTl.add(tl);
}

function setWinners(winners: Array<UpdatedWinner>): void {
    winners.forEach(winner => {
        const winnerElem = document.getElementById('winner_' + winner.index)!;
        const winnerText = winnerElem.querySelector<HTMLDivElement>('.stage-winner-text')!;

        if (winner.winner !== 'none') {
            const winnerName = getWinnerName(activeRound.value!, winner.winner);
            winnerText.innerText = winnerName;
        }

        gsap.to(winnerElem, {
            duration: 0.35,
            opacity: winner.winner === 'none' ? 0 : 1
        });
    });
}

const getUpdatedGames = (newValue: ActiveRound, oldValue: ActiveRound): UpdatedGames => {
    const gamesWithIndex = newValue.games.map((game, index) => ({
        index,
        ...game
    }));

    if (!oldValue || newValue.match.id !== oldValue.match.id) {
        return {
            isNewMatch: true,
            isFirstLoad: !oldValue,
            changedGames: gamesWithIndex
        };
    }

    return {
        isNewMatch: false,
        isFirstLoad: false,
        changedGames: gamesWithIndex.filter((game, index) => {
            const oldGame = oldValue.games[index];
            return game.stage !== oldGame.stage || game.mode !== oldGame.mode;
        })
    };
}

const getUpdatedWinners = (newValue: ActiveRound, oldValue: ActiveRound): Array<UpdatedWinner> => {
    const winners = newValue.games.map((game, index) => ({
        index,
        winner: game.winner,
        oldWinner: oldValue?.games[index]?.winner
    }));

    if (!oldValue || newValue.match.id !== oldValue.match.id) {
        return winners;
    }

    return winners.filter(winner => {
        const oldGame = oldValue.games[winner.index];
        return winner.winner !== oldGame.winner || (winner.winner === 'alpha' && newValue.teamA.name !== oldValue.teamA.name) || (winner.winner === 'bravo' && newValue.teamB.name !== oldValue.teamB.name);
    });
}

const getWinnerName = (activeRound: ActiveRound, winner: GameWinner): string => {
    return winner === 'alpha' ? activeRound.teamA.name : activeRound.teamB.name;
}
