const Battle = require("../battle");
const Trainer = require("../trainer");
const { Charmander, Rattata, Bulbasaur, Squirtle } = require("../pokemon");

describe("Battle", () => {
    test("should return a new Battle when passed correct arguments", () => {
        // arrange

        const trainer1 = new Trainer();
        const trainer2 = new Trainer();

        const t1PokemonName = "charizard";
        const t2PokemonName = "pikachu";

        // act
        const newBattle = new Battle(
            trainer1,
            trainer2,
            t1PokemonName,
            t2PokemonName
        );
        // assert
        expect(newBattle instanceof Battle).toBe(true);
    });
    test("should have properties for two trainers and two pokemon names", () => {
        // arrange

        const trainer1 = new Trainer();
        const trainer2 = new Trainer();

        const t1PokemonName = "charizard";
        const t2PokemonName = "pikachu";

        // act
        const newBattle = new Battle(
            trainer1,
            trainer2,
            t1PokemonName,
            t2PokemonName
        );

        // assert
        expect(newBattle).toHaveProperty("trainer1", trainer1);
        expect(newBattle).toHaveProperty("trainer2", trainer2);
        expect(newBattle).toHaveProperty("t1PokemonName", t1PokemonName);
        expect(newBattle).toHaveProperty("t2PokemonName", t2PokemonName);
    });
    describe("fight", () => {
        test("should reduce defending pokemon's hp by the attacking pokemon's attack damage", () => {
            // arrange
            const trainer1 = new Trainer();
            const trainer2 = new Trainer();

            const t1PokemonName = "charizard";
            const t2PokemonName = "pikachu";

            const charizard = new Charmander(t1PokemonName, 100, 30);
            const pikachu = new Rattata(t2PokemonName, 100, 40);

            trainer1.catch(charizard);
            trainer2.catch(pikachu);

            const newBattle = new Battle(
                trainer1,
                trainer2,
                t1PokemonName,
                t2PokemonName
            );

            const defendingPokemonsHp = pikachu.hitPoints;

            // act
            newBattle.fight();
            //assert
            expect(newBattle.defendingPokemon.hitPoints).toBe(
                defendingPokemonsHp - newBattle.attackingPokemon.useMove()
            );
        });
        test("should make defendingPokemon faint when they reach 0hp", () => {
            // arrange
            const trainer1 = new Trainer();
            const trainer2 = new Trainer();

            const t1PokemonName = "charizard";
            const t2PokemonName = "pikachu";

            const charizard = new Charmander(t1PokemonName, 100, 60);
            const pikachu = new Rattata(t2PokemonName, 100, 40);

            trainer1.catch(charizard);
            trainer2.catch(pikachu);

            const newBattle = new Battle(
                trainer1,
                trainer2,
                t1PokemonName,
                t2PokemonName
            );

            // act
            // charmander -100
            newBattle.fight();
            newBattle.fight();
            newBattle.fight();
            newBattle.fight();
            expect(newBattle.defendingPokemon.hasFainted()).toBe(true);
        });
        test("should make attacking pokemon deal more damage when it is strong against the defending pokemon's type, and so defending pokemon should lose more hp", () => {
            const trainer1 = new Trainer();
            const trainer2 = new Trainer();

            const t1PokemonName = "charmander";
            const t2PokemonName = "squirtle";

            const charmander = new Charmander(t1PokemonName, 100, 60);
            const squirtle = new Squirtle(t2PokemonName, 100, 40);

            trainer1.catch(charmander);
            trainer2.catch(squirtle);

            const newBattle = new Battle(
                trainer1,
                trainer2,
                t1PokemonName,
                t2PokemonName
            );
            newBattle.fight();
            expect(charmander.hitPoints).toBe(50);
            newBattle.fight();
            newBattle.fight();
            expect(charmander.hitPoints).toBe(0);
        });
        test("should make attacking pokemon deal less damage when it is weak against the defending pokemon's type, and so defending pokemon should lose less hp", () => {
            const trainer1 = new Trainer();
            const trainer2 = new Trainer();

            const t1PokemonName = "charmander";
            const t2PokemonName = "squirtle";

            const charmander = new Charmander(t1PokemonName, 100, 60);
            const squirtle = new Squirtle(t2PokemonName, 100, 40);

            trainer1.catch(charmander);
            trainer2.catch(squirtle);

            const newBattle = new Battle(
                trainer2,
                trainer1,
                t2PokemonName,
                t1PokemonName
            );
            newBattle.fight();
            expect(squirtle.hitPoints).toBe(55);
            newBattle.fight();
            newBattle.fight();
            expect(squirtle.hitPoints).toBe(10);
        });
        test("should log a message after every round of fighting with the details of the fight", () => {
            // arrange
            const trainer1 = new Trainer();
            const trainer2 = new Trainer();

            const t1PokemonName = "charmander";
            const t2PokemonName = "squirtle";

            const charmander = new Charmander(t1PokemonName, 100, 60);
            const squirtle = new Squirtle(t2PokemonName, 100, 40);

            trainer1.catch(charmander);
            trainer2.catch(squirtle);

            const newBattle = new Battle(
                trainer1,
                trainer2,
                t1PokemonName,
                t2PokemonName
            );
            const spy = jest.spyOn(console, "log");
            const strongPokeExpectedMessage = `squirtle used water gun, dealing 50hp of damage to charmander. It was SUPER effective!`;
            const weakPokeExpectedMessage = `charmander used ember, dealing 45hp of damage to squirtle. It was not very effective.`;
            //act
            newBattle.fight();
            expect(spy).toHaveBeenCalledWith(strongPokeExpectedMessage);
            newBattle.fight();
            expect(spy).toHaveBeenCalledWith(weakPokeExpectedMessage);
            newBattle.fight();
            expect(spy).toHaveBeenCalledWith(strongPokeExpectedMessage);
        });
    });
});
