import { createElementFunction } from "./helperFunctions.js";
import {
  onRandomButtonClick,
  realPlayer,
  cpuPlayer,
} from "./gameController.js";

const playerGameboard = document.querySelector("#player-gameboard");
const cpuGameboard = document.querySelector("#cpu-gameboard");
const randomShipsButton = document.querySelector("#random-ships-button");

cpuGameboard.addEventListener("click", (event) => {
  let clickedElement = event.target;
  
  let xDatasetValue = clickedElement.dataset.indexX;
  let yDatasetValue = clickedElement.dataset.indexY;

  if (clickedElement.classList.contains("grid-cells")) {
    //dosomething//
    console.log(
      `i was clicked i have x as ${xDatasetValue}  and y as ${yDatasetValue}`,
    );
   

   clickedElement.style.pointerEvents = "none";


    let attack = cpuPlayer.gameboard.receiveAttack([
      xDatasetValue,
      yDatasetValue,
    ]);

    if (attack === "miss") {
      onAttackMissDom(clickedElement);
    } else if (attack === "hit") {
      onAttackHitDom(clickedElement);
    }
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

function onAttackHitDom(clickedElement) {
  clickedElement.style.backgroundColor = "#C41E3A";
}

function onAttackMissDom(clickedElement) {
  clickedElement.style.backgroundColor = "gray";
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
