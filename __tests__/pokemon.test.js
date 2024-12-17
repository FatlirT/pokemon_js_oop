const {
    Pokemon,
    FirePokemon,
    WaterPokemon,
    GrassPokemon,
    NormalPokemon,
    Charmander,
    Squirtle,
    Bulbasaur,
    Rattata,
} = require("../pokemon");

describe("Pokemon", () => {
    test("should have a property called name", () => {
        expect(new Pokemon()).toHaveProperty("name");
    });
    test("should have a property called hitPoints", () => {
        expect(new Pokemon()).toHaveProperty("hitPoints");
    });
    test("should have a property called attackDamage", () => {
        expect(new Pokemon()).toHaveProperty("attackDamage");
    });
    test("should have a property called move", () => {
        expect(new Pokemon()).toHaveProperty("move", "tackle");
    });
});

describe("takeDamage", () => {
    test("hit points should be reduced by the passed value", () => {
        const bulbazar = new Pokemon("bulbazar", 100);
        bulbazar.takeDamage(50);
        expect(bulbazar.hitPoints).toBe(50);
    });
});

describe("useMove", () => {
    test("should return the pokemons atack damage and console log", () => {
        const bulbazar = new Pokemon("bulbazar", 100, 75);
        const spy = jest.spyOn(global.console, "log");
        expect(bulbazar.useMove()).toBe(75);
        expect(spy).toHaveBeenCalledWith("bulbazar used bulbazar's tackle");
    });
});

describe("hasFainted", () => {
    test("should return a boolean", () => {
        const bulbazar = new Pokemon("bulbazar", 100, 75);
        expect(typeof bulbazar.hasFainted()).toBe("boolean");
    });
    test("should return true if pokemon's hit points are 0 ", () => {
        const bulbazar = new Pokemon("bulbazar", 100, 75);
        expect(bulbazar.hasFainted()).toBe(false);
        bulbazar.takeDamage(50);
        expect(bulbazar.hasFainted()).toBe(false);
        bulbazar.takeDamage(50);
        expect(bulbazar.hasFainted()).toBe(true);
    });
});

describe("FirePokemon", () => {
    test("an instance of fire pokemon has the type fire property", () => {
        const charizard = new FirePokemon("charizard", 100, 75);
        expect(charizard).toHaveProperty("type", "fire");
        expect(charizard).toHaveProperty("name", "charizard");
        expect(charizard).toHaveProperty("hitPoints", 100);
        expect(charizard).toHaveProperty("attackDamage", 75);
    });
});

describe("isEffectiveAgainst()", () => {
    test("should return boolean", () => {
        const pokemon = new Pokemon();
        expect(typeof pokemon.isEffectiveAgainst(pokemon)).toBe("boolean");
    });
    test("each pokemon with a specific type should be effective against the right type", () => {
        const charizard = new FirePokemon("charizard", 100, 75);
        const waterguy = new WaterPokemon("charizard", 100, 75);
        const bulbz = new GrassPokemon("charizard", 100, 75);
        const cool = new NormalPokemon("charizard", 100, 75);

        expect(charizard.isEffectiveAgainst(bulbz)).toBe(true);
        expect(charizard.isEffectiveAgainst(waterguy)).toBe(false);
        expect(charizard.isEffectiveAgainst(cool)).toBe(false);

        expect(bulbz.isEffectiveAgainst(waterguy)).toBe(true);
        expect(bulbz.isEffectiveAgainst(charizard)).toBe(false);
        expect(bulbz.isEffectiveAgainst(cool)).toBe(false);

        expect(waterguy.isEffectiveAgainst(charizard)).toBe(true);
        expect(waterguy.isEffectiveAgainst(bulbz)).toBe(false);
        expect(waterguy.isEffectiveAgainst(cool)).toBe(false);

        expect(cool.isEffectiveAgainst(bulbz)).toBe(false);
        expect(cool.isEffectiveAgainst(charizard)).toBe(false);
        expect(cool.isEffectiveAgainst(waterguy)).toBe(false);
    });
});

describe("isWeakTo()", () => {
    test("should return boolean", () => {
        const pokemon = new Pokemon();
        expect(typeof pokemon.isWeakTo(pokemon)).toBe("boolean");
    });
    test("each pokemon with a specific type should be weak to the right type", () => {
        const charizard = new FirePokemon("charizard", 100, 75);
        const waterguy = new WaterPokemon("charizard", 100, 75);
        const bulbz = new GrassPokemon("charizard", 100, 75);
        const cool = new NormalPokemon("charizard", 100, 75);

        expect(charizard.isWeakTo(waterguy)).toBe(true);
        expect(charizard.isWeakTo(bulbz)).toBe(false);
        expect(charizard.isWeakTo(cool)).toBe(false);

        expect(bulbz.isWeakTo(charizard)).toBe(true);
        expect(bulbz.isWeakTo(waterguy)).toBe(false);
        expect(bulbz.isWeakTo(cool)).toBe(false);

        expect(waterguy.isWeakTo(bulbz)).toBe(true);
        expect(waterguy.isWeakTo(charizard)).toBe(false);
        expect(waterguy.isWeakTo(cool)).toBe(false);

        expect(cool.isWeakTo(bulbz)).toBe(false);
        expect(cool.isWeakTo(charizard)).toBe(false);
        expect(cool.isWeakTo(waterguy)).toBe(false);
    });
});

describe("test pokemon species", () => {
    test("each pokemon of a particular species should have the right move", () => {
        const charmander = new Charmander();
        const squirtle = new Squirtle();
        const bulbasaur = new Bulbasaur();
        const rattata = new Rattata();

        expect(charmander.move).toBe("ember");
        expect(squirtle.move).toBe("water gun");
        expect(bulbasaur.move).toBe("vine whip");
        expect(rattata.move).toBe("tackle");
    });
});
