import { DomainManager } from "../../config/DomainManager.js";
import { Flight } from "../flight";
import { TimeFormatUtil } from "../utils";
import { FlightOrder } from "./FlightOrder.js";

export class RoundTripOrder extends FlightOrder {
  constructor(
    departAirport,
    destinationAirport,
    departDate,
    returnDate,
    adults = [],
    children = [],
    infants = [],
    cabinClass,
    contactInfo,
    baggageinfo = [],
    serviceFee,
    orderNumber
  ) {
    super(
      departAirport,
      destinationAirport,
      departDate,
      adults,
      children,
      infants,
      cabinClass,
      contactInfo,
      baggageinfo,
      serviceFee,
      orderNumber
    );
    this.returnDate = returnDate;
    this.orderType = 'two';
  }
  getSearchQueryMap() {
    let params = super.getSearchQueryMap();
    params.set("tripType", "1");
    params.set(
      "departDate",
      TimeFormatUtil.getYearMonthDateString(this.departDate)
    );
    params.set(
      "returnDate",
      TimeFormatUtil.getYearMonthDateString(this.returnDate)
    );
    return params;
  }

  getSearchQueryString() {
    return DomainManager.getQueryString(this.getSearchQueryMap());
  }

  searchSuitableFlights(vueComp) {
    return super.searchSuitableFlights(vueComp);
  }

  setDepartFlight(vm, flight) {
    vm.$set(this, "departFlight", flight);
  }
  setFee(vm, flight) {
    vm.$set(this, "fee", flight);
  }

  getDepartFlight() {
    return this.departFlight;
  }

  setReturnFlight(vm, flight) {
    vm.$set(this, "returnFlight", flight);
  }

  getReturnFlight() {
    return this.returnFlight;
  }

  getCheckPriceJsonParm() {
    let self = this;
    let jsonParam = super.getCheckPriceJsonParm();
    jsonParam.departFlight = self.departFlight.flightInfoBack;

    jsonParam.returnFlight = self.returnFlight.flightInfoBack;

    jsonParam.requestFromClient.tripType = "1";
    jsonParam.requestFromClient.departDate = TimeFormatUtil.getYearMonthDateString(
      this.departDate
    );
    jsonParam.requestFromClient.returnDate = TimeFormatUtil.getYearMonthDateString(
      this.returnDate
    );

    return jsonParam;
  }
  getFlightDateJson() {
    let arr = super.getFlightDateJson();
    let returnTime = this.returnFlight.departDate;
    let returnTimeStr = TimeFormatUtil.getYearMonthDateString(returnTime);
    arr.push(returnTimeStr);

    return arr;
  }

  checkPrice(vueComp) {
    return super.checkPrice(vueComp);
  }
  //保存订单
  saveOrder(vueComp) {
    return super.saveOrder(vueComp);
  }
  getSaveOrderFlight(vueComp) {
    return super.getSaveOrderFlight(vueComp);
  }

  getJsonPropertis(i, object) {
    super.getJsonPropertis(i, object);

    if (i == "returnDate") {
      object.returnDate = Date.parse((this.returnDate instanceof Date) ? this.returnDate : this.returnDate.replace('-', '/'));
    } else if (i == "returnFlight") {
      object.returnFlight = this.returnFlight.toJSON();
    }
    object.orderType = "two";
  }

  setJsonToObjPropertis(i, object) {
    super.setJsonToObjPropertis(i, object);
    if (i == "returnDate") {
      this.returnDate = new Date(object.returnDate);
    } else if (i == "returnFlight") {
      let flight = new Flight();
      flight.toObject(object.returnFlight);
      this.returnFlight = flight;
    }
  }

  //Get the assembled array of myself
  getCheckPassengerAgeResultObj(failInfo) {
    let reslutObj = {};
    let childArr = [];
    let infantArr = [];
    for (let i in failInfo) {
      let symbelArr = i.split("_");
      if (symbelArr[0] == "child") {
        childArr.push(symbelArr);
        //if(failInfo[])
      } else if (symbelArr[0] == "infants") {
        symbelArr.push(failInfo[i].actualPassengerType);
        infantArr.push(symbelArr);
      }
    }
    reslutObj.child = childArr;
    reslutObj.infants = infantArr;

    return reslutObj;
  }
  //from array info set error messageArr
  getDateErrorMsgArr(failInfo) {
    let reslutObj = this.getCheckPassengerAgeResultObj(failInfo);
    let errorMsgArr = [];
    let errorChildArr = [];
    let errorInfantsArr = [];
    for (let i in reslutObj) {
      console.log(i);
      if (i == "child") {
        console.log(reslutObj[i]);
        let childObjArr = reslutObj.child;
        for (let p = childObjArr.length - 1; p >= 0; p--) {
          let errorChildMsgs = "";
          errorChildMsgs =
            "Child" +
            (Number(childObjArr[p][1]) + 1) +
            " 's date of birth has to be under 12 years at the time of travel.";
          errorChildArr.push(errorChildMsgs);
        }
      }
      if (i == "infants") {
        let infantObjArr = reslutObj.infants;

        for (let p = infantObjArr.length - 1; p >= 0; p--) {
          let errorInfantMsg = "";
          if (infantObjArr[p][2] == "4") {
            errorInfantMsg =
              "Infant " +
              Number(infantObjArr[p][1] + 1) +
              " 's date of birth has to be up 14 days at the time of travel.";
          } else {
            errorInfantMsg =
              "Infant " +
              Number(infantObjArr[p][1] + 1) +
              " 's date of birth has to be under 2 years at the time of travel.";
          }
          errorInfantsArr.push(errorInfantMsg);
        }
      }
    }
    for (let i in errorChildArr) {
      errorMsgArr.push(errorChildArr[i]);
    }
    for (let i in errorInfantsArr) {
      errorMsgArr.push(errorInfantsArr[i]);
    }
    return errorMsgArr;
  }
}
