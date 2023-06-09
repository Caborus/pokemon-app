import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Observable, concatMap, map } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { DexListComponent } from '../dex-list/dex-list.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {

  public name$ : Observable<string>
  public pokemon$ : Observable<Pokemon>
  public toggleSwitch = false;

  constructor( 
    public activatedRoute : ActivatedRoute, 
    public pokemonService : PokemonService
    ){
    this.name$ = activatedRoute.params.pipe(map((params) => params['name']))
    this.pokemon$ = this.name$.pipe(concatMap(n => pokemonService.getPokemon(n)))
  }

  checkValidImage(url? : string){
    if(url == null) return false
    return true;
  }

  weightConv(weight? : number){
    if(weight == null) return 0;
    return Math.ceil((weight * 0.01) * 100) / 100;
  }
  heightConv(height? : number){
    if(height == null) return 0;
    return Math.ceil((height * 0.1) * 100) / 100;
  }
  getTypeImage(type? : string){
    if(type == null){
      return '';
    }

    switch (type){
      case 'normal': {
        return '../../assets/Normal_icon.png'
        break;
      } case 'fire': {
        return '../../assets/Fire_icon.png'
        break;
      } case 'water': {
        return '../../assets/Water_icon.png'
        break;
      } case 'grass': {
        return '../../assets/Grass_icon.png'
        break;
      } case 'electric': {
        return '../../assets/Electric_icon.png'
        break;
      } case 'ice': {
        return '../../assets/Ice_icon.png'
        break;
      } case 'fighting': {
        return '../../assets/Fighting_icon.png'
        break;
      } case 'poison': {
        return '../../assets/Poison_icon.png'
        break;
      } case 'ground': {
        return '../../assets/Ground_icon.png'
        break;
      } case 'flying': {
        return '../../assets/Flying_icon.png'
        break;
      } case 'psychic': {
        return '../../assets/Psychic_icon.png'
        break;
      } case 'bug': {
        return '../../assets/Bug_icon.png'
        break;
      } case 'rock': {
        return '../../assets/Rock_icon.png'
        break;
      } case 'ghost': {
        return '../../assets/Ghost_icon.png'
        break;
      } case 'dark': {
        return '../../assets/Dark_icon.png'
        break;
      } case 'dragon': {
        return '../../assets/Dragon_icon.png'
        break;
      } case 'steel': {
        return '../../assets/Steel_icon.png'
        break;
      } case 'fairy': {
        return '../../assets/Fairy_icon.png'
        break;
      } default: {
        break;
      }
    }
    return;
  }
}
