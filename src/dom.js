import { createElementFunction } from "./helperFunctions.js";
import {
  onRandomButtonClick,
  realPlayer,
  cpuPlayer,
  getRandomValidCpuMove,
  getValidMovesForCpu,
  isCoordInArray,
} from "./gameController.js";

// DOM SELECTORS
const playerGameboard = document.querySelector("#player-gameboard");
const cpuGameboard = document.querySelector("#cpu-gameboard");
const randomShipsButton = document.querySelector("#random-ships-button");

// EVENT LISTENERS
cpuGameboard.addEventListener("click", (event) => {
  let clickedElement = event.target;
  let xDatasetValue = clickedElement.dataset.indexX;
  let yDatasetValue = clickedElement.dataset.indexY;

  if (
    clickedElement.classList.contains("grid-cells") &&
    isCoordInArray(cpuPlayer.gameboard.missedAttacks, [
      xDatasetValue,
      yDatasetValue,
    ]) === false &&
    isCoordInArray(cpuPlayer.gameboard.hitAttacks, [
      xDatasetValue,
      yDatasetValue,
    ]) === false
  ) {
    console.log(clickedElement);

    let attack = cpuPlayer.gameboard.receiveAttack([
      xDatasetValue,
      yDatasetValue,
    ]);

    if (attack === "miss") {
      onAttackMissDom(clickedElement);
    } else if (attack === "hit") {
      onAttackHitDom(clickedElement);
    }

    setTimeout(() => {
      afterPlayerMakesMove(realPlayer);
    }, 2000);
    cpuGameboard.style.pointerEvents  = "auto";
  }
});

randomShipsButton.addEventListener("click", () => {
  playerGameboard.innerHTML = "";
  cpuGameboard.innerHTML = "";

  onRandomButtonClick();

  let realPlayerGameboardArray = realPlayer.gameboard.board;
  let cpuPlayerGameboardArray = cpuPlayer.gameboard.board;

  realPlayerGameboardArray.forEach((row, rowIndex) => {
    row.forEach((item, index) => {
      let createGridCellForPlayer = createElementFunction(
        "div",
        ["grid-cells"],
        { "data-index-x": rowIndex, "data-index-y": index },
      );

      if (item !== 0) {
        createGridCellForPlayer.classList.add("blue");
      }

      playerGameboard.append(createGridCellForPlayer);
    });
  });

  cpuPlayerGameboardArray.forEach((row, rowIndex) => {
    row.forEach((item, index) => {
      let createGridCellForCpu = createElementFunction("div", ["grid-cells"], {
        "data-index-x": rowIndex,
        "data-index-y": index,
      });
      cpuGameboard.append(createGridCellForCpu);
    });
  });
});

// DOM MANIPULATION FUNCTIONSX`

function afterPlayerMakesMove(realPlayer) {
  let playerCells = document.querySelectorAll("#player-gameboard .grid-cells");

  let validMovesForCpu = getValidMovesForCpu(realPlayer);
  let selectedValidMove = getRandomValidCpuMove(validMovesForCpu);
  realPlayer.gameboard.receiveAttack([
    selectedValidMove[0],
    selectedValidMove[1],
  ]);
  console.log(
    `im being run and here is my gameboard for real player ${realPlayer.gameboard.board} here are missd attack ${realPlayer.gameboard.missedAttacks}`,
  );

  if (
    realPlayer.gameboard.board[selectedValidMove[0]][selectedValidMove[1]] !== 0
  ) {
    playerCells.forEach((cell) => {
      if (
        Number(cell.dataset.indexX) === selectedValidMove[0] &&
        Number(cell.dataset.indexY) === selectedValidMove[1]
      ) {
        cell.style.backgroundColor = "#C41E3A";
      }
    });
  } else if (
    realPlayer.gameboard.board[selectedValidMove[0]][selectedValidMove[1]] === 0
  ) {
    playerCells.forEach((cell) => {
      if (
        Number(cell.dataset.indexX) === selectedValidMove[0] &&
        Number(cell.dataset.indexY) === selectedValidMove[1]
      ) {
        cell.style.backgroundColor = "#5d6675";
      }
    });
  }
}

function onAttackHitDom(clickedElement) {
  clickedElement.style.backgroundColor = "#C41E3A";
}

function onAttackMissDom(clickedElement) {
  clickedElement.style.backgroundColor = "#5d6675";
}

function onPageLoadDom() {
  playerGameboard.innerHTML = "";
  cpuGameboard.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    let createGridCellForPlayer = createElementFunction("div", ["grid-cells"]);
    let createGridCellForCpu = createElementFunction("div", ["grid-cells"]);

    playerGameboard.append(createGridCellForPlayer);
    cpuGameboard.append(createGridCellForCpu);
  }
}

export { onPageLoadDom };
