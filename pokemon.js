class Pokemon {
    static #existingPokemon = new Set();

    #name;
    #hitPoints;
    #maxHitPoints;
    #moves;
    #effectiveAgainst;
    #weakTo;

    constructor(name, maxHitPoints = 100) {
        if (Pokemon.#existingPokemon.has(name)) {
            throw PokemonError("Pokemon already exists");
        }
        this.#name = name;
        this.#maxHitPoints = maxHitPoints;
        this.#hitPoints = maxHitPoints;
        this.#moves = [{ name: "tackle", damage: 20 }];
        this.#effectiveAgainst = "None";
        this.#weakTo = "None";
        Pokemon.#existingPokemon.add(name);
    }

    get isFainted() {
        return this.#hitPoints < 1;
    }

    get hitPoints() {
        return this.#hitPoints;
    }

    get name() {
        return this.#name;
    }

    get moves() {
        return this.#moves;
    }

    get effectiveAgainst() {
        return this.#effectiveAgainst;
    }

    get weakTo() {
        return this.#weakTo;
    }

    get info() {
        const formattedMoves = this.#moves.reduce((acc, move) => {
            return `${acc} '${move.name}' deals ${move.damage}hp.`;
        }, "");

        const infoString = `             Name: ${
            this.#name
        }\n               Max HP: ${this.#maxHitPoints}\nEffective Against: ${
            this.#effectiveAgainst
        }\n          Weak To: ${
            this.#weakTo
        }\n            Moves:${formattedMoves}`;

        console.log(infoString);
    }

    #findMove(name) {
        const move = this.#moves.find((move) => move.name === name);
        return move;
    }

    takeDamage(damage) {
        this.#hitPoints -= damage;
    }

    useMove(name) {
        const move = this.#findMove(name);
        if (move) {
            console.log(`${this.#name} used ${move.name}`);
            return move.damage;
        }
    }

    isEffectiveAgainst(pokemon) {
        return typeof pokemon === this.#effectiveAgainst;
    }

    isWeakTo(pokemon) {
        return typeof pokemon === this.#weakTo;
    }
}

class FirePokemon extends Pokemon {
    #effectiveAgainst;
    #weakTo;
    constructor(name, hitPoints) {
        super(name, hitPoints);
        this.#effectiveAgainst = "GrassPokemon";
        this.#weakTo = "WaterPokemon";
    }
}

class WaterPokemon extends Pokemon {
    #effectiveAgainst;
    #weakTo;
    constructor(name, hitPoints) {
        super(name, hitPoints);
        this.#effectiveAgainst = "FirePokemon";
        this.#weakTo = "GrassPokemon";
    }
}

class GrassPokemon extends Pokemon {
    #effectiveAgainst;
    #weakTo;
    constructor(name, hitPoints) {
        super(name, hitPoints);
        this.#effectiveAgainst = "WaterPokemon";
        this.#weakTo = "FirePokemon";
    }
}

class NormalPokemon extends Pokemon {
    constructor(name, hitPoints) {
        super(name, hitPoints);
    }
}

class Charmander extends FirePokemon {
    #moves;
    constructor(name, hitPoints) {
        super(name, hitPoints);
        this.#moves = super.moves;
        this.#moves.push("ember");
    }
}

class Squirtle extends WaterPokemon {
    #moves;
    constructor(name, hitPoints) {
        super(name, hitPoints);
        this.#moves = super.moves;
        this.#moves.push("water gun");
    }
}

class Bulbasaur extends GrassPokemon {
    #moves;
    constructor(name, hitPoints) {
        super(name, hitPoints);
        this.#moves = super.moves;
        this.#moves.push("vine whip");
    }
}

class Rattata extends NormalPokemon {
    constructor(name, hitPoints) {
        super(name, hitPoints);
    }
}

class PokemonError extends Error {}

module.exports = {
    Pokemon,
    FirePokemon,
    WaterPokemon,
    GrassPokemon,
    NormalPokemon,
    Charmander,
    Squirtle,
    Bulbasaur,
    Rattata,
    PokemonError,
};
