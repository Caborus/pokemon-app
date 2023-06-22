import { Injectable } from '@angular/core';
import { count, map, of, tap } from 'rxjs';
//import { Pokemon } from './models/Pokemon';
import { HttpClient } from '@angular/common/http'
import { listApiRes } from './models/list-api-response';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private url = 'https://localhost:7007/'

  constructor(private http : HttpClient) { }

  public listAll() {
    return this.http.get<any>(`${this.url}Pokemon`)
  }

  public listPokemon() {
    return this.http.get<any>(`${this.url}Pokemon`)
  }

  public getPokemon(name: string) {
    return this.http.get<any>(`${this.url}Pokemon/${name}`)
  }

}
