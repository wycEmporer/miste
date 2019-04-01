import { DomainManager } from "../../config/DomainManager";
import { TimeFormatUtil, CookieUtil, hegTrack} from "../utils";
import {Toast} from "mint-ui";
export class User {
  /**
   * 
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} emailAddress
   * @param {string} phoneNumber
   */
  constructor(
    firstName,
    lastName,
    middleName,
    email,
    cellphone,
    sex,
    address,
    birthDate,
    userId,
    userName,
    payPassword,
    phoneConfirmed
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.email = email;
    this.cellphone = cellphone;
    this.sex = sex;
    this.address = address;
    this.birthDate = birthDate;
    this.userId = userId;
    this.userName = userName;
    this.payPassword = payPassword;
    this.phoneConfirmed = phoneConfirmed;
  }

  /**
   * 
   * @param {any} vueComp
   * @param {string} username
   * @param {string} password
   * @param {boolean} ifRememberme
   */
  static login(vueComp, username, password, type,ifRememberme) {
    let params = new Map();
    params.set("userName", username);
    params.set("password", password);
    params.set("type", type);
    params.set("rememberMe", ifRememberme);


    let queryParams = DomainManager.getQueryString(params);
    let url = DomainManager.getSearchLoginURLStirngNew(queryParams);
    //{ credentials: true, headers: { "x-Device": "mobile" } }
    return vueComp.$http.get(url, {
      withCredentials: true,
      headers: { "x-Device": "mobile" }
    }).then(rsp => {
      rsp.json().then(json => {
        try{
          // debugger;
          let trackObj = {
            apiMethodName: 'login',
            apiRequestParamter: JSON.stringify(queryParams),
            apiHttpStatus: '200',
            apiResponseStatus: json.success,
            elementId: ''
          };
          hegTrack(vueComp, trackObj);
        }catch(e){}
        if(json.success){
          window.dataLayer.push({
            userId: CookieUtil.getItem('uuid')
          })
        }
      })
      return rsp;
    }).catch(err =>{
      try{
        let trackObj = {
          apiMethodName: 'login',
          apiRequestParamter: JSON.stringify(queryParams),
          apiHttpStatus: (err.response && err.response.status) ||  '200',
          apiResponseStatus: false,
          elementId: ''
        };
        hegTrack(vueComp, trackObj);
      }catch(e){}
    })

    //return vueComp.$http.get(url);
  }
  static loginPhone(vueComp, cellPhone, password, type,ifRememberme) {
    let params = new Map();
    params.set("cellphone", cellPhone);
    params.set("password", password);
    params.set("type", type);
    params.set("rememberMe", ifRememberme);


    let queryParams = DomainManager.getQueryString(params);
    let url = DomainManager.getSearchLoginURLStirngNew(queryParams);
    //{ credentials: true, headers: { "x-Device": "mobile" } }
    return vueComp.$http.get(url, {
      withCredentials: true,
      headers: { "x-Device": "mobile" }
    }).then(rsp => {
      rsp.json().then(json => {
        if(json.success){
          window.dataLayer.push({
            userId: CookieUtil.getItem('uuid')
          })
        }
      })
      return rsp;
    });

    //return vueComp.$http.get(url);
  }
  static signOut(vueComp){
    return vueComp.$axios.get(DomainManager.signOut()).then(rsp => {
      CookieUtil.removeItem('uuid');
      sessionStorage.removeItem('user');
      window.dataLayer.push({userId: ''});
      return rsp;
    })
  }

  /**
   * 
   * @param {any} vueComp
   * @param {string} facebookid
   * @param {string} email
   * @param {string} name
   */
  static loginWithFacebookInfos(
      vueComp,
      facebookid,
      email,
      firstName,
      lastName
    ) {
      let parmsMap = new Map();

      parmsMap.set("id", facebookid);
      parmsMap.set("first_name", firstName);
      parmsMap.set("last_name", lastName);
      parmsMap.set("email", email);

      let qs = DomainManager.getQueryString(parmsMap);
      let urlString = DomainManager.getLoginWithFaceBookAccountUrlString(qs);

      vueComp.$http
        .get(urlString)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }

