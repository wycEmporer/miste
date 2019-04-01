import { DiscountItem } from "../../discountitem/DiscountItem.js";
import { RoundTripDiscountPolicy } from "../RoundTripDiscountPolicy.js";

export class RoundTripUnionDiscountPolicy extends RoundTripDiscountPolicy {
 
  constructor(rtd) {
    super();
    this.deaprtDiscountPrice = 0;
    this.returnDiscountPrice = 0;
    this.rtd = rtd;
    // this.unionDiscountItemList = unionDiscountItemList
  }

  checkIfAvaliable(departFilgt, retrunFlight) {
    return true;
  }


  calculateDiscount(DFlight, RFlight) {
    let dfd = 0,
      rfd = 0;
    let rtd = this.rtd;
    if (DFlight.airline.shortname == RFlight.airline.shortname) {
      // return dfd,rfd discount , fn: fligth number
      DFlight.disFn = DFlight.flightNumber.replace(/\//g, "");
      RFlight.disFn = RFlight.flightNumber.replace(/\//g, "");
      if (rtd && rtd.or[DFlight.disFn + "/" + RFlight.disFn]) {
        dfd = Math.floor(rtd.or[DFlight.disFn + "/" + RFlight.disFn] / 2);
        rfd = rtd.or[DFlight.disFn + "/" + RFlight.disFn] - dfd;
      } else if (rtd) {
        if (rtd.o[DFlight.disFn]) {
          dfd = rtd.o[DFlight.disFn];
        }
        if (rtd.r[RFlight.disFn]) {
          rfd = rtd.r[RFlight.disFn];
        }
      }
    }
    DFlight.commonDiscount = DFlight.commonDiscount + dfd;
    RFlight.commonDiscount = RFlight.commonDiscount + rfd;
    DFlight.airlineDIS = dfd;
    RFlight.airlineDIS = rfd;
  }
}
