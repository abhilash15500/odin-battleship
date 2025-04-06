import { Player } from "./player.js";
import { isCoordInArray } from "./helperFunctions.js";

let realPlayer;
let cpuPlayer;

let state = {
  isRandomButtonClicked: false,
};

function onRandomButtonClick() {
  realPlayer = new Player();
  cpuPlayer = new Player();

  const realPlayerShips = realPlayer.gameboard.ships;
  const cpuPlayerShips = cpuPlayer.gameboard.ships;

  realPlayerShips.forEach((ship) => {
    const placementType =
      realPlayer.gameboard.horizontalOrVerticalShipPlacement();
    const validCoord = realPlayer.gameboard.calculateValidCoordinates(
      ship,
      placementType,
    );
    realPlayer.gameboard.placeShips(ship.length, validCoord, placementType);
    // placeShips(lengthOfShip, validCoord, placementType)
  });

  cpuPlayerShips.forEach((ship) => {
    const placementType =
      cpuPlayer.gameboard.horizontalOrVerticalShipPlacement();
    const validCoord = cpuPlayer.gameboard.calculateValidCoordinates(
      ship,
      placementType,
    );
    cpuPlayer.gameboard.placeShips(ship.length, validCoord, placementType);
  });
}


function getRandomValidCpuMove(validMovesForCpu) {
  const randomIndex = Math.floor(Math.random() * validMovesForCpu.length); // pick a random move index
  return validMovesForCpu[randomIndex];
}

function getValidMovesForCpu(realPlayer) {
  const validMovesForCpu = []; // store the indexes of the valid CPU moves here

  realPlayer.gameboard.board.forEach((row, indexOfRow) => {
    row.forEach((element, index) => {

      if (
        !isCoordInArray(realPlayer.gameboard.missedAttacks, [
          indexOfRow,
          index,
        ]) &&
        !isCoordInArray(realPlayer.gameboard.hitAttacks, [indexOfRow, index])
      ) {
        validMovesForCpu.push([indexOfRow, index]);
      }
    });
  });

  return validMovesForCpu;
}

//helper func below


export {
  onRandomButtonClick,
  realPlayer,
  cpuPlayer,
  getRandomValidCpuMove,
  getValidMovesForCpu,
  isCoordInArray,
  state,
};
