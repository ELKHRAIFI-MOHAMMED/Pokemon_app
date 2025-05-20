export enum MonsterType {
	PLANT = 'plant',
	ELECTRIC = 'electric',
	FIRE = 'fire',
	WATER = 'water',
}

export interface IMonsterProperties {
	imageUrl: string;
	color: string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
	[MonsterType.PLANT]: {
		imageUrl: 'images/pokemon2.jpeg',
		color: 'rgb(135, 255, 124)'
	},
	[MonsterType.ELECTRIC]: {
		imageUrl: 'images/pokemon2.jpeg',
		color: 'rgb(255, 255, 104)'
	},
	[MonsterType.FIRE]: {
		imageUrl: 'images/pokemon2.jpeg',
		color: 'rgb(255, 104, 104)'
	},
	[MonsterType.WATER]: {
		imageUrl: 'images/pokemon2.jpeg',
		color: 'rgb(118, 234, 255)'
	},
}
