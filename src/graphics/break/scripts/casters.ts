import { Casters } from 'schemas';

const casters = nodecg.Replicant<Casters>('casters', 'ipl-overlay-controls');

const castersWrapper = document.getElementById('info-bar-casters')!;
const twittersWrapper = document.getElementById('info-bar-twitters')!;
const castersLayout = document.getElementById('casters-layout')!;

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