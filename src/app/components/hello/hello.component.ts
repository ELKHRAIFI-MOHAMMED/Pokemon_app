import { CommonModule } from '@angular/common';
import { Component,signal } from '@angular/core';
import { RouterOutlet ,RouterModule} from '@angular/router';
import { Pokemon } from '../../models/Pokemon.models';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';
@Component({
  selector: 'app-hello',
  imports: [RouterOutlet,RouterModule,PlayingCardsComponent,CommonModule],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent {
pokemons = signal<Pokemon[]>([
    new Pokemon(
      'Pikachu',
      35,
      'N°025 Pikachu',
      'Thunderbolt',
      55,
      'A strong electric shock attack',
      'images/elct3.jpeg',
      MonsterType.ELECTRIC
    ),
    new Pokemon(
      'Charmander',
      39,
      'N°004 Charmander',
      'Flamethrower',
      60,
      'Shoots fire from its mouth',
      'images/fire1.jpeg',
      MonsterType.FIRE
    ),
    new Pokemon(
      'Bulbasaur',
      45,
      'N°001 Bulbasaur',
      'Vine Whip',
      45,
      'Whips with vines',
      'images/plane1.jpeg',
      MonsterType.PLANT
    ),
    new Pokemon(
      'Squirtle',
      44,
      'N°007 Squirtle',
      'Water Gun',
      40,
      'Shoots water',
      'images/water1.jpeg',
      MonsterType.WATER
    )
  ]);
}
