import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { AddPokemonComponent } from './components/add-pokemon/add-pokemon.component';
export const routes: Routes = [
  { path: '', component: HelloComponent },
   { path: 'add', component: AddPokemonComponent },
  {
    path: 'list',
    loadComponent: () => import('./components/list-pokemons/list-pokemons.component').then(m => m.ListPokemonsComponent)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,BrowserModule]
})
export class AppRoutingModule { }
