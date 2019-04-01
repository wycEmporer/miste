import { OnewayFilter } from './OnewayFilter'

export class RoundTripFilter extends OnewayFilter{

    constructor(departFlights, returnFlights) {
        super(departFlights)
        this.returnFlights = returnFlights

        /**
        *@type {[TimeRangeOptionRound]}
        */
        this.returnTimeRangeOptions = []
    }

    getSuitableFlights() {
        let res = super.getSuitableFlights()
        let des = super.getSuitableTimeRangeFlights(this.returnTimeRangeOptions)

        return super.mergeArraysOnlyWithDuplicateItems(res, des)
    }

}