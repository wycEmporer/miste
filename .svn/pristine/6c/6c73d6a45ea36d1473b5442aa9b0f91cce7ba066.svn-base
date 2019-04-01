import { DomainManager } from "../../config/DomainManager";
import { FlightOrder } from "../../models/flightorder";
import * as types from "../../vuex/types/types.js";
import * as XFlight from "../../vuex/models/flight/XFlight.js";

export class Coupon {
  constructor(
    couponCode,
    airlineCode,
    discountMethods,
    discountCeiling,
    rebates,
    keepMoney,
    applyTyle,
    personNum,
    minOrderPrice,
    couponPrice
  ) {
    this.couponCode = couponCode;
    this.airlineCode = airlineCode;
    this.discountMethods = discountMethods;
    this.discountCeiling = discountCeiling;
    this.rebates = rebates;
    this.keepMoney = keepMoney;
    this.applyTyle = applyTyle;
    this.personNum = personNum;
    this.minOrderPrice = minOrderPrice;
    this.couponPrice = 0;
  }

  getDiscountPrice(vueComp, flight) {
    let flightOrder = vueComp.$store.getters.flightOrder;
    let num = flightOrder.adults.length + flightOrder.children.length + flightOrder.infants.length;
    let discount = 0;
    let newFlight = [];
    flight.forEach(el => {
      let cbfp = el.bfp;
      if (this.applyTyle != 1) {
        return;
      }
      if (
        (this.airlineCode == "*" || this.airlineCode.indexOf(el.airline.shortname) > -1) && cbfp >= this.minOrderPrice
      ) {

        if (this.discountMethods == 1) {
          this.discountCeiling = this.discountCeiling || -1000000000;
          let couponPrice = Math.ceil(
            this.personNum == 1 ? cbfp * (this.rebates / 100) + this.keepMoney * num : cbfp * (this.rebates / 100) + this.keepMoney
          );
          let discountCeiling = this.personNum == 1 ? this.discountCeiling * num : this.discountCeiling;
          discount = Math.abs(couponPrice) > Math.abs(discountCeiling) ? discountCeiling : couponPrice;
          el.couponDiscount = Math.abs(discount);
          this.couponPrice = Math.abs(discount);
        }
      }
    });
  }

  buildDiscount(vueComp) {
    let coupon = {
      [this.discountMethods]: {
        trade_type: this.discountMethods,
        trade_amount: this.couponPrice,
        config: {
          k1: this.couponCode
        }
      }
    };
    vueComp.$store.commit(types.GET_COUPON, coupon);
  }


  static buildCoupon(res) {
    return new Coupon(
      res.k1,
      res.k2,
      res.k5,
      res.k7,
      res.v1Int,
      res.v2Int,
      res.v3,
      res.v4,
      res.v6
    );
  }


  static getCoupon(vueComp, code, tp, isIN) {
    let map = new Map();
    const newLocal = Coupon.newMethod(map, code);
    map.set("isInternational", tp);
    map.set("productType", isIN);
    let url = DomainManager.getCouponURLString(
      DomainManager.getQueryString(map)
    );
    return new Promise((resolve, reject) => {
      vueComp.$http.get(url, {
        headers: { "x-Device": "mobile" }
      })
        .then(res => {
          res
            .json()
            .then(jsonObj => {
              resolve(jsonObj);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }



  static newMethod(map, code) {
    return map.set("k1", code.toUpperCase());
  }

  static newGetCoupon(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.newGetCouponURLString(), {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-Device": "Android"
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}








