import hitSound from "./assets/sounds/onHit.mp3";
import victorySound from "./assets/sounds/onVictorySound.mp3";
import defeatSound from "./assets/sounds/onDefeatSound.mp3"

const onHitSound = new Audio(hitSound);
const onVictorySound = new Audio(victorySound);
const onDefeatSound = new Audio(defeatSound)

export { onHitSound,onVictorySound,onDefeatSound };
