import { Injectable } from '@angular/core';
import { count, map, of, tap } from 'rxjs';
import { Pokemon } from './models/pokemon';
import { HttpClient } from '@angular/common/http'
import { listApiRes } from './models/list-api-response';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/'

  constructor(private http : HttpClient) { }



  public listPokemon(pageOffset = 0, listSize = 20) {
    const params = {limit : listSize, offset : pageOffset}
    return this.http.get<listApiRes>(`${this.url}pokemon`, {params : params})
  }

  public getPokemon(name: string) {
    name = name.toLowerCase()
    return this.http.get<Pokemon>(`${this.url}pokemon/${name}`)
  }

}
