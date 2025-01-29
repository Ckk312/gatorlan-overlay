import { Casters } from 'schemas';

const casters = nodecg.Replicant<Casters>('casters', 'ipl-overlay-controls')!;
const castersElem = document.getElementById('casters')!;

casters.on('change', newValue => {
    castersElem.innerHTML = Object.values(newValue).reduce((res: string, casterInfo) => {
        res += `
            <div class="caster">
                <p class="name">${casterInfo.name} <span class="pronoun">${casterInfo.pronouns}</span><p>
                <p class="extra">
            </div>
        `;

        return res;
    }, '');
});