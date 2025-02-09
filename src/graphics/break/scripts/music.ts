import { NowPlaying, MusicShown } from "schemas";
import { toggleMainRow } from './mainScene';

const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying', 'ipl-overlay-controls');
const musicShown = nodecg.Replicant<MusicShown>('musicShown', 'ipl-overlay-controls');

nowPlaying.on('change', newValue => {
    document.getElementById('main-scene-music')!.innerText = 'i';
});

musicShown.on('change', newValue => {
    toggleMainRow(newValue!, 'info-row-music');
});