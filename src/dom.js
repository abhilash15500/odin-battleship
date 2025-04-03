import { createElementFunction } from "./helperFunctions.js";
import { onRandomButtonClick , realPlayer,cpuPlayer} from "./gameController.js";

const battleshipHeading = document.querySelector("#battleship-heading");
const playerGameboard = document.querySelector("#player-gameboard");
const cpuGameboard = document.querySelector("#cpu-gameboard");
const randomShipsButton = document.querySelector("#random-ships-button");


randomShipsButton.addEventListener("click",()=>{

    playerGameboard.innerHTML = "";
    cpuGameboard.innerHTML = "";

     onRandomButtonClick();

    let realPlayerGameboardArray = realPlayer.gameboard.board;
    let cpuPlayerGameboardArray = cpuPlayer.gameboard.board;

     realPlayerGameboardArray.forEach((row,rowIndex)=> {
           row.forEach((item,index) => {
            let createGridCellForPlayer = createElementFunction("div", ['grid-cells'], {'data-index-x': rowIndex,'data-index-y': index});

            if(item !== 0) {
                createGridCellForPlayer.classList.add("blue");
            }

            playerGameboard.append(createGridCellForPlayer);
           });
        
     });


     cpuPlayerGameboardArray.forEach((row,rowIndex)=> {
        row.forEach((item,index) => {
         let createGridCellForCpu = createElementFunction("div", ['grid-cells'], {'data-index-x': rowIndex,'data-index-y': index});
         cpuGameboard.append(createGridCellForCpu);
        });
     
  });



})

function onPageLoadDom() {
    playerGameboard.innerHTML = "";
    cpuGameboard.innerHTML = "";

    for(let i = 0; i<100;i++) {
        let createGridCellForPlayer = createElementFunction("div",["grid-cells"])
        let createGridCellForCpu = createElementFunction("div",["grid-cells"])

        playerGameboard.append(createGridCellForPlayer);
        cpuGameboard.append(createGridCellForCpu);
    }
}



export {onPageLoadDom};