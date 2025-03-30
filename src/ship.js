class Ship {
    constructor(length) {
        this.length = length;  // Ship size
        this.hitCount = 0;      // Tracks the number of hits
    }

    hit() {
        if (this.hitCount < this.length) {
            this.hitCount += 1;
        }
    }

    get isSunk() {   //getter
        return this.hitCount >= this.length;
    }
}

export { Ship };
