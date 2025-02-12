import gsap from 'gsap';

import { NowPlaying } from 'schemas';

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

export function getSongName(nowPlaying: NowPlaying): string {
    return [nowPlaying.artist, nowPlaying.song]
        .filter(value => !!value && (value.trim() !== ''))
        .join(' - ');
}

export async function loadImage(imageUrl: string): Promise<void> {
    return new Promise((resolve) => {
        const imageLoaderElem = document.createElement('img');
        imageLoaderElem.src = imageUrl;

        imageLoaderElem.addEventListener('load', () => {
            resolve();
        });
    });
}