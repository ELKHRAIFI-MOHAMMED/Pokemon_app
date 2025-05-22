import { Pokemon } from './../../models/Pokemon.models';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';
import { MonsterType } from '../../utils/monster.utils';
import { SerchBarComponent } from '../serch-bar/serch-bar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-pokemons',
  imports: [
    SerchBarComponent,
    PlayingCardsComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './list-pokemons.component.html',
  styleUrl: './list-pokemons.component.css',
})
export class ListPokemonsComponent {
  loading:boolean=false;
  selectedPokemon: any = null;
  pokemon1: Pokemon = new Pokemon(
    '1',
    'Pikachu',
    35,
    'N°025 Pikachu',
    'Thunderbolt',
    55,
    'A strong electric shock attack',
    'images/pikachu.png',
    MonsterType.ELECTRIC
  );
  pokemons = signal<Pokemon[]>([]);
  listPokemons = signal<Pokemon[]>([...this.pokemons()]);
  constructor(private http: HttpClient, private router: Router) {}

  openCardPopup(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  closeCardPopup() {
    this.selectedPokemon = null;
  }

  public getData() {
    this.http
      .get<Pokemon[]>('https://back.smdvv.ma/public/api/pokemons')
      .subscribe((data) => {
        this.listPokemons.set(data);
        this.pokemons.set(data);
        this.loading=false
      });
  }

  public deletePokemon(): void {
    this.loading=true;
    const idPokemon = this.selectedPokemon.id;
    this.http
      .delete(`https://back.smdvv.ma/public/api/pokemons/${idPokemon}`, {
        observe: 'response',
      })
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log(this.listPokemons);
          console.log(111111111111111);
          if (response.status === 200) {
            this.listPokemons.update((pokemons) => {
              const updated = pokemons.filter((p) => p.id !== idPokemon);
              console.log('Liste mise à jour:', updated);
              return updated;
            });
            this.closeCardPopup();
            console.log('Pokemon supprimé avec succès');
            console.log(this.listPokemons);
            this.loading=false
            // Tu peux ajouter ici d'autres actions (ex: refresh de la liste)
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression du Pokemon :', error);
        }
      );
  }

  public editPokemons() {
    const pokemon = this.selectedPokemon;
    this.router.navigate(['/add'], {
      state: { pokemon: pokemon },
    });
    this.closeCardPopup();
  }

  ngOnInit(): any {
    this.loading=true
    this.getData();
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
    alert(1);
    // Pour modifier un élément spécifique dans le signal
    this.listPokemons.update((current) => {
      const updated = [...current];
      updated[5] = new Pokemon(
        '2',
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
