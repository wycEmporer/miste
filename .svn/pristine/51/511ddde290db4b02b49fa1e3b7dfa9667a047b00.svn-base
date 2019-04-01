
import {
  DomainManager
} from "../../config/DomainManager";
import * as types from "../../vuex/types/types.js";
import {hegTrack} from 'models/utils';

export class Coupon {
  constructor(
   value, couponCode, viaCouponDis, isUseViaCouponDis
  ) {
    // this.type = type;
    this.value = value;
    this.couponCode = couponCode;
    this.viaCouponDis = viaCouponDis;
    this.isUseViaCouponDis = isUseViaCouponDis;
    this.couponMap = {
      tradeType: 1,
      tradeAmount: Math.abs(value),
      config: {
        k1: couponCode
      }
    };
  
  }

  getDiscountPrice(vueComp, flight) {
    let flightOrder = vueComp.$store.getters.flightOrder;
    let num =
      flightOrder.adults.length +
      flightOrder.children.length +
      flightOrder.infants.length;
    let discount = 0;
    let newFlight = [];
    // v8 v9 pirce + cf limit
    if (this.lowerLimit != null && this.upperLimit != null) {
      if (
        (flightOrder.returnFlight &&
          this.lowerLimit <
          flightOrder.departFlight.price +
          flightOrder.returnFlight.price +
          this.cf.rcf * num &&
          flightOrder.departFlight.price +
          flightOrder.returnFlight.price +
          this.cf.rcf * num <
          this.upperLimit) ||
        (!flightOrder.returnFlight &&
          this.lowerLimit <
          flightOrder.departFlight.price + this.cf.ocf * num &&
          flightOrder.departFlight.price + this.cf.ocf * num < this.upperLimit)
      ) {
        flight.forEach(el => {
          let cbfp = el.bfp;
          if (this.applyTyle != 1) {
            return;
          }
          if (
            (this.airlineCode == "*" ||
              this.airlineCode.indexOf(el.airline.shortname) > -1) &&
            cbfp >= this.minOrderPrice
          ) {
            // k8 discount price limit
            if (this.limitDiscount != null) {
              if (
                flightOrder.returnFlight &&
                flightOrder.departFlight.showPrice +
                flightOrder.returnFlight.showPrice -
                flightOrder.departFlight.price -
                flightOrder.returnFlight.price >=
                this.limitDiscount
              ) {
                flightOrder.limitDiscount = this.limitDiscount;
              }
              if (
                flightOrder.departFlight.showPrice -
                flightOrder.departFlight.price >=
                this.limitDiscount
              ) {
                flightOrder.limitDiscount = this.limitDiscount;
              }
            }

            if (this.discountMethods == 1) {
              this.discountCeiling = this.discountCeiling || -1000000000;
              let couponPrice = Math.ceil(
                this.personNum == 1 ?
                cbfp * (this.rebates / 100) + this.keepMoney * num :
                cbfp * (this.rebates / 100) + this.keepMoney
              );
              let discountCeiling =
                this.personNum == 1 ?
                this.discountCeiling * num :
                this.discountCeiling;
              discount =
                Math.abs(couponPrice) > Math.abs(discountCeiling) ?
                discountCeiling :
                couponPrice;
              el.couponDiscount = Math.abs(discount);
              this.couponPrice = Math.abs(discount);
              if (flightOrder.returnFlight) {
                this.couponReturnPrice = Math.abs(discount);
              }
              this.valid = true;
            }
          }
        });
      } else {
        this.couponPrice = 0;
        this.couponReturnPrice = 0;
        this.valid = false;
      }
    } else {
      flight.forEach(el => {
        let cbfp = el.bfp;
        if (this.applyTyle != 1) {
          return;
        }
        if (
          (this.airlineCode == "*" ||
            this.airlineCode.indexOf(el.airline.shortname) > -1) &&
          cbfp >= this.minOrderPrice
        ) {
          // k8 discount price limit
          if (this.limitDiscount != null) {
            if (
              flightOrder.returnFlight &&
              flightOrder.departFlight.showPrice +
              flightOrder.returnFlight.showPrice -
              flightOrder.departFlight.price -
              flightOrder.returnFlight.price >=
              this.limitDiscount
            ) {
              flightOrder.limitDiscount = this.limitDiscount;
            }
            if (
              flightOrder.departFlight.showPrice -
              flightOrder.departFlight.price >=
              this.limitDiscount
            ) {
              flightOrder.limitDiscount = this.limitDiscount;
            }
            // vueComp.$store.commit(OrderMutaionNames.setupOrder, flightOrder);
          }

          if (this.discountMethods == 1) {
            this.discountCeiling = this.discountCeiling || -1000000000;
            let couponPrice = Math.ceil(
              this.personNum == 1 ?
              cbfp * (this.rebates / 100) + this.keepMoney * num :
              cbfp * (this.rebates / 100) + this.keepMoney
            );
            let discountCeiling =
              this.personNum == 1 ?
              this.discountCeiling * num :
              this.discountCeiling;
            discount =
              Math.abs(couponPrice) > Math.abs(discountCeiling) ?
              discountCeiling :
              couponPrice;
            el.couponDiscount = Math.abs(discount);
            this.couponPrice = Math.abs(discount);
            if (flightOrder.returnFlight) {
              this.couponReturnPrice = Math.abs(discount);
            }
            this.valid = true;
          }
        }
      });
    }
  }

