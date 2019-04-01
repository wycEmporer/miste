import { Airline } from '../airline'
import { StopOptions } from './stopoptions/StopOption.js'
import { TimeRangeOption } from './timerangeoptions/TimeRangeOption.js'
import { StopOption } from './stopoptions/StopOption.js'
import { NonStopOption } from './stopoptions/NonStopOption.js'
import { MoreStopsOption } from './stopoptions/MoreStopsOption.js'
import { Flight } from '../flight'
import { PriceRangeOption } from './pricerangeoptions/PriceRangeOption.js'

export class Filter{

/**
 * 
 * @param {[Flight]} flights
 */
    constructor() {
        /**
        * @type { [StopOption] }
        */
        this.stopOptions = []
        
        /**
        * @type { [Airline] }
        */
        this.airlineOptions = []
        /**
        * @type { [PriceRangeOption] }
        */
        this.priceOption = new PriceRangeOption(0, 40000)
	}


    /**
     * @param {[Airline]} airlines
     */
    static getFlightsWithAirlines(airlines, flights) {
        if (Object.is(airlines.length, 0)) {
            return flights
        }
		let res = []
		
        for (let airline of airlines) {
            for (let flight of flights) {
				if (airline == flight.airline) {
                    res.push(flight)
				} 
			}
		}
		return res
	}

    /**
     * 
     * @param {Number} stopNumber
     */
    static getFlightByStopNumber(stopNumber, flights) {
        if (Object.is(stopNumber.length, 0)) {
            return flights
        }
        let res = []
        for (let f of flights) {
            if (object.is(f.stops.length, stopNumber)) {
                 res.push(f)
            }
        }
        return res 
    }

    /**
     *
     * @param {Number} stopNumber
     */
    static getFlightsNotInStopNumber(stopNumber, flights) {
        let res = []
        for (let f of flights) {
            if (!object.is(f.stops.length, stopNumber)) {
                res.push(f)
            }
        }
        return res 
    }
    /**
     * @param {[OneStopOption]} stopOptions
     */
    static getFilghtsInStopOptions(stopOptions, flights) {
        if (Object.is(stopOptions.length, 0)) {
            return flights
        }

        let res = []
        for (let opt of stopOptions) {
            if (opt instanceof NonStopOption) {
                res.push(...Filter.getFlightByStopNumber(0, flights))
            }

            if (opt instanceof MoreStopsOption) {
                res.push(...Filter.getFlightsNotInStopNumber(0, flights))
            }
        }

		return res
    }

    /**
     *
     * @param {PriceRangeOption} priceRange
     */
    static getFlightsInPriceRange(priceRange, flights) {
  
        let res = []
        for (let f of flights) {
            if ((f.price >= priceRange.min) && (f.price <= priceRange.max)) {
                res.push(f)
            }
        }
        return res
    }

   /**
    * @param {[TimeRangeOption]} timeRanges
    */
    static getSuitableFlightsInTimeRanges(timeRanges, flights) {
        if (Object.is(timeRanges.length, 0)) {
            return flights
        }

        let suitableFlightArr = []
        for (let tr of timeRanges) {
            suitableFlightArr.push(Filter.getFlightAtTimeRange(tr))
        }

        let res = []
        for (let a of suitableFlightArr) {
            res = Filter.mergeArraysWithoutDuplicateItems(res, a)
        }

        return res
    }

    getSuitableFlights() {
        //this method sampliy return, need to fullfiled this method at extend class
        return 
    }

    /**
     *
     * @param {[]} arr1
     * @param {[]} arr2
     */
    static mergeArraysWithoutDuplicateItems(arr1, arr2) {
        let arr = arr2
        for (let m of arr1) {
            if (!arr.includes(m)) {
                arr.push(m)
            }
        }
    }

    /**
     * 
     * @param {Array} arr1
     * @param {Array} arr2
     * @returns arr Array
     */
    static mergeArraysOnlyWithDuplicateItems(arr1, arr2) {
        let arr = []
        for (let m of arr1) {
            for (let n of arr2) {
                if (Object.is(m, n)) {
                    arr.push(m)
                }
            }
        }
        return arr
    }
}