import { DomainManager } from "../../config/DomainManager.js";
import { TimeFormatUtil } from "../utils";
import { FlightOrder } from "./FlightOrder.js";

export class OnewayOrder extends FlightOrder {
  constructor(
    departAirport,
    destinationAirport,
    departDate,
    adults = [],
    children = [],
    infants = [],
    cabinClass,
    contactInfo,
    serviceFee,
    orderNumber,
    onewayOrder
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
      serviceFee,
      orderNumber
    );
    this.orderType = 'one';
  }
  
  getSearchQueryMap() {
    let params = super.getSearchQueryMap();
    params.set("tripType", "0");
    params.set(
      "departDate",
      TimeFormatUtil.getYearMonthDateString(this.departDate)
    );
    return params;
  }

  getSearchQueryString() {
    return DomainManager.getQueryString(this.getSearchQueryMap());
  }

  getCheckPriceJsonParm() {
    let self = this;
    let jsonParam = super.getCheckPriceJsonParm();

    jsonParam.departFlight = self.departFlight.flightInfoBack;

    jsonParam.requestFromClient.departDate = TimeFormatUtil.getYearMonthDateString(
      this.departDate
    );
    jsonParam.requestFromClient.tripType = "0";

    return jsonParam;
  }

  checkPrice(vueComp) {
    return super.checkPrice(vueComp);
  }

  check(vueComp) {
    return super.check(vueComp);
  }

  //save order
  saveOrder(vueComp) {
    return super.saveOrder(vueComp);
  }
  getSaveOrderFlight(vueComp) {
    return super.getSaveOrderFlight(vueComp);
  }
  searchSuitableFlights(vueComp) {
    return super.searchSuitableFlights(vueComp);
  }

  setDepartFlight(vm, flight) {
    vm.$set(this, "departFlight", flight);
  }

  getDepartFlight() {
    return this.departFlight;
  }

  getJsonPropertis(i, object) {
    super.getJsonPropertis(i, object);
    object.orderType = "one";
  }
  setJsonToObjPropertis(i, object) {
    super.setJsonToObjPropertis(i, object);
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
      if (i == "child") {
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
