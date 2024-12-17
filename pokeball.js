const { Pokemon, PokemonError } = require("./pokemon");

class Pokeball {
    #capturedPokemon;
    constructor() {
        this.#capturedPokemon = null;
    }

    throw(pokemon) {
        if (this.#capturedPokemon !== null) {
            if (pokemon === undefined) {
                console.log(`Go ${this.#capturedPokemon.name}!`);
                return this.#capturedPokemon;
            } else {
                console.log(
                    `The Pokeball contains ${this.#capturedPokemon.name}!!`
                );
            }
        } else {
            if (pokemon instanceof Pokemon) {
                this.#capturedPokemon = pokemon;
                console.log(`You caught ${this.#capturedPokemon.name}`);
            } else {
                console.log(
                    "Pokeball is empty, throw at Pokemon to capture it."
                );
            }
        }
    }

    releasePokemon() {
        if (!this.isEmpty) {
            console.log(`So long, ${this.#capturedPokemon.name}!`);
            this.#capturedPokemon = null;
        } else {
            console.log("This Pokeball is empty.");
        }
    }

    get isEmpty() {
        return this.#capturedPokemon === null;
    }

    get contains() {
        return this.#capturedPokemon ? this.#capturedPokemon : "empty...";
    }
}

class PokemonPokeballError extends PokemonError {}

module.exports = Pokeball;
