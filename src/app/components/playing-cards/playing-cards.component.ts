import { Pokemon } from './../../models/Pokemon.models';
import { Component ,input,Input,InputSignal ,OnInit} from '@angular/core';
import { MonsterTypeProperties } from '../../utils/monster.utils';


@Component({
  selector: 'app-playing-cards',
  imports: [],
  templateUrl: './playing-cards.component.html',
  styleUrl: './playing-cards.component.css'
})
export class PlayingCardsComponent {
  @Input() isLarge: boolean = false;
  pokemon:InputSignal<Pokemon>=input(new Pokemon(), {
		alias: "my-pokemon",
	})
  monsterTypeIcon: string =  MonsterTypeProperties[this.pokemon().type].imageUrl;
	backgroundColor: string = MonsterTypeProperties[this.pokemon().type].color;

  ngOnInit(): void {
    this.monsterTypeIcon = MonsterTypeProperties[this.pokemon().type].imageUrl;
    this.backgroundColor = MonsterTypeProperties[this.pokemon().type].color;
  }


}