  static getUserOrders(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.getUserOrdersUrlString(), { withCredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  static loadUser(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.getUserInfoUrlString(), { withCredentials: true })
        .then(res => {
          let {
            firstName,
            lastName,
            middleName,
            email,
            cellphone,
            sex,
            address,
            birthDate,
            userId,
            userName,
            payPassword,
            phoneConfirmed
          } = res;
          resolve(
            new User(
              firstName,
              lastName,
              middleName,
              email,
              cellphone,
              sex,
              address,
              birthDate,
              userId,
              userName,
              payPassword,
              phoneConfirmed
            )
          );
        })
        .catch(err => reject(err));
    });
  }

  static changeUserInfo(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post(DomainManager.changeUserInfo(String), {
          withCredentials: true,
          Header: {
            "Content-Type": "application/x-www-form-urlencoded"
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
  
  static getPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.getPassword(String))
        .then(res => {
          res.json().then(json => resolve(json));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static changeUserPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post(DomainManager.changeUserPassword(String), {
          withCredentials: true
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static resetPayPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.get(DomainManager.resetPayPassword(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static setPayPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.setPayPassword(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static settoPayPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.settoPayPassword(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static checkAuthen(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.checkAuthen(), { withcredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static sendAuthenOTP(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.sendAuthenOTP(), { withcredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareRegister(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareRegister(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareByEmail(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareByEmail(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareBySMS(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareBySMS(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static sendEditPhoneCode(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.sendEditPhoneCode(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static confirmEditPhoneCode(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.confirmEditPhoneCode(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareByReward(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareByReward(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareByThirdParty(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareByThirdParty(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareUrl(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareUrl(String), {
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static idcardUpload(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.idcardUpload(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static pushFeedback(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post(DomainManager.feedback(String))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getGold(vueComp) {
    // return new Promise((resolve, reject) => {
      return vueComp.$axios
        .get(DomainManager.balanceOfGold(), { withcredentials: true })
        .then(
          res => res
        )
        .catch(err => {
          Toast({
            message: 'status:'+ err.response.status + ','+err.config.url.substr(err.config.url.lastIndexOf('/')+1),
            duration:10000
          })
          console.log(err);
        });
    // });
  }

  static getRechargeConfig(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.getRechargeConfig(), { withcredentials: true })
        .then(
          res => {
            resolve(res.body);
          },
          res => {
            reject(res);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  }

  static sendRegisterOTP(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.sendRegisterOTP(String))
        .then(res => {
          res.json().then(json => {
            resolve(json);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static applyResetPass(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.applyResetPass(String))
        .then(res => {
          res.json().then(json => {
            resolve(json);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static resetPayPasswordNew(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post(DomainManager.resetPayPasswordNew(String))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getCheckWay(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.getCheckWay(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static resetPassNew(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.resetPassNew(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static setPayPasswordNew(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.setPayPasswordNew(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static refundsJson(tarvellerId, otp, reasonType) {
    return {
      flightPsrIds: tarvellerId,
      otp: otp,
      reasonType: reasonType
    };
  }

  static refundOTPJson(tarvellerId, reasonType) {
    return {
      flightPsrIds: tarvellerId,
      reasonType: reasonType
    };
  }

  // tui piao
  static refunds(vueComp, tarvellerId, otp, reasonType) {
    let json = this.refundsJson(tarvellerId, otp, reasonType);
    let jsonStr = JSON.stringify(json);
    let url = DomainManager.getRefundsUrl();
    return new Promise((resolve, reject) => {
      vueComp.$http.post(url, jsonStr).then(res => {
        res
          .json()
          .then(jsonObj => {
            resolve(jsonObj);
          })
          .catch(err => {
            reject(jsonObj);
          });
      });
    });
  }

  static refundOTP(vueComp, tarvellerId, reasonType) {
    let json = this.refundOTPJson(tarvellerId, reasonType);
    let jsonStr = JSON.stringify(json);
    let url = DomainManager.getRefundGoldBalance();
    return new Promise((resolve, reject) => {
      vueComp.$http.post(url, jsonStr).then(res => {
        res
          .json()
          .then(jsonObj => {
            resolve(jsonObj);
          })
          .catch(err => {
            reject(jsonObj);
          });
      });
    });
  }

  static getChangeSignJson(tarvellerId, flightNo, date) {
    var o = {};
    o.map = {};
    for (var i = 0; i < tarvellerId.length; i++) {
      o.map[tarvellerId[i]] = {};
      o.map[tarvellerId[i]].flightNo = flightNo;
      o.map[tarvellerId[i]].takeOffTime = date;
    }
    return JSON.stringify(o);
  }

  //change sign
  static changeSign(tarvellerId, flightNo, date, vueComp) {
    let dateStr = TimeFormatUtil.getYearMonthDateString(date);
    let jsonStr = this.getChangeSignJson(tarvellerId, flightNo, dateStr);

    let url = DomainManager.getChangeSignUrl();
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(url, jsonStr)
        .then(req => {
          req
            .json()
            .then(json => {
              if (json.success) {
                resolve(json);
              } else {
                let err = new Error("Flight information is incorrect");
                reject(err);
              }
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }
  
  static rechargeWallet(vueComp, String) {
    let device;
    if(vueComp.model == 1){
      device = "Android";
    }else if(vueComp.model == 2){
      device = "iOS";
    }else{
      device = "mobile";
    }
    return new Promise((resolve, reject) => {
      vueComp.$axios({
        url:DomainManager.rechargeWallet(String),
        method:'get',
        withCredentials: true,
        headers:{
          'x-Device': device
        }
      })
        .then(res => {
          return resolve(res);
        }).catch(err => reject(err))
    });
  }

  static searchCashBack(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.searchCashBack(), { withCredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getRefundAmount(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.getRefundAmount(String)).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static getCashConfig(vueComp) {
    return new Promise((reslove, reject) => {
      vueComp.$http
        .get(DomainManager.getCashConfig(), { withCredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              reslove(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static applyWalletCash(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http
        .post(DomainManager.applyWalletCash(String), {
          withCredentials: true
        })
        .then(res => {
          res
            .json()
            .then(json => {
              reslove(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static getRefundOTP(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.getRefundOTP(String)).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static sendWalletOTP(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.sendWalletOTP(String)).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  //get offer & ad list
  static advList(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.advList(String))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getGSOtp(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.getGSOtp(String), { withcredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => reject);
        });
    });
  }

  static getWebsiteInfo(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.getWebsiteInfo())
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static getCommTraInfo(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post(DomainManager.getCommTraInfo(), { withcredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getLetter(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post(DomainManager.getLetter(String), { withcredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static validateCode(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.validateCode(), { withcredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static findSms(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.findSms())
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static seachLetters(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.seachLetters(), { withcredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static exchangeReward(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.exchangeReward(), { withcredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static checkAvailable(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.checkAvailable(), { withcredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
