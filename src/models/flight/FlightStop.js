import { SerializableObject } from "../serializable/serializableObject.js";
import { AirlineManager } from "../airline/AirlineManager.js";
import { Airline } from "../airline/Airline.js";

export class FlightStop extends SerializableObject {
  
  constructor(
    flightNumber,
    arrivalAirportName,
    returnDate,
    departDate,
    departAirport,
    arrivalAirport,
    waitTime,
    departAirportName,
    airline
  ) {
    super();
    this.flightNumber = flightNumber;
    this.arrivalAirportName = arrivalAirportName;
    this.departDate = departDate;
    this.returnDate = returnDate;
    this.departAirport = departAirport;
    this.arrivalAirport = arrivalAirport;
    this.waitTime = waitTime;
    this.departAirportName = departAirportName;
    this.airline = airline;
  }
  
  static getInstanceWithJsonObject(jsonObject, airlineList) {
    return new FlightStop(
      jsonObject.fn,
      jsonObject.as,
      jsonObject.at,
      jsonObject.dt,
      jsonObject.da,
      jsonObject.aa,
      jsonObject.wdt,
      jsonObject.ds,
      new AirlineManager(
        AirlineManager.loadApiAirlines(airlineList)
      ).getAirlineByShortname(jsonObject.al)
    );
  }
  getJsonPropertis(i, object) {
    if (i == "flightNumber") {
      object.flightNumber = this.flightNumber;
    } else if (i == "arrivalAirportName") {
      object.arrivalAirportName = this.arrivalAirportName;
    } else if (i == "departDate") {
      object.departDate = this.departDate;
    } else if (i == "returnDate") {
      object.returnDate = this.returnDate;
    } else if (i == "departAirport") {
      object.departAirport = this.departAirport;
    } else if (i == "arrivalAirport") {
      object.arrivalAirport = this.arrivalAirport;
    } else if (i == "waitTime") {
      object.waitTime = this.waitTime;
    } else if (i == "departAirportName") {
      object.departAirportName = this.departAirportName;
    } else if (i == "airlineName") {
      object.airlineName = this.airlineName;
    } else if (i == "airline") {
      object.airline = this.airline.toJSON();
    }
  }
  setJsonToObjPropertis(i, object) {
    if (i == "flightNumber") {
      this.flightNumber = object.flightNumber;
    } else if (i == "arrivalAirportName") {
      this.arrivalAirportName = object.arrivalAirportName;
    } else if (i == "departDate") {
      this.departDate = object.departDate;
    } else if (i == "returnDate") {
      this.returnDate = object.returnDate;
    } else if (i == "departAirport") {
      this.departAirport = object.departAirport;
    } else if (i == "arrivalAirport") {
      this.arrivalAirport = object.arrivalAirport;
    } else if (i == "waitTime") {
      this.waitTime = object.waitTime;
    } else if (i == "departAirportName") {
      this.departAirportName = object.departAirportName;
    } else if (i == "airlineName") {
      this.airlineName = object.airlineName;
    } else if (i == "airline") {
      let airlineObj = new Airline();
      airlineObj.toObject(object.airline);
      this.airline = airlineObj;
    }
  }
}
