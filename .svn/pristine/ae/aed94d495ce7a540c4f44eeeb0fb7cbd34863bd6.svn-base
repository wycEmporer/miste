
import {SerializableObject} from '../serializable'

export class ContactInfo extends SerializableObject{

	constructor (name, cellphone, email) {
		super()
		this.name = name
		this.cellphone = cellphone
		this.email = email
	}

	getJsonPropertis(i,object){
		if(i=="name"){
			object.name = this.name 
		}else if(i=="cellphone"){
			object.cellphone = this.cellphone
		}else if(i=="email"){
			object.email = this.email
		}
	}

	setJsonToObjPropertis(i,object){
		if(i=="name"){
			this.name =object.name 
		}else if(i=="cellphone"){
			this.cellphone=object.cellphone  
		}else if(i=="email"){
			this.email=object.email
		}
	}
}