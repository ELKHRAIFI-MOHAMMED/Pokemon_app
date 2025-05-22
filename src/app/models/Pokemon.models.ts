import { MonsterType } from "../utils/monster.utils";

export class Pokemon {
  id:string;
  name: string;
  hp: number;
  figureCaption: string;
  attackName: string;
  attackStrength: number;
  attackDescription: string;
  image: string;
  type: MonsterType ;

  constructor(
    id: string = "10",
    name: string = "Monster",
    hp: number = 10,
    figureCaption: string = "N°001 Monster",
    attackName: string = "Standard Attack",
    attackStrength: number = 10,
    attackDescription: string = "A standard attack",
    image: string="images/pokemon2.jpeg",
    type: MonsterType = MonsterType.ELECTRIC,
  ) {
    this.id=id
    this.name = name;
    this.hp = hp;
    this.figureCaption = figureCaption;
    this.attackName = attackName;
    this.attackStrength = attackStrength;
    this.attackDescription = attackDescription;
    this.image=image;
     this.type = type;
  }
}
