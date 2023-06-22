export class Pokemon{
    id? : number;
    name? : string;
    height? : number;
    weight? : number;
    baseXp? : number;
    hp? : number;
    attack? : number;
    specialAttack? : number;
    defense? : number;
    specialDefense? : number;
    speed? : number;
    evasion? : number;
    accuracy? : number;
    generationId? : number;
    evolutionEvolvesToNavigations? : number;
    evolutionPokemons? : number;
    sprite? : {normal : string, shiny? : string};
    trainersPokemons? : number;
    abilities? : {id : number, name? : string};
    moves? : {};
    types? : {};
}
