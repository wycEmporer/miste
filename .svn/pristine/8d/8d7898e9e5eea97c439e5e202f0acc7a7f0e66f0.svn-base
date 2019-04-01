import airlineJsonArr from "assets/json/airlines.json";
import { Airline } from "./Airline.js";

//india
// {
//   iconPath: "../../../../static/images/G8.png";
//   name: "GoAir";
//   shortname: "G8";
// }
//international
// {
//   c: "9W";
//   n: "Jet Airways";
// }

export class AirlineManager {
  constructor(defaultAirlines) {
    this.airlines = defaultAirlines;
    // this.airlineList = airlineList;
  }

  static loadLocalAirlines() {
    let airlines = [];
    airlineJsonArr.forEach((v, i, arr) => {
      airlines.push(new Airline(v.ab, v.al, v.iconPath));
    });
    //国际航班
    // airlineArr.forEach((v, i, arr) => {
    //   airlines.push(new Airline(v.ab, v.al, v.iconPath));
    // });
    return airlines;
  }

  static loadApiAirlines(airlineList) {
    let oArr = [];
    for (let i in airlineList) {
      oArr.push({
        name: airlineList[i].n,
        shortname: airlineList[i].c,
        iconPath: "../../../../static/images/" + airlineList[i].c + ".png"
      });
    }

    let airlines = [];
    oArr.forEach((v, i, arr) => {
      airlines.push(new Airline(v.shortname, v.name, v.iconPath));
    });
    return airlines;
  }

  getAirlineByName(name) {
    let self = this;
    for (let airline of this.airlines) {
      if (Object.is(airline.name, name)) {
        return airline;
      }
    }

    return undefined;
  }

  getAirlineByShortname(shortname) {
    let self = this;

    for (let airline of this.airlines) {
      if (Object.is(airline.shortname, shortname)) {
        return airline;
      }
    }

    return undefined;
  }
}
