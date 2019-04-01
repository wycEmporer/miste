import {Passenger} from './Passenger.js'

export class Infant extends Passenger {
	constructor (firstname, lastname,birthday,title,symbel) {
		super(firstname, lastname,birthday,title,symbel)
	}
		getJsonPropertis(i,object){
		super.getJsonPropertis(i,object)
		if(i=="symbel"){
			object.symbel = this.symbel
		}
	}

	setJsonToObjPropertis(i,object){
		super.setJsonToObjPropertis(i,object)
		if(i=="symbel"){
			this.symbel = object.symbel
		}
	}
}	