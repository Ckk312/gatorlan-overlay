import gsap from 'gsap';

export function textBlinkSwap(
    text: string,
    elem: HTMLElement,
    otherElem: HTMLElement[] = [],
    callbacks?: { afterHide?: gsap.Callback, afterReveal?: gsap.Callback }
): gsap.core.Tween[] {
    return[
        gsap.to([elem, ...otherElem], {
            opacity: 0,
            onComplete: () => {
                elem.innerText = text;

                if (callbacks?.afterHide) {
                    callbacks.afterHide();
                }
            }
        }),
        gsap.to([elem, ...otherElem], {
            opacity: 1,
            delay: 0.2
        }),
        gsap.to([elem, ...otherElem], {
            opacity: 0,
            delay: 0.2,
        }),
        gsap.to([elem, ...otherElem], {
            opacity: 1,
            delay: 0.2,
            onComplete: callbacks?.afterReveal
        })
    ]
}