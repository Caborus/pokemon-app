import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DexListComponent } from './dex-list/dex-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {
    path: '', pathMatch : 'full', redirectTo : 'list'
  },
  {
    path: 'list', component: DexListComponent
  },
  {
    path: ':name', component: PokemonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
