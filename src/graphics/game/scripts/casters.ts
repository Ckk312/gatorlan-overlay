import { Casters } from 'schemas';
import gsap from 'gsap';

const casters = nodecg.Replicant<Casters>('casters', 'ipl-overlay-controls')!;
const castersElem = document.getElementById('casters')!;

casters.on('change', newValue => {
    castersElem.innerHTML = Object.values(newValue!).reduce((res: string, casterInfo) => {
        res += `
            <div class="caster">
                <p class="name">${casterInfo.name} <span class="pronoun">${casterInfo.pronouns}</span><p>
                <p class="extra">
            </div>
        `;

        return res;
    }, '');
});

nodecg.listenFor('mainShowCasters', 'ipl-overlay-controls', () => {
    const tl = gsap.timeline({
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.casters-content', { y: 0, duration: 0.5, ease: 'power2.out' })
        .to({}, { duration: 15 })
        .to('.casters-content', { y: 356, duration: 0.5, ease: 'power2.in' });
});