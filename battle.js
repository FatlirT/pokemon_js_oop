const { PokemonError } = require("./pokemon");

class Battle {
    #trainer1;
    #trainer2;
    #t1Pokemon;
    #t2Pokemon;
    #isT1sTurn;

    constructor(trainer1, trainer2, t1PokemonName, t2PokemonName) {
        this.#trainer1 = trainer1;
        this.#trainer2 = trainer2;

        this.#t1Pokemon = this.#trainer1.getPokemon(t1PokemonName);
        this.#t2Pokemon = this.#trainer2.getPokemon(t2PokemonName);

        this.#isT1sTurn = true;
    }
    fight(move) {
        let attackingPokemon;
        let defendingPokemon;
        if (isT1sTurn) {
            attackingPokemon = this.#t1Pokemon;
            defendingPokemon = this.#t2Pokemon;
        } else {
            attackingPokemon = this.#t2Pokemon;
            defendingPokemon = this.#t1Pokemon;
        }

        let damageToDeal = attackingPokemon.useMove(move);
        let effectivityIndicationMessage = "";

        if (attackingPokemon.isEffectiveAgainst(defendingPokemon)) {
            damageToDeal = damageToDeal * 1.25;
            effectivityIndicationMessage = "It was SUPER effective!";
        } else if (attackingPokemon.isWeakTo(defendingPokemon)) {
            damageToDeal = damageToDeal * 0.75;
            effectivityIndicationMessage = "It was not very effective.";
        }

        this.defendingPokemon.takeDamage(damageToDeal);

        const attackMessage = `${effectivityIndicationMessage} Dealing ${damageToDeal}hp of damage to ${defendingPokemon.name}.`;

        console.log(attackMessage);

        this.#isT1sTurn = !this.#isT1sTurn;
    }
}

class PokemonBattleError extends PokemonError {}

module.exports = Battle;
