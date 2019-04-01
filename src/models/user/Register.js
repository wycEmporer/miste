import { DomainManager } from "../../config/DomainManager.js";
import { hegTrack } from "models/utils";

export class Register {
  constructor(email, otp, phoneNumber, password, password2, deviceNo, regCode) {
    // this.firstname = firstname;
    // this.lastname = lastname;
    this.email = email;
    this.otp = otp;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.password2 = password2;
    this.deviceNo = deviceNo;
    this.regCode = regCode;
  }

  register(vueComp) {
    // let paramMap = this.getRegisterMap();
    let paramMap = this.getRegisterParam();
    // let queryParams = this.queryString(paramMap);
    // let url = this.getRegisterUrl(queryParams);
    let url = this.getRegisterUrl();
    // return vueComp.$http.post(url, {
    //   headers: { "x-Device": "mobile" }
    // });
    var device = ["mobile", "Android", "ios"];

    return new Promise((resolve,reject) => {
       vueComp.$http
        .post(url, paramMap, {headers: { "x-Device": device[vueComp.deviceType] }})
        .then(res => {
          try{
            let trackObj = {
              apiMethodName: 'registerByPhone',
              apiRequestParamter: JSON.stringify(queryParams),
              apiHttpStatus: '200',
              apiResponseStatus: res.success,
              elementId: ''
            };
            hegTrack(vueComp, trackObj);
          }catch(e){}
          resolve(res);
        })
        .catch(err => {
          try{
            let trackObj = {
              apiMethodName: 'registerByPhone',
              apiRequestParamter: JSON.stringify(queryParams),
              apiHttpStatus: (err.response && err.response.status) ||  '200',
              apiResponseStatus: false,
              elementId: ''
            };
            hegTrack(vueComp, trackObj);
          }catch(e){}
          reject(err);
        });
    })
  }

  getRegisterMap() {
    let params = new Map();
    // let $action = "register";
    // params.set("action", $action);
    // params.set("firstName", this.firstname);
    // params.set("lastName", this.lastname);
    params.set("email", this.email);
    params.set("otp", this.otp);
    params.set("cellphone", this.phoneNumber);
    params.set("password", this.password);
    params.set("password2", this.password2);
    params.set("deviceNo", this.deviceNo);
    params.set('code', this.regCode);
    return params;
  }

  getRegisterParam() {
    let params = {};
    params = Object.assign({},this.params,{
      email:this.email,
      otp:this.otp,
      cellphone:this.phoneNumber,
      newPassword:this.password,
      // password2:this.password2,
      deviceNo:this.deviceNo,
      code:this.regCode,
    })
    return params;
  }

  queryString(paramMap) {
    return DomainManager.getQueryString(paramMap);
  }

  getRegisterUrl(queryParams) {
    return DomainManager.getRegisterUrl(queryParams);
  }

  logout() {}
}
