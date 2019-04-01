import {RoundTripDiscountPolicy} from '../RoundTripDiscountPolicy.js'


export class RoundTripCompanyDiscountPolicy extends RoundTripDiscountPolicy {

	constructor (discountItemList) {
		super()
		this.discountItemList = discountItemList 
	}


	checkIfAvaliable (departFilgt, retrunFlight) {
		return true
	}

	calculateDiscount(departFlight, returnFlight) {
		
        for (let item of this.discountItemList) {
            
            if (Object.is(item.flightNumber, departFlight.flightNumber)) {
 				 departFlight.realDiscount = item.discountPrice
            }
            if (Object.is(item.flightNumber, returnFlight.flightNumber)) {
				returnFlight.realDiscount = item.discountPrice
			}
		}
	}

	firstCalculateDiscount(flight) {
		
        for (let item of this.discountItemList) {
            	if (Object.is(item.flightNumber, flight.flightNumber)) {
 					flight.realDiscount = item.discountPrice	
          	  }
		}
	}

}
