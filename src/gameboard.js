import { Ship } from "./ship.js";

class Gameboard {
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    
    this.ships = this.#createShips();
    this.missedAttacks = [];
  }

  placeShips(lengthOfShip, validCoord, placementType) {
    this.#placeMarkers(lengthOfShip, validCoord, placementType);
  }

  receiveAttack(coordinates) {
    if (this.board[coordinates[0]][coordinates[1]] === 0) {
      this.missedAttacks.push(coordinates);
      return "miss";
    } else {
      let marker = this.board[coordinates[0]][coordinates[1]];
      this.ships.forEach((ship) => {
        if (ship.length === marker) {
          ship.hit();
        }
      });
      return "hit";
    }
  }

  areAllShipsSunk() {
    const ships = this.ships;
    const sunkStatusArray = [];

    ships.forEach((ship) => {
      sunkStatusArray.push(ship.isSunk);
    });

    return sunkStatusArray.includes(false) ? false : true;
  }

  #placeMarkers(lengthOfShip, validCoord, placementType) {
    let marker = lengthOfShip;
    let xIndex = validCoord[0];
    let yIndex = validCoord[1];

    if (placementType === "vertical") {
      for (let i = 0; i < lengthOfShip; i++) {
        this.board[xIndex][validCoord[1]] = marker;
        xIndex = xIndex + 1;
      }
    } else if (placementType === "horizontal") {
      for (let i = 0; i < lengthOfShip; i++) {
        this.board[validCoord[0]][yIndex] = marker;
        yIndex = yIndex + 1;
      }
    }
  }

  #getRandomXandYCoords() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }


  
  horizontalOrVerticalShipPlacement() {
    return Math.random() < 0.5 ? "vertical" : "horizontal";
  }

  calculateValidCoordinates(ship, placementType) {
    let marker = ship.length;
    let randomCoords = this.#getRandomXandYCoords();

    while (true) {
      let array = [];

      if (placementType === "vertical") {
        let xIndex = randomCoords[0];
        if (xIndex + marker > 10) {
          randomCoords = this.#getRandomXandYCoords();
          continue; // retry other values
        }

       

        for (let i = 0; i < marker; i++) {
          array.push(this.board[xIndex][randomCoords[1]]);
          xIndex = xIndex + 1;
        }

        if (
          array.includes(2) ||
          array.includes(3) ||
          array.includes(4) ||
          array.includes(5)
        ) {
          randomCoords = this.#getRandomXandYCoords();
          array = [];
        } else {
          return randomCoords;
        }
      } else if (placementType === "horizontal") {
        let yIndex = randomCoords[1];
        if (yIndex + marker > 10) {
          randomCoords = this.#getRandomXandYCoords();
          continue; // retry other values
        }

        
        for (let i = 0; i < marker; i++) {
          array.push(this.board[randomCoords[0]][yIndex]);
          yIndex = yIndex + 1;
        }

        if (
          array.includes(2) ||
          array.includes(3) ||
          array.includes(4) ||
          array.includes(5)
        ) {
          randomCoords = this.#getRandomXandYCoords();
          array = [];
        } else {
          return randomCoords;
        }
      }
    }
  }

  #createShips() {
    // here 2, 3, 4, 5 in variable names indicate the length of the ship
    const patrolBoat2 = new Ship(2);
    const destroyer3 = new Ship(3);
    const battleship4 = new Ship(4);
    const aircraftCarrier5 = new Ship(5);

    return [patrolBoat2, destroyer3, battleship4, aircraftCarrier5];
  }
}

export { Gameboard };
