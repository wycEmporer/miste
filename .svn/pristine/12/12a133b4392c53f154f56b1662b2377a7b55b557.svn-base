<template>
	<div class="wrapper">
		<router-view></router-view>
	</div>
</template>
<script>
import { Toast } from "mint-ui";
import {
  OnewayOrder,
  RoundTripOrder
} from "../../models/flightorder";
import {
  Passenger,
  Adult,
  Child,
  Infant,
  PassengerManager,
  ContactInfo
} from "../../models/passenger";
import * as OrderMutaionNames from "../../vuex/models/flightorder/MutationName.js";

import {
  CabinClassUtil,
  AirportSearcher,
  CookieUtil,
  SHA2Util,
  GetFlightOrderUtil
} from "../../models/utils";
import { Airport } from "../../models/airport";
import {
  CabinClass
} from "../../models/cabinclass";
import { Silver, Gold } from "../../models/discount";
import { DomainManager } from "../../config/DomainManager.js";
import { User } from "models/user";
import * as types from "../../vuex/types/types.js";

function loadLocalStoragedAirorts() {
  let res = [];
  for (let a of localAirportJson) {
    res.push(Airport.getInstanceFromJson(a));
  }
  return res;
}

function getAirpotByAitaCode(code) {
  let des;
  for (let a of _airports) {
    if (a.iataCode == code) {
      des = a;
      break;
    }
  }
  return des;
}
// let _airports = loadLocalStoragedAirorts();
// let _airportSearcher = new AirportSearcher(_airports);

