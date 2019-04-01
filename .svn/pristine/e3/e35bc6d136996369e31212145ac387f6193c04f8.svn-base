import {CabinClass} from '../cabinclass/CabinClass.js'
import {Economy} from '../cabinclass/Economy.js'
import {Business} from '../cabinclass/Business.js'
import {First} from '../cabinclass/First.js'
import {PremiumEconomy} from '../cabinclass/PremiumEconomy.js'


export class CabinClassUtil {
	static getClassString (ins) {
		let description = '';
		if (ins instanceof Economy) {
			description = 'Economy'
		} else if (ins instanceof Business) {
			description = 'Business' 
		} else if (ins instanceof First) {
			description = 'First'
		} else if (ins instanceof PremiumEconomy) {
			description = 'Premium Economy'
		}
		return description;
	}

	static getClassObj(item){
		if(item == 'Economy'){
			return new Economy();
		}else if(item == 'Business'){
			return new Business();
		}else if(item == 'First'){
			return new First();
		}else if(item == 'Premium Economy'){
			return new PremiumEconomy();
		}
	}
}