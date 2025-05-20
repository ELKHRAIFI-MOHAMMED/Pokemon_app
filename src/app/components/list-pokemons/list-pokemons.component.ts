import { Component,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';
import { Pokemon } from '../../models/Pokemon.models';
import { MonsterType } from '../../utils/monster.utils';
import { SerchBarComponent } from '../serch-bar/serch-bar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-list-pokemons',
  imports: [SerchBarComponent,PlayingCardsComponent, HttpClientModule,   CommonModule,
],
  templateUrl: './list-pokemons.component.html',
  styleUrl: './list-pokemons.component.css'
})
export class ListPokemonsComponent {
   pokemon1:Pokemon =new Pokemon('Pikachu',
      35,
      'N°025 Pikachu',
      'Thunderbolt',
      55,
      'A strong electric shock attack',
      'images/pikachu.png',
      MonsterType.ELECTRIC)
  pokemons = signal<Pokemon[]>([]);
  listPokemons = signal<Pokemon[]>([...this.pokemons()]);
  constructor(private http: HttpClient) {}

  public getData() {
  this.http.get<Pokemon[]>('http://localhost:3004/pokemons')
    .subscribe((data) => {
      this.listPokemons.set(data);
      this.pokemons.set(data);
    });
   }

    ngOnInit(): any {
     this.getData()
  }

   serchFilter(value: string) {
    if (value === '') {
      this.listPokemons.set([...this.pokemons()]);
    } else {
      const filtered = this.pokemons().filter((pokemon) =>
        pokemon.name.toUpperCase().includes(value.toUpperCase())
      );
      this.listPokemons.set(filtered);
    }
  }

  setPokemon() {
    alert(1)
   // Pour modifier un élément spécifique dans le signal
    this.listPokemons.update((current) => {
      const updated = [...current];
      updated[5] = new Pokemon(
        'Eevee',
        55,
        'N°133 Eevee',
        'Quick Attack',
        40,
        'Fast physical strike',
        'images/eevee.png',
        MonsterType.ELECTRIC
      );
      return updated;
    });
  }
}
