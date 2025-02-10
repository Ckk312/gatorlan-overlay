import { NowPlaying, MusicShown } from "schemas";
import { toggleMainRow } from './mainScene';
import { textBlinkSwap, getSongName } from "src/graphics/helpers";

const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying', 'ipl-overlay-controls');
const musicShown = nodecg.Replicant<MusicShown>('musicShown', 'ipl-overlay-controls');

nowPlaying.on('change', newValue => {
    textBlinkSwap(getSongName(newValue!), document.getElementById('main-scene-music')!)
    document.getElementById('main-scene-music')!.innerText = 'i';
});

musicShown.on('change', newValue => {
    toggleMainRow(newValue!, 'info-row-music');
});