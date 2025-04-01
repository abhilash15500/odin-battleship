import { Gameboard } from "../src/gameboard.js";

describe("Test cases for the gameboard constructor", () => {
  it("Gameboard has all element as 0 with 10x10 cells", () => {
    const newGameboard = new Gameboard();
    expect(newGameboard.board).toEqual([
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
    ]);
  });
});

describe("placeShips() method", () => {
  it("should place a 4-length ship at (4,5) vertically", () => {
    const gameboard = new Gameboard();
    gameboard.placeShips(4, [4, 5], "vertical");

    // Check that the ship markers (4) are placed correctly
    expect(gameboard.board[4][5]).toBe(4);
    expect(gameboard.board[5][5]).toBe(4);
    expect(gameboard.board[6][5]).toBe(4);
    expect(gameboard.board[7][5]).toBe(4);
  });

  it("should place a 3-length ship at (3,3)  horizontally", () => {
    const gameboard = new Gameboard();
    gameboard.placeShips(3, [3, 3], "horizontal");
    // Check that the ship markers (3) are placed correctly
    expect(gameboard.board[3][3]).toBe(3);
    expect(gameboard.board[3][4]).toBe(3);
    expect(gameboard.board[3][5]).toBe(3);
  });
});

//test the calculate coords method

describe("Tests for the calculateValidCoordinates(ship, placementType) method", () => {
  it("Valid coordinates for vertical placement of a size 4 ship even after testing 100 times", () => {
    const gameboard = new Gameboard();
    const testArray = [];
    let counter = 0;
    let lengthOfShip = gameboard.ships[2].length;

    while (counter != 101) {
      let test = gameboard.calculateValidCoordinates(
        gameboard.ships[2],
        "vertical",
      );
      testArray.push(test);
      counter++;
    }

    testArray.forEach((test) => {
      expect(test[0] + lengthOfShip).toBeLessThanOrEqual(10);
    });
  });

  it("Valid coordinates for horizontal placement of a size 5 ship even after testing 100 times", () => {
    const gameboard = new Gameboard();
    const testArray = [];
    let counter = 0;
    let lengthOfShip = gameboard.ships[3].length;

    while (counter != 101) {
      let test = gameboard.calculateValidCoordinates(
        gameboard.ships[3],
        "horizontal",
      );
      testArray.push(test);
      counter++;
    }

    testArray.forEach((test) => {
      expect(test[1] + lengthOfShip).toBeLessThanOrEqual(10);
    });
  });
});

// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

describe("Testing the receiveAttack(coordinates) method which takes  a pair of coordinates", () => {
  it("receiveAttack() hits a coordinate([4,5]) and returns with 'hit'", () => {
    let gameboard = new Gameboard();
    gameboard.placeShips(4, [4, 5], "horizontal");
    expect(gameboard.receiveAttack([4, 5])).toBe("hit");
  });

  it("receiveAttack() misses a coordinate([6,6]) and returns with 'miss'", () => {
    let gameboard = new Gameboard();
    gameboard.placeShips(4, [4, 5], "horizontal");
    expect(gameboard.receiveAttack([6, 5])).toBe("miss");
  });

  it("receiveAttack() hits all coordinates of the ship and the ship sinks which confirms hits are incrementing", () => {
    let gameboard = new Gameboard();
    gameboard.placeShips(4, [4, 5], "vertical");
    gameboard.receiveAttack([4, 5]);
    gameboard.receiveAttack([5, 5]);
    gameboard.receiveAttack([6, 5]);
    gameboard.receiveAttack([7, 5]);

    expect(gameboard.ships[2].isSunk).toEqual(true);
  });

  it("receiveAttack() hits only some coordinates of the ship and the ship doesnt sink", () => {
    let gameboard = new Gameboard();
    gameboard.placeShips(5, [3, 5], "horizontal");
    gameboard.receiveAttack([3, 5]);
    gameboard.receiveAttack([3, 6]);
    gameboard.receiveAttack([3, 7]);
    gameboard.receiveAttack([4, 6]);
    gameboard.receiveAttack([5, 8]);
    expect(gameboard.ships[3].isSunk).toEqual(false);
  });

  it("receiveAttack() hits only some coordinates of the ship and the missed shots are added to the missedAttacks array", () => {
    let gameboard = new Gameboard();
    gameboard.placeShips(5, [3, 5], "horizontal");
    gameboard.receiveAttack([3, 5]);
    gameboard.receiveAttack([3, 6]);
    gameboard.receiveAttack([3, 7]);
    gameboard.receiveAttack([4, 6]);
    gameboard.receiveAttack([5, 8]);
    expect(gameboard.missedAttacks).toEqual([
      [4, 6],
      [5, 8],
    ]);
  });
});

describe("Testing the areAllShipsSunk() method", () => {
  it("areAllShipsSunk() returns true if all the ships in the gameboard are sunk", () => {
    //creating gameboard and placing ships
    let gameboard = new Gameboard();

    // Mocking the isSunk getter to always return true
    gameboard.ships.forEach((ship) => {
      jest.spyOn(ship, "isSunk", "get").mockReturnValue(true);
    });

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  it("areAllShipsSunk() returns false if atleast one ship in the gameboard is not sunk", () => {
    //creating gameboard and placing ships
    let gameboard = new Gameboard();

    jest.spyOn(gameboard.ships[0], "isSunk", "get").mockReturnValue(true);

    expect(gameboard.areAllShipsSunk()).toBe(false);
  });
});
