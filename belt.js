const Pokeball = require("./pokeball");
const { PokemonError } = require("./pokemon");

class Belt {
    #pokeballs;
    constructor() {
        this.#pokeballs = {
            1: new Pokeball(),
            2: new Pokeball(),
            3: new Pokeball(),
            4: new Pokeball(),
            5: new Pokeball(),
            6: new Pokeball(),
        };
    }
    get pokeballs() {
        return this.#pokeballs;
    }
    removePokeball(slotNumber) {
        const slotContents = this.#pokeballs[slotNumber];
        if (slotContents === null) {
            throw new PokemonTrainerBeltError("Slot is empty");
        }
        if (slotContents !== null) {
            this.#pokeballs[slotNumber] = null;
            return slotContents;
        }
    }
    addPokeball(pokeball) {
        for (const slot in this.#pokeballs) {
            if (this.#pokeballs[slot] === null) {
                this.#pokeballs[slot] = pokeball;
                return Number(slot);
            }
        }
        throw new PokemonTrainerBeltError("No free slots");
    }
}

class PokemonTrainerBeltError extends PokemonError {}

module.exports = Belt;
