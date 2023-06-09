import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Observable, concatMap, merge, tap, map, count } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { listApiRes } from '../models/list-api-response';

@Component({
  selector: 'app-dex-list',
  templateUrl: './dex-list.component.html',
  styleUrls: ['./dex-list.component.scss']
})
export class DexListComponent {
  public results$ : Observable<listApiRes>
  public pokemon$: Observable<Pokemon[]>;
  public listSize$: Observable<number>;
  public pageOffset$ : Observable<number>;
  public pokeFilter$ : Observable<Pokemon[]>;
  public pokeFull$ : Observable<Pokemon[]>;
  public count : number = 0;
  public offset : number = 0;
  public size : number = 20;



  constructor(
    public pokemonService: PokemonService,
    public route: ActivatedRoute,
    public router: Router
  ) {

    this.listSize$ = route.queryParams.pipe(map(qp => qp['listSize'] || 20))
    this.pageOffset$ = route.queryParams.pipe(map(qp => qp['pageOffset'] || 0))

    this.results$ = route.queryParams
      .pipe(
        concatMap(qp => this.pokemonService.listPokemon(qp['offset'], qp['listSize']))
      )
    
    this.pokemon$ = this.results$.pipe(map((res => res.results)))
    this.results$.pipe(map(res => res.count)).subscribe(response => {
      this.count = response
    })
    this.pokeFull$ = this.pokemonService.listAll().pipe(map(res => res.results))

    this.pokeFilter$ = this.pokeFull$;
  }


  filterResults(text: string) {
    console.log(text)
    this.pokeFilter$ = this.pokemon$.pipe(map(p =>
      p.filter(po => {
        if (!text)
          return true;
        return po.name!.toLowerCase().includes(text.toLowerCase())
      })
    ));
  }

  setListSize(listSize: number) {
    this.router.navigate([], {
      queryParams: { listSize },
      queryParamsHandling: 'merge', relativeTo: this.route
    })
  }
  
  nextPage(){
    const oldOffset = this.route.snapshot.queryParams['offset'] || 0;
    this.size = this.route.snapshot.queryParams['listSize'] || 20
    const oldPage = parseInt(oldOffset) / this.size
    this.offset = (oldPage + 1) * this.size
    if( this.offset >= this.count - this.size / 2) {this.offset = this.count - this.size + 1}
    this.router.navigate([], {
      queryParams: { offset : this.offset },
      queryParamsHandling: 'merge', relativeTo: this.route
    })
  }


  prevPage(){
    const oldOffset = this.route.snapshot.queryParams['offset'] || 0;
    const size = this.route.snapshot.queryParams['listSize'] || 20
    const oldPage = parseInt(oldOffset) / parseInt(size)
    this.offset = (oldPage - 1) * parseInt(size)
    if(this.offset <= 0){this.offset = 0}
    this.router.navigate([], {
      queryParams: { offset : this.offset },
      queryParamsHandling: 'merge', relativeTo: this.route
    })
  }

  pokemonDetails(name?: string){
    if(name == null) return
    return this.pokemonService.getPokemon(name).subscribe(mon => mon);
  }


}
