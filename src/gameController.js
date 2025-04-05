// import { Gameboard } from "./gameboard.js";
// import { Ship } from "./ship.js";
import { Player } from "./player.js";

let realPlayer;
let cpuPlayer;

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

// realPlayer.gameboard.receiveAttack([selectedValidMove[0],selectedValidMove[1]]);

function getRandomValidCpuMove(validMovesForCpu) {
  const randomIndex = Math.floor(Math.random() * validMovesForCpu.length); // pick a random move index
  return validMovesForCpu[randomIndex];
}

// function getValidMovesForCpu(playerBoard) {
//     const validMovesForCpu = [];   // store the indexes of the valid CPU moves here
//     playerBoard.forEach((row, indexOfRow) => {
//         row.forEach((element, index) => {
//             if (!playerBoard.includes(element)) {
//                 validMovesForCpu.push([indexOfRow, index]);
//             }
//         });
//     });
//     return validMovesForCpu;
// }

function getValidMovesForCpu(realPlayer) {
  const validMovesForCpu = []; // store the indexes of the valid CPU moves here

  realPlayer.gameboard.board.forEach((row, indexOfRow) => {
    row.forEach((element, index) => {
      // !isCoordInArray(realPlayer.gameboard.missedAttacks, [indexOfRow, index])

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

function isCoordInArray(arr, coord) {
  return arr.some((item) => item[0] === coord[0] && item[1] === coord[1]);
}

export {
  onRandomButtonClick,
  realPlayer,
  cpuPlayer,
  getRandomValidCpuMove,
  getValidMovesForCpu,
  isCoordInArray,
};