  buildDiscount(vueComp) {
    let coupon = {
      [this.discountMethods]: {
        tradeType: this.discountMethods,
        tradeAmount: this.couponPrice + this.couponReturnPrice,
        config: {
          k1: this.couponCode
        }
      }
    };
    vueComp.$store.commit(types.GET_COUPON, coupon);
  }


  static buildCoupon(res) {
    return new Coupon(
      res.cf,
      res.k1,
      res.k2,
      res.k5,
      res.k7,
      res.k8,
      res.v1Int,
      res.v2Int,
      res.v3,
      res.v4,
      res.v5,
      res.v6,
      res.v7,
      res.v8,
      res.v9
    );
  }


  static getCoupon(vueComp, code, tp, isIN) {
    let map = new Map();
    map.set("k1", code.toUpperCase());
    map.set("isInternational", isIN);
    map.set("productType", tp);
    let url = DomainManager.getCouponURLString(
      DomainManager.getQueryString(map)
    );
    var device = ["mobile", "Android", "ios"];
    return new Promise((resolve, reject) => {
      vueComp.$http.get(url, {
          headers: {
            "x-Device": device[vueComp.deviceType]
          }
        })
        .then(res => {
          res.json().then(jsonObj => {
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

  static newGetCoupon(vueComp, queryString) {
    return new Promise((resolve, reject) => {
      vueComp.$axios.get(DomainManager.newGetCouponURLString(queryString), {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-Device": "Android"
          }
        })
        .then(res => {
          if(res.success){
            resolve(res);
          }else{
            reject(res);
          }
          
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static getCouponValue(vueComp, pt){
    
    return new Promise((resolve, reject) => {
      if(vueComp.couponCode == ''){
        return reject();
      }
      const flightFromRequestList = [];
      let couponCode = vueComp.couponCode;
      let productType = pt;
      let totalPrice = vueComp.fullPrice;
      let orderNumber = vueComp.flightOrder.adults.length + vueComp.flightOrder.children.length + vueComp.flightOrder.infants.length;
      let tripType =  vueComp.flightInfos.length;
      let deviceType = vueComp.deviceType == 0 ? 2 : 3; //2: msite, 3: android
      let countryType = vueComp.ifIN ? 1 : 0;
      let device = vueComp.deviceType == 0 ? 'mobile':'Android';
      vueComp.flightInfos.forEach((val, key) => {
        let flight = val.flight;
        flightFromRequestList.push({
          type: key +1,
          aircompany: flight.airline.shortname,
          flightNumber: flight.flightNumber,
          startDate: flight.dtTime,
          CabinClass: '',
          bst: flight.fee.bfp,
          gst: flight.fee.gst,
        });
      });
      let queryDate = {
        couponCode,
        totalPrice,
        orderNumber,
        tripType,
        productType,
        deviceType,
        device,
        countryType,
        flightFromRequestList
      }
      vueComp.$axios({
        method:'post',
        url:DomainManager.getCouponValue(),
        data:queryDate,
        headers: {'x-Device': device},
        // withCredentials: true
      }).then(res => {
        try{
          let trackObj = {
            apiMethodName: 'getCoupon',
            apiRequestParamter: JSON.stringify(queryDate),
            apiHttpStatus: '200',
            apiResponseStatus: res.success,
            elementId: ''
          };
          hegTrack(vueComp, trackObj);
        }catch(e){}
        if(!res.success){
          return reject(res.message);
        }

        return resolve(new Coupon(res.data.totalPrice, couponCode,  res.data.discountMost, res.data.use));
        
      }).catch(err =>{
        try{
          let trackObj = {
            apiMethodName: 'getCoupon',
            apiRequestParamter: queryDate,
            apiHttpStatus: (err.response && err.response.status) ||  '200',
            apiResponseStatus: false,
            elementId: ''
          };
          hegTrack(vueComp, trackObj);
        }catch(e){}
      })
    });
  }

}

















//   static getCoupon(vueComp, code, tp, isIN,) {
//   let map = new Map(); 
//   map.set("k1", code.toUpperCase());
//   map.set("isInternational", isIN);
//   map.set("productType", tp);
//   let url = DomainManager.getCouponURLString(
//     DomainManager.getQueryString(map)
//   );
//   var device = ["mobile", "Android", "ios"];
//   return new Promise((resolve, reject) => {
//     vueComp.$http
//       .get(url, { headers: { "x-Device": device[vueComp.deviceType] }})
//       .then(data => {
//         res
//           .json()
//           .then(jsonObj => {
//             resolve(jsonObj);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }





//   static  newGetCoupon(vueComp, queryString) {
//     return new Promise((resolve, reject) => {
//       vueComp.$axios.get(DomainManager.newGetCouponURLString(queryString), {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "x-Device": "Android"
//         }
//       }).then(res => {
//         resolve(res);
//       }).catch(err => {
//         reject(err);
//       });
//     });
//   }



// }