import { MainFlavorText } from "schemas";

const mainFlavorText = nodecg.Replicant<MainFlavorText>('mainFlavorText', 'ipl-overlay-controls');

export function toggleMainRow(isVisible: boolean, rowClass: string): void {
    const selector = `.${rowClass}`;
    
}

mainFlavorText.on('change', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        document.getElementById('main-flavor-text')!.innerText = newValue!;
    }
});

