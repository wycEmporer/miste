import { Filter } from './Filter.js'
import { Flight } from '../../models/flight'

export class OnewayFilter extends Filter{
    constructor(flights) {
        super() 
        this.departFlights = flights
        /**
        *@type {[TimeRangeOptionRound]}
        */
        this.departTimeRangeOptions = []
    }

    /**
     * 
     * @param {[Flight]} flights
     */
    getSuitableFlightsInArr(flights, timeRangeOptions) {
        let res = []

        res = Filter.getSuitableFlightsInTimeRanges(timeRangeOptions, flights)
        res = Filter.getFilghtsInStopOptions(this.stopOptions, res)
        res = Filter.getFlightsWithAirlines(this.airlineOptions, res)
        res = Filter.getFlightsInPriceRange(this.priceOption, res)
        
        return res 
    }

    getSuitableFlights() {
        let res = this.getSuitableFlightsInArr(this.departFlights, this.timeRangeOptions)
        return res 
    }
}