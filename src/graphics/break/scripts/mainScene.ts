import { MainFlavorText } from "schemas";
import gsap from 'gsap';
import { textBlinkSwap } from "src/graphics/helpers";

const mainFlavorText = nodecg.Replicant<MainFlavorText>('mainFlavorText', 'ipl-overlay-controls');

export function toggleMainRow(isVisible: boolean, rowClass: string): void {
    const selector = `.${rowClass}`;
    const tl = gsap.timeline({
        defaults: {
            duration: 0.5,
            ease: 'power2.inOut'
        }
    });

    tl
        .to(selector, {
            height: isVisible ? '70px' : '0px',
            delay: isVisible ? 0 : 0.1
        }, 'row-toggle')
        .to(selector, {
            opacity: isVisible ? 1 : 0,
            delay: isVisible ? 0.1 : 0
        }, 'row-toggle');
}

mainFlavorText.on('change', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        textBlinkSwap(newValue!, document.getElementById('main-flavor-text')!);
    }
});

