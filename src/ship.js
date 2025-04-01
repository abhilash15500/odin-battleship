class Ship {
  length;
  #hitCount;

  constructor(length) {
    this.length = length;
    this.#hitCount = 0;
  }

  hit() {
    if (this.#hitCount < this.length) {
      this.#hitCount += 1;
    }
  }

  get isSunk() {
    return this.#hitCount >= this.length;
  }
}

export { Ship };
