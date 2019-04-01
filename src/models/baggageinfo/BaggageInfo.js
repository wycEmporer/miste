import {SerializableObject} from '../serializable'

export class BaggageInfo extends SerializableObject{
	constructor (flightNumber, allowenceBaggageWeight, carryBaggageWeight) {
		super()
		this.flightNumber = flightNumber
		this.allowenceBaggageWeight = allowenceBaggageWeight
		this.carryBaggageWeight = carryBaggageWeight
	}

	getJsonPropertis(i,object){
		if(i=="flightNumber"){
			object.flightNumber =this.flightNumber
		}else if(i=="allowenceBaggageWeight"){
			object.allowenceBaggageWeight=this.allowenceBaggageWeight
		}else if(i=="carryBaggageWeight"){
			object.carryBaggageWeight = this.carryBaggageWeight
		}
	}

	setJsonToObjPropertis(i,object){
		if(i=="flightNumber"){
			this.flightNumber=object.flightNumber 
		}else if(i=="allowenceBaggageWeight"){
			this.allowenceBaggageWeight=object.allowenceBaggageWeight
		}else if(i=="carryBaggageWeight"){
			this.carryBaggageWeight=object.carryBaggageWeight
		}
	}

}