const lightSequence = ['red', 'orange', 'green', 'orange'];
const delaysBetweenLightChanges = 1000;
let currentLightIndex = 0;
const redLightWrapper = document.querySelector('#red-light-wrapper');

cycleRedLight();

function cycleRedLight() {
    const currentLightColor=lightSequence[currentLightIndex];
    redLightWrapper.className = `${currentLightColor}-light`;
    setTimeout(()=> {
        currentLightIndex = (currentLightIndex + 1) % lightSequence.length;
        cycleRedLight()
    }, delaysBetweenLightChanges);
}