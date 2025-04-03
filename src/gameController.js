import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

let realPlayer;
let cpuPlayer;

function onRandomButtonClick() {
     realPlayer = new Player();
     cpuPlayer = new Player();

    const realPlayerShips = realPlayer.gameboard.ships;
    const cpuPlayerShips = cpuPlayer.gameboard.ships;

    realPlayerShips.forEach(ship => {
        const placementType = realPlayer.gameboard.horizontalOrVerticalShipPlacement();
        const validCoord = realPlayer.gameboard.calculateValidCoordinates(ship,placementType);
        realPlayer.gameboard.placeShips(ship.length,validCoord,placementType);
        // placeShips(lengthOfShip, validCoord, placementType)
    });

    cpuPlayerShips.forEach(ship => {
        const placementType = cpuPlayer.gameboard.horizontalOrVerticalShipPlacement();
        const validCoord = cpuPlayer.gameboard.calculateValidCoordinates(ship,placementType);
        cpuPlayer.gameboard.placeShips(ship.length,placementType,validCoord);
    });


}


export {onRandomButtonClick , realPlayer,cpuPlayer}