export default {
  data() {
    return {
      limit: {
        minYear: new Date().getFullYear(),
        minMonth: new Date().getMonth() + 1,
        minDay: new Date().getDate(),
        maxYear: new Date().getFullYear() + 1
      },
      departDate: "",
      returnDate: "",
      departAirport: null,
      destinationAirport: null,
      perssengers: {
        adults: [new Adult()],
        children: [],
        infants: []
      },
      passengersNum: {
        adults: 1,
        children: 0,
        infants: 0
      },
      passengersNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      defaultCabinClass: this.GetQueryString("cabinClass"),
      arriveAirport: null,
      departCityName: "Delhi",
      departIataCode: "DEL",
      arriveCityName: "Mumbai",
      arriveIataCode: "BOM"
    };
  },

  computed: {
    mSelectedCabinClass() {
      return CabinClassUtil.getClassObj(this.defaultCabinClass);
    }
  },
  methods: {
    getPassengers() {
      this.perssengers.adults = [];
      this.perssengers.children = [];
      this.perssengers.infants = [];

      for (let i = 0; i < this.passengersNum.adults; i++) {
        this.perssengers.adults.push(new Adult());
      }
      for (let i = 0; i < this.passengersNum.children; i++) {
        this.perssengers.children.push(new Child());
      }
      for (let i = 0; i < this.passengersNum.infants; i++) {
        this.perssengers.infants.push(new Infant());
      }
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
      // debugger;
    },
    getGoldAndSilver() {
      let self = this;
      Promise.all([
        Silver.getSilverPrice(this),
        Silver.getGoldAndSilver(this)
      ]).then(
        res => {
          let appSilver = {
            happySilverBalance: res[0].balance,
            happyGoldAndSilver: res[1]
          };
          self.$store.commit(types.GET_SILVER, appSilver);

          sessionStorage.setItem("silver", JSON.stringify(appSilver));
          console.log(appSilver);
        },
        err => {
          console.log(err);
        }
      );
    },
    goWallet() {
      let self = this;
      Promise.all([
        Silver.getSilverPrice(this),
        Gold.getGoldPrice(this),
        Silver.getSilverRunningNew(this),
        Gold.getGoldRunningNew(this),
        User.searchCashBack(this)
      ]).then(
        res => {
          let silverState = {
            happySilverBalance: res[0].balance,
            happySilverRunning: res[2]
          };
          let goldState = {
            happyGoldBalance: res[1].happyGoldBalance,
            happyGoldRunning: res[3],
            happyGoldRechargeBalance: res[1].happyRechargeBalance
          };
          let cashbackState = {
            total: res[4].data.amount,
            list: res[4].data.record
          };
          self.$store.commit(types.GET_SILVER, silverState);
          self.$store.commit(types.GET_GOLD, goldState);
          sessionStorage.setItem("silver", JSON.stringify(silverState));
          sessionStorage.setItem("gold", JSON.stringify(goldState));
          sessionStorage.setItem("cashback", JSON.stringify(cashbackState));
        },
        err => {
          console.log(err);
        }
      );
    },
    judge(airportInstent) {
      let which = this.GetQueryString("which");
      if (which == "0") {
        this.bridgeSession(airportInstent);
        this.saveSearchInfo();
      } else if (which == "1") {
        this.$router.push("/trip");
      } else if (which == "2") {
        this.$router.push("/happywallet");
        // setTimeout(function() {
        // 	window.location.reload();
        // }, 300);
      } else if (which == "3") {
        this.$router.push("/profile");
      } else if (which == "4") {
        this.$router.push("/security");
      }
    },
    bridgeSession(airportInstent) {
      let reindexPath = "";
      let Or = {
        from: this.GetQueryString("from"),
        to: this.GetQueryString("to"),
        adults: this.GetQueryString("adults"),
        childs: this.GetQueryString("childs"),
        baby: this.GetQueryString("baby"),
        cabinClass: this.GetQueryString("cabinClass"),
        airline: this.GetQueryString("airline"),
        carrier: this.GetQueryString("carrier"),
        tripType: this.GetQueryString("tripType"),
        departDate: this.GetQueryString("departDate"),
        returnDate: this.GetQueryString("returnDate"),
        orderType: this.GetQueryString("orderType")
      };

      // if (this.GetQueryString("tripType") == "0") {
      //   this.$router.push("/oneway");
      // } else {
      //   this.$router.push("/roundtrip");
      // }
      let departAirport = airportInstent.getSuitableAirports1(Or.from);
      let arriveAirport = airportInstent.getSuitableAirports1(Or.to);

      if (Or.tripType == "0") {
        reindexPath = 'oneway';
        var order = new OnewayOrder();
      } else {
        var order = new RoundTripOrder();
        if(departAirport.countryName == "India" && arriveAirport.countryName == "India"){
          sessionStorage.setItem('isIN', false);
          reindexPath = 'roundtrip';
        }else{
          sessionStorage.setItem('isIN', true);
          reindexPath = 'international';
        }
      }
      this.passengersNum.adults = this.GetQueryString("adults");
      this.passengersNum.children = this.GetQueryString("childs");
      this.passengersNum.infants = this.GetQueryString("baby");
      this.getPassengers();
      this.departAirport = order.departAirport = departAirport;
      this.destinationAirport = order.destinationAirport = arriveAirport;
      order.departDate = this.GetQueryString("departDate");
      order.returnDate = this.GetQueryString("returnDate");
      order.adults = this.perssengers.adults;
      order.children = this.perssengers.children;
      order.infants = this.perssengers.infants;
      order.orderType = this.GetQueryString("orderType");
      order.cabinClass = this.mSelectedCabinClass;
      order.contactInfo = new ContactInfo();

      let todayObj = new Date();
      var flight_startdate =
        todayObj.getFullYear() +
        "-" +
        (todayObj.getMonth() + 1) +
        "-" +
        todayObj.getDate();
      order.departDate = order.departDate || flight_startdate;
      if (this.GetQueryString("returnDate")) {
        var flight_enddate =
          todayObj.getFullYear() +
          "-" +
          (todayObj.getMonth() + 1) +
          "-" +
          todayObj.getDate();
      } else {
        var flight_enddate = null;
      }
      var os = JSON.stringify(order);
      sessionStorage.setItem("order", os);
      
      this.$router.push(reindexPath);
      // var oder = this.$store.getters.flightOrder;
      // this.$store.commit(OrderMutaionNames.setupOrder, order);
      //单程参数
      //http://app.happyeasygo.com:8080/bridge?from=DEl&to=BOM&adults=1&childs=1&baby=1&cabinClass=Economy&tripType=0&departDate=2018-01-07&which=0
      //返程参数
      //http://app.happyeasygo.com:8080/bridge?from=DEl&to=BOM&adults=1&childs=1&baby=1&cabinClass=Economy&tripType=1&departDate=2017-12-27&returnDate=2017-12-28&orderType=one
    },
    saveSearchInfo() {
      let sInfo = {
        departAirport: this.departAirport,
        arriveAirport: this.destinationAirport,
        departDate: this.GetQueryString("departDate"),
        returnDate: this.GetQueryString("returnDate"),
        passengersNum: {
          adults: this.GetQueryString("adults"),
          children: this.GetQueryString("children"),
          infants: this.GetQueryString("infants")
        },
        defaultCabinClass: this.defaultCabinClass
      };
      let searchInfo = JSON.stringify(sInfo);
      sessionStorage.setItem("searchInfo", searchInfo);
    },
    
  },
  created() {
    try {
      let uuid = window.heg.getNativeUuid();
      if (uuid != null && uuid != "") {
        CookieUtil.removeItem("uuid");
        CookieUtil.setItem("uuid", uuid);
        this.getGoldAndSilver();
      }
      this.goWallet();
    } catch (e) {}

    AirportSearcher.getAirports(this).then(airportInstent => {
      this.judge(airportInstent);
    });
  },
  mounted() {}
};
</script>
