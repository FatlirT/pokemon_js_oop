const { PokemonError } = require("./pokemon");

class Trainer {
    #belt;
    constructor(belt) {
        this.#belt = belt;
    }
    checkPokeball(slot) {
        const pokeballContents = this.#belt.pokeballs[slot].contains;
        if (pokeballContents === "empty...") {
            console.log(pokeballContents);
            return;
        }
        pokeballContents.info;
    }
    releasePokemon(name) {
        for (const pokeball in this.#belt.pokeballs) {
            if (pokeball.contains(name)) {
                return pokeball.releasePokemon();
            }
        }
        console.log("There is no pokemon with that name !!");
    }

    dropPokeball(slot) {
        const resOfRemove = this.#belt.removePokeball(slot);
        const message =
            resOfRemove === undefined
                ? "There is no Pokeball in this slot"
                : `Pokeball ${slot} dropped`;
        console.log(message);
        return resOfRemove;
    }
    pickPokeball(pokeball) {
        const resOfAdd = this.#belt.addPokeball(pokeball);
        const message =
            resOfAdd === undefined
                ? "Belt can't hold any more Pokeballs"
                : `Pokeball was added to slot ${resOfAdd}`;
        console.log(message);
    }
    catch(pokemon) {
        for (const slot in this.#belt.pokeballs) {
            const pokeball = this.#belt.pokeballs[slot];
            if (pokeball.isEmpty) {
                console.log(`Throwing Pokeball ${slot}...`);
                pokeball.throw(pokemon);
                console.log(`${pokemon.name} is now in Pokeball ${slot}`);
                return;
            }
            console.log("ALL Pokeballs are FULL!");
        }
    }
    getPokemon(name) {
        for (const pokeball in this.#belt.pokeballs) {
            if (pokeball.contains(name)) {
                return pokeball.throw();
            }
        }
        console.log("There is no pokemon with that name !!");
    }
}

class PokemonTrainerError extends PokemonError {}

module.exports = Trainer;
