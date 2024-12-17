const Trainer = require("../trainer");
const { Pokemon } = require("../pokemon");
describe("Trainer", () => {
    test("should have a property called belt thats an array of length 6", () => {
        const ash = new Trainer();
        expect(ash).toHaveProperty("belt");
        expect(Array.isArray(ash.belt)).toBe(true);
        expect(ash.belt.length).toBe(6);
    });
    describe("catch", () => {
        test("should invoke throw if it has an empty pokeball", () => {
            const ash = new Trainer();
            expect(ash.belt[0].isEmpty()).toBe(true);
            const pikachu = new Pokemon("pikachu");
            ash.catch(pikachu);
            expect(ash.belt[0].isEmpty()).toBe(false);
        });
        test("if there are no empty pokeballs console.log a message", () => {
            const ash = new Trainer();
            const pikachu = new Pokemon("pikachu");
            const spy = jest.spyOn(console, "log");
            ash.catch(pikachu);
            ash.catch(pikachu);
            ash.catch(pikachu);
            ash.catch(pikachu);
            ash.catch(pikachu);
            ash.catch(pikachu);
            expect(spy).toHaveBeenCalledWith("The trainers belt is full!!");
        });
    });
    describe("getPokemon", () => {
        test("if the trainers belt is empty console log The trainers belt is empty!!", () => {
            const ash = new Trainer();
            expect(ash.getPokemon("pikachu")).toBe(
                "The trainers belt is empty!!"
            );
        });
        test("if the pokemon passed is not found console log a message", () => {
            const ash = new Trainer();
            const pikachu = new Pokemon("pikachu");
            ash.catch(pikachu);
            expect(ash.getPokemon("charizard")).toBe(
                "There is no pokemon with that name !!"
            );
        });
        test("if the pokemon is found on the belt throw it ", () => {
            const ash = new Trainer();
            const pikachu = new Pokemon("pikachu");
            const charizard = new Pokemon("charizard");
            const bulbazar = new Pokemon("bulbazar");
            ash.catch(pikachu);
            ash.catch(pikachu);
            ash.catch(charizard);
            ash.catch(bulbazar);
            expect(ash.getPokemon("pikachu")).toEqual(pikachu);
            expect(ash.getPokemon("charizard")).toEqual(charizard);
            expect(ash.getPokemon("charizard")).toBe(
                "There is no pokemon with that name !!"
            );
            expect(ash.getPokemon("bulbazar")).toEqual(bulbazar);
            ash.getPokemon("pikachu");
            expect(ash.getPokemon("pikachu")).toBe(
                "The trainers belt is empty!!"
            );
        });
    });
});
