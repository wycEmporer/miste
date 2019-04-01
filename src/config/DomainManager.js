import { domainJson } from "./domain";
import {API_ROOT} from './common.config.js'

const DomainManager = {};
for(let i in domainJson){
  DomainManager[i] = function(queryString){
    if(queryString){
      return API_ROOT + domainJson[i] + '?' + queryString;
    }
    return API_ROOT + domainJson[i];
  }
}
DomainManager.getSearchOrderResultPageUrl = function(orderId){
  return window.location.protocol +
      "//" +
      window.location.host +
      "/search?" +
      "orderId=" +
      orderId;
}
DomainManager.getSearchOrderResultUrl = function(orderId){
    return window.location.protocol + "//" + window.location.host + "/search?";
}
DomainManager.getQueryString = function(parmsMap){
  let strBuffer = "";
    let isFirst = true;
    parmsMap.forEach((value, key, map) => {
      if (isFirst) {
        isFirst = false;
      } else {
        strBuffer += "&";
      }
      strBuffer += key + "=" + value;
    });
    return strBuffer;
}

export { DomainManager };

