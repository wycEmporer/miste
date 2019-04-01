import {DiscountPolicy} from './discountpolicy/DiscountPolicy.js'

class RelavtiveFlight {
	constructor (flight, discount) {
		this.flight = flight 
		this.discount = discount
	}
}

export class RoundTripDiscountManager{
	constructor (departFlights, returnFlights, policys) {
		
		this.departFlights = departFlights 
		this.returnFlights = returnFlights
		this.policys = policys

		this.commonDiscountItems = []

	}

	calculateDiscount (departFlight, returnFlight) {
		
		for (let cp of this.policys) {
			if (cp.checkIfAvaliable(departFlight, returnFlight)) {
				cp.calculateDiscount(departFlight, returnFlight)
				
			}
		}
	}

	// first Calculate the price 
	firstCalculateDiscount(){
		// debugger
		//1 symbel departFlight
		this.calculateFlight(this.departFlights,1)
		this.calculateFlight(this.returnFlights,2)
	}
	calculateFlight(flights){
		
		for(let flight of flights){

			for (let p of this.policys) {
			// if (p instanceof DiscountPolicy) {
			// 	if (p.checkIfAvaliable(departFlight,null)) {

			// 		let res = p.calculateDiscount(departFlight,null)
			// 		departFlight.realDiscount += res.departDiscountPrice
			// 	}
			// } else 
				if (p instanceof Array) {
					
	        for (let cp of p) {
						if (cp.checkIfAvaliable(flight, null)) {
							let res = cp.firstCalculateDiscount(flight)
							//departFlight.realDiscount += res.departDiscountPrice
							//returnFlight.realDiscount += res.returnDiscountPrice
							break
						}
					}
				}


			}
		}
	}



	// getDiscountPriceFromArray (priceArr) {
	// 	let count = 0
	// 	for (let p of price) {
	// 		count += p
	// 	}
	// 	return count
	// }

	// getRelativeRetrunFlightItems (departFlight) {
	// 	return mappedRelativeDiscountFlights.depart.get(departFlight)
	// }

	// getRelativeDepartFlightItems (returnFlight) {
	// 	return mappedRelativeDiscountFlights.depart.get(returnFlight)
	// }

}

