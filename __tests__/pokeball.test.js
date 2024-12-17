const Pokeball=require('../pokeball.js');
const  {
    Pokemon,
    FirePokemon,
    WaterPokemon,
    GrassPokemon,
    NormalPokemon,
    Charmander,
    Squirtle,
    Bulbasaur,
    Rattata,
} = require("../pokemon.js");

describe("Pokeball",()=>{
    describe ("Throw",()=>{
        test ("if throw is called with an argument and pokeball is empty cath the pokemon",()=>{
            const pikachu=new Pokemon('pikachu')
            const pokeball=new Pokeball()
            pokeball.throw(pikachu)
            expect (pokeball.capturedPokemon).toBe(pikachu)

        })
        test ("if throw is called with an argument and pokeball is full it should now capture any pokemon and console log you caught pokemons name",()=>{
            const pikachu=new Pokemon('pikachu')
            const bulbazar=new Pokemon('bulbazar')
            const pokeball=new Pokeball()
            const spy= jest.spyOn(console,'log')
            pokeball.throw(pikachu)
            pokeball.throw(bulbazar)
            expect (pokeball.capturedPokemon).toEqual(pikachu)
            expect (spy).toHaveBeenCalledWith("you caught pikachu")
        })
        test("if throw is called with no argument return the pokemon stored and console log Go pokemons name !",()=>{
            const pikachu=new Pokemon('pikachu')
            const pokeball=new Pokeball()
            const spy= jest.spyOn(console,'log')
            pokeball.throw(pikachu)
            expect(pokeball.throw()).toEqual(pikachu)
            expect (spy).toHaveBeenCalledWith("Go pikachu!")
        })
        test("if throw is called with no argument and the pokeball is empty the user should be informed",()=>{
            const pikachu=new Pokemon('pikachu')
            const pokeball=new Pokeball()
            const spy= jest.spyOn(console,'log')
            pokeball.throw()
            expect (spy).toHaveBeenCalledWith("The pokeball is empty!!")
            pokeball.throw(pikachu)
            pokeball.throw()
            expect(pokeball.capturedPokemon).toEqual({})
        })

    })

    describe("isEmpty",()=>{
        test ("should return a boolean",()=>{  
            const pokeball=new Pokeball()
            expect(typeof(pokeball.isEmpty())).toBe('boolean') 
        })
        test("should return true when the pokeball is empty",()=>{
            const pikachu=new Pokemon('pikachu')
            const pokeball=new Pokeball()
            expect(pokeball.isEmpty()).toBe(true)
            pokeball.throw(pikachu)
            expect(pokeball.isEmpty()).toBe(false)
            pokeball.throw()
            expect(pokeball.isEmpty()).toBe(true)
        })
    })
    describe("contain",()=>{
        test("if pokeball is empty return empty..",()=>{
            const pokeball=new Pokeball()
            expect(pokeball.contain()).toBe('empty...')
        })
        test("return the name of the pokemon inside the pokeball is its not empty",()=>{
            const pikachu=new Pokemon('pikachu')
            const pokeball=new Pokeball()
            pokeball.throw(pikachu)
            expect(pokeball.contain()).toBe('pikachu')
        })
    })
})