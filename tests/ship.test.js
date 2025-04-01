import { Ship } from "../src/ship.js";

describe("Tests for isSunk() and hit() method of ship class", () => {
  it("isSunk() returns true if the number of hits a ship has recieved is equal to its size", () => {
    let newShip = new Ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk).toBe(true);
  });

  it("isSunk() returns false if the number of hits a ship has recieved is not equal to its size", () => {
    let newShip = new Ship(4);
    newShip.hit();
    newShip.hit();

    expect(newShip.isSunk).toBe(false);
  });

  it("isSunk() returns false if a 5 length ship is been hit 4 times", () => {
    const newShip = new Ship(5);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    newShip.hit();

    expect(newShip.isSunk).toBe(false);
  });
});
