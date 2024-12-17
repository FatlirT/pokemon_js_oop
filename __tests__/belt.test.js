const Belt = require("../belt");
const Pokeball = require("../pokeball");
const { Pokemon } = require("../pokemon");

describe("Belt", () => {
    let belt;

    beforeEach(() => {
        belt = new Belt();
    });

    describe("constructor()", () => {
        test("should create a new Belt", () => {
            expect(belt).not.toBe(undefined);
            expect(belt instanceof Belt).toBe(true);
        });
    });

    describe("pokeballs", () => {
        let pbKeys;

        beforeEach(() => {
            pbKeys = Object.keys(belt.pokeballs);
        });

        test("should be an Object", () => {
            expect(typeof belt.pokeballs).toBe("object");
        });

        test("should only contain keys numbered from 1 to 6", () => {
            expect(pbKeys.length).toBe(6);
            pbKeys.forEach((key, index) => {
                expect(key).toBe(String(index + 1));
            });
        });

        test("should only contain Pokeballs", () => {
            pbKeys.forEach((key) => {
                expect(belt.pokeballs[key] instanceof Pokeball).toBe(true);
            });
        });

        test("should not be able to modify it directly", () => {
            const ogPbsRef = belt.pokeballs;
            const ogPbsForm = { ...belt.pokeballs };

            belt.pokeballs = {};

            expect(belt.pokeballs).toBe(ogPbsRef);
            expect(belt.pokeballs).toEqual(ogPbsForm);
        });
    });

    describe("removePokeball()", () => {
        test("should return removed Pokeball", () => {
            const p = new Pokemon("pikachu", 50);
            belt.pokeballs[1].throw(p);
            expect().toBe();
        });
        test("should set contents of slot to null when Pokeball is removed", () => {
            second;
        });
        test("should throw PokemonTrainerBeltError indicating slot is empty when trying to remove from empty slot", () => {
            second;
        });
    });

    describe("addPokeball()", () => {
        test("should add Pokeball to first free slot in pokeballs", () => {
            second;
        });
        test("should return slot number where Pokeball was stored", () => {
            second;
        });
        test("should throw PokemonTrainerBeltError when trying to add to a full belt", () => {
            second;
        });
    });

    test("each instance of Belt should have a 'pokeballs' property", () => {
        expect(belt).toHaveProperty("pokeballs");
    });
});
