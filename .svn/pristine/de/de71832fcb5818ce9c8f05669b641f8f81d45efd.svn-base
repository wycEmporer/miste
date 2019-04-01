import {RoundTripDiscountPolicy} from '../RoundTripDiscountPolicy.js'

//current time
var DATE_AVALIABLE_ORDER_CREATE_DEADLINE =null //new Date(1498847400000)
// departflight
var DATE_AVALIABLE_DEPART_DEADLINE = null//new Date(1514745000000)
//min price
var minPrice =0
class DiscountRange {
	constructor (min, max, discount) {
		this.min = min
		this.max = max
		this.discount = discount
	}
}

var DISCOUNT_RANGE_ARR = []
	// new DiscountRange(0, 2999, 200),
	// new DiscountRange(2999, 4999, 350),
	// new DiscountRange(4999, 9999, 850),
	// new DiscountRange(9999, 19999, 1100),
	// new DiscountRange(19999, 10000000, 1600)

export class RoundTripLadderPolicy extends RoundTripDiscountPolicy {

	constructor (props) {
		super()
		this.getDiscountRangeArr(props)
		
	}
	//get ladder policy condition
	getDiscountRangeArr(props){
		
		if(props!=null){
			DATE_AVALIABLE_DEPART_DEADLINE = new Date(props.flightMaxDate[1])
			DATE_AVALIABLE_ORDER_CREATE_DEADLINE = new Date(props.preMaxDate[1])
			minPrice = props.minPrice
			let j=0
			for(let i =0;i<props.revenue.length;i++){

				if(i!=props.revenue.length-1){
					j++

					DISCOUNT_RANGE_ARR.push(new DiscountRange(props.revenue[i],props.revenue[i+1],props.reward[j])) 
				}
			}
		}
	}
	checkIfAvaliable (departFlight, retrunFlight) {
		
		if (this.isOrderCreateDateBeforeDeadline()) {
			if (this.isDepartDateBeforeDeadline(departFlight.departDate)) {
				return true
			}
		}

		return false
	}

	calculateDiscount (departFlight, returnFlight) {
	
		
		let price = departFlight.realPrice + returnFlight.realPrice
		
		if (price <= 0) {
			throw new Error('Price can not lower 0')
		}else {
			for (let range of DISCOUNT_RANGE_ARR) {

				if (range.min < price && range.max >= price) {
					let departPrice = Math.floor(range.discount / 2)

					let returnPrice = range.discount - departPrice
					
					if(departFlight.obfp<minPrice || (departFlight.obfp<departPrice+minPrice)){

						departFlight.realDiscount = departFlight.obfp-minPrice
					}else{
						departFlight.realDiscount = departPrice
					}

					
					if(returnFlight.obfp<minPrice || (returnFlight.obfp<departPrice+minPrice)){
						returnFlight.realDiscount = returnFlight.obfp-minPrice
					}else{
						returnFlight.realDiscount = returnPrice
					}
				}
			}
		}
	}

	firstCalculateDiscount (flight) {
	
		let price = flight.realPrice
		
		if (price <= 0) {
			throw new Error('Price can not lower 0')
		} else if (0 < price && price <= DISCOUNT_RANGE_ARR[0].discount) {
			
			if(price<=minPrice){
					flight.commonDiscount=0
					
					flight.price =minPrice
				}else{
					flight.commonDiscount = flight.price-minPrice
					
				}

		} else {
			for (let range of DISCOUNT_RANGE_ARR) {
				if (range.min < price && range.max >= price) {
						
						flight.commonDiscount =  range.discount
					//returnFlight.realDiscount = range.discount - departFlight.realDiscount

					if(flight.price-flight.commonDiscount<minPrice){
						if(flight.price>minPrice){
							flight.commonDiscount = flight.price-minPrice
						}else{
							flight.commonDiscount = 0
							flight.price = minPrice
						}
					}
				}
			}
		}
	}
	isOrderCreateDateBeforeDeadline () {
		let currentDate = new Date()
		if (currentDate < DATE_AVALIABLE_ORDER_CREATE_DEADLINE) {
			return true
		} else {
			return false 
		}
	}

	isDepartDateBeforeDeadline (departDate) {
		if (departDate < DATE_AVALIABLE_DEPART_DEADLINE) {
			return true
		} else {
			return false 
		}
	}
}

