import { Ship } from "../src/ship.js";


describe('Tests for Ship class', () => {
    it('Ship should create the class with correct length', () => {
        const newShip = new Ship(4); 
        expect(newShip.length).toBe(4);
    });

    it("Ship should initialize the hits with 0 value", ()=> {
        const newShip = new Ship(3);
        expect(newShip.hitCount).toBe(0);
    })
    
    it("Ship should initialize the isSunk value to false", ()=> {
        const newShip = new Ship(5);
        expect(newShip.isSunk).not.toBeTruthy();
    })

});

describe("Tests for hit method of ship class",()=>{
    it("hit method should increase the hitCount by 2 when hit method is used twice",()=>{
        const newShip = new Ship(2);
        newShip.hit();
        newShip.hit();
        expect(newShip.hitCount).toBe(2);
    })
})


describe("Tests for isSunk method of ship class",()=>{
    it("Returns true if the number of hits a ship has recieved is equal to its size",()=>{
        let newShip = new Ship(3);
        newShip.hit();
        newShip.hit();
        newShip.hit();
        expect(newShip.isSunk).toBe(true)
    })

    it("Returns false if the number of hits a ship has recieved is not equal to its size",()=>{
        let newShip = new Ship(4);
        newShip.hit();
        newShip.hit();

        expect(newShip.isSunk).toBe(false)
    })
})

