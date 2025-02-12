import { ActiveBreakScene } from "schemas";
import gsap from 'gsap';

export const sceneSwitchTl = gsap.timeline({
    defaults: {
        force3D: false,
        immediateRender: false
    }
});

const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', 'ipl-overlay-controls');

NodeCG.waitForReplicants(activeBreakScene).then(() => {
    activeBreakScene.on('change', (newValue, oldValue) => {
        onSceneSwitch(newValue!, oldValue!);
    })
})

function onSceneSwitch(newActiveBreakScene: ActiveBreakScene, oldActiveBreakScene: ActiveBreakScene) {
    sceneSwitchTl.addLabel('sceneHide');

    switch (oldActiveBreakScene) {
        case 'main':
            sceneSwitchTl.add(hideMainScene(), 'sceneHide');
            break;
        case 'teams':
            sceneSwitchTl.add(hideTeams(), 'sceneHide');
            break;
        case 'stages':
            sceneSwitchTl.add(hideStages(), 'sceneHide');
    }

    if (newActiveBreakScene === 'main') {
        sceneSwitchTl.add(hideInfoBar(), 'sceneHide');
        sceneSwitchTl.addLabel('sceneShow');
    } else {
        sceneSwitchTl.addLabel('sceneShow');
        sceneSwitchTl.add(showInfoBar(), 'sceneShow');
    }

    switch (newActiveBreakScene) {
        case 'main':
            sceneSwitchTl.add(showMainScene(), 'sceneShow');
            break;
        case 'teams':
            sceneSwitchTl.add(showTeams(), 'sceneShow');
            break;
        case 'stages':
            sceneSwitchTl.add(showStages(), 'sceneShow');
    }
}

function hideMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.main-scene-wrapper', { display: 'none' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.main-scene-wrapper .text-wrapper > .logo, .main-scene-wrapper .text-wrapper .text > *', {
            y: 25,
            ease: 'power2.in',
            duration: 0.5,
            stagger: -0.1,
            opacity: 0
        }, 'sceneHide');

    return tl;
}

function showMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.main-scene-wrapper', { display: 'flex' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .fromTo('.main-scene-wrapper .text-wrapper > .logo, .main-scene-wrapper .text-wrapper .text > *', {
            y: -25,
            immediateRender: false
        }, {
            y: 0,
            ease: 'power2.out',
            duration: 0.5,
            stagger: 0.1,
            opacity: 1
        }, 'sceneShow');

    return tl;
}

function showInfoBar(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.info-bar', { display: 'flex' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.info-bar', {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });

    return tl;
}

function hideInfoBar(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.info-bar', { display: 'none' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.info-bar', {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: 'power2.in'
        });

    return tl;
}

function showTeams(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.teams-wrapper', { display: 'flex' });
        },
        delay: 0.1
    });

    tl
        .fromTo('.teams-wrapper .team', {
            y: -50
        }, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            stagger: 0.1
        });

    return tl;
}

function hideTeams(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.teams-wrapper', { display: 'none' });
        },
        delay: 0.1
    });

    tl
        .to('.teams-wrapper .team', {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: 'power2.in',
            stagger: 0.1
        });

    return tl;
}

function showStages(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.stages-wrapper', { display: 'flex' });
        }
    });

    tl
        .fromTo('#stages-layout > .stage', {
            y: -50,
            opacity: 0
        }, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            stagger: 0.1
        });

    return tl;
}

function hideStages(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.stages-wrapper', { display: 'none' });
        }
    });

    tl
        .to('#stages-layout > .stage', {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: 'power2.in',
            stagger: 0.1
        });

    return tl;
}