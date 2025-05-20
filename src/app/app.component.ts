import { Component, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
@Component({
  selector: 'app-roote',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
