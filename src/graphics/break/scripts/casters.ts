import { Casters } from 'schemas';

const casters = nodecg.Replicant<Casters>('casters');

const castersWrapper = document.getElementById('info-bar-casters')!;
const twittersWrapper = document.getElementById('info-bar-twitters')!;
const castersLayout = document.getElementById('casters-layout')!;

casters.on('change', (newValue, oldValue) => {
    const values = Object.values(newValue);

    castersWrapper.innerHTML = values.reduce((existing, elem) => {
        existing += `<p class="caster">${elem.name} <span class="pronoun">${elem.pronouns}</span></p>`;

        return existing;
    }, '');

    twittersWrapper.innerHTML = values.reduce((existing, elem) => {
        existing += `<p class="caster">${elem.twitter} <span class="pronoun">${elem.pronouns}</span></p>`;

        return existing;
    }, '');

    const newCasterIds = Object.keys(newValue);
    const oldCasterIds = oldValue == null ? null : Object.keys(oldValue);
    const shouldRecreateCasterElements
        = oldCasterIds == null
        || newCasterIds.length !== oldCasterIds.length
        || newCasterIds.some((elem, i) => oldCasterIds[i] !== elem);

    if (shouldRecreateCasterElements) {
        const casterWidth = getCasterWidth(values.length);
        castersLayout.innerHTML = values.reduce((result, elem, i) => {
            result += `
                <div
                   class="caster-wrapper"
                   style="--caster-width: ${casterWidth}px"
                   data-caster-id="${newCasterIds[i]}"
               >
                   <div class="caster-visual-wrapper">
                       ${getCasterVisual(elem)}
                   </div>
                   <div class="caster-nametag">
                       <p max-width="${casterWidth - 50}" class="caster-name" align="right">${elem.name}</p>
                       <p max-width="${casterWidth - 50}" class="caster-twitter" align="right">${elem.twitter}</p>
                   </div>
               </div>
            `;

            return result;
        }, '');
    } else {
        newCasterIds.forEach((casterId) => {
            const casterElem = document.querySelector(`[data-caster-id="${casterId}"]`);
            const caster = newValue[casterId];
            const oldCaster = oldValue[casterId];
            (casterElem.querySelector('.caster-name') as FittedText).text = caster.name;
            (casterElem.querySelector('.caster-twitter') as FittedText).text = caster.twitter;

            if (
                caster.videoUrl !== oldCaster.videoUrl
                || (isBlank(caster.videoUrl) && caster.imageUrl !== oldCaster.imageUrl)
            ) {
                casterElem.querySelector('.caster-visual-wrapper').innerHTML = getCasterVisual(caster);
            }
        });
    }
});

function getCasterWidth(casterCount: number): number {
    switch (casterCount) {
        case 1:
            return 1200;
        case 2:
            return 750;
        default:
            return 625;
    }
}

function getCasterVisual(caster: Caster): string {
    if (!isBlank(caster.videoUrl)) {
        return `
           <div class="video-loader-wrapper">
               <iframe
                   allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;"
                   src="${caster.videoUrl}"
                   width="1280"
                   height="720"
               ></iframe>
           </div>
        `;
    } else if (!isBlank(caster.imageUrl)) {
        return `
            <img 
                class="caster-image"
                src="${caster.imageUrl}"
            >                    
        `;
    } else {
        return `
            <img 
                class="caster-image-placeholder"
                src="assets/sac-logo-white.png"
            >                    
        `;
    }

}