import defaultCity from "../../pages/home/child/defaultcity.json";
import { Airport } from "../../models/airport";
import { DomainManager } from "../../config/DomainManager.js";

function loadLocalStoragedAirorts() {
  let res = [];
  for (let a of defaultCity) {
    res.push(Airport.getInstanceFromJson(a));
  }
  return res;
}

export class AirportSearcher {
  constructor(airports) {
    this.airports = airports;
    this.defaultCity = defaultCity;
  }
  static getAirports(vueComp) {
    const airports = JSON.parse(sessionStorage.getItem('airports1'));
    return new Promise((resolve, reject) => {
      if (airports && airports != undefined && airports.length != 0) {
        resolve(new AirportSearcher(airports));
      } else {
        vueComp.$http.get(DomainManager.searchAirPortCity()).then(res => {
          res
            .json()
            .then(json => {
              sessionStorage.setItem('airports1', JSON.stringify(json.data))
              resolve(new AirportSearcher(json.data));
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    })
  }

  getSuitableAirports1(iata) {
    const airportArr = this.airports.filter(val => {
     return val.iata == iata.toUpperCase();
    });
    return Airport.getInstanceFromJson(airportArr[0]);
    // if (keywords == "") {
    //   return this.defaultCity;
    // } else {
    //   let reg = new RegExp(keywords, "ig");
    //   let res = [];
    //   for (let airport of this.airports) {
    //     if (airport.iata.match(reg)) {
    //       res.unshift(airport);
    //     }
    //   }
    //   return [Airport.getInstanceFromJson(res[0])];
    // }
  }
  getSuitableAirports(keywords) {
    if (keywords.length < 2) {
      return this.defaultCity;
    } else {
      let reg = new RegExp(keywords, "ig");
      let res = [];
      for (let airport of this.airports) {
        if (airport.iata.match(reg)) {
          res.unshift(airport);
        } else if (airport.airport.match(reg) || airport.city.match(reg)) {
          res.push(airport);
        }
      }
      return res;
    }
  }
}
