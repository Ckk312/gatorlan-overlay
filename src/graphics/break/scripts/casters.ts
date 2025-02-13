import { Casters } from 'schemas';
import gsap from 'gsap';

const casters = nodecg.Replicant<Casters>('casters', 'ipl-overlay-controls');

const castersWrapper = document.getElementById('info-bar-casters')!;
const twittersWrapper = document.getElementById('info-bar-twitters')!;

casters.on('change', (newValue, oldValue) => {
    const values = Object.values(newValue!);

    castersWrapper.innerHTML = values.reduce((existing, elem) => {
        existing += `<p class="caster">${elem.name} <span class="pronoun">${elem.pronouns}</span></p>`;

        return existing;
    }, '');

    twittersWrapper.innerHTML = values.reduce((existing, elem) => {
        existing += `<p class="caster">${elem.twitter} <span class="pronoun">${elem.pronouns}</span></p>`;

        return existing;
    }, '');

    gsap.set([ castersWrapper, twittersWrapper ], { scale: values.length > 2 ? 0.7 : 1 });
});

const casterInfoLoopTl = gsap.timeline({ repeat: -1 });
const casterInfoElems = ['info-bar-twitters-wrapper', 'info-bar-casters-wrapper'];
for (let i = 0; i < casterInfoElems.length; i++) {
    const previousElem = casterInfoElems[i - 1 < 0 ? casterInfoElems.length - 1 : i - 1];
    const elem = casterInfoElems[i];

    casterInfoLoopTl
        .to(`#${elem}`, { duration: 0.35, opacity: 0 })
        .to(`#${previousElem}`, { duration: 0.35, opacity: 1 })
        .to({}, { duration: 30 });
}