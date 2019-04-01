import {emitCustomEvent} from 'models/utils/adGAEvent';
import {DomainManager} from '../../config/DomainManager';
export const AppBridge = {
  id:"",
  device:0,
  userid:"",
  userinfo:{},
  getNativeSource(vueCom){
    return new Promise((resolve, reject) =>{
      try {
        if(window.heg.getNativeSource){
          let data = typeof window.heg.getNativeSource() === "string"
            ? JSON.parse(window.heg.getNativeSource())
            : window.heg.getNativeSource();
          this.device = data.deviceType;
          resolve(false);
        }
      } catch (e) {
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('getNativeSource',null,(data)=>{
            this.device = data.deviceType;
            resolve(false);
          });
        }else{
          this.device = 0;
          resolve(true);
        }
      }
    })
  },
  getNativeUserName(vueCom){
    return new Promise((resolve, reject) =>{
      try {
        if(window.heg.getNativeUserName){
          let data = typeof window.heg.getNativeUserName() === "string"
            ? JSON.parse(window.heg.getNativeUserName())
            : window.heg.getNativeUserName();
          this.userinfo = data;
          resolve(this.userinfo);
        }
      } catch (e) {
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('getNativeUserName',null,(data)=>{
            this.userinfo = data;
            resolve(this.userinfo);
          });
        }else{
          this.device = {};
          resolve(true);
        }
      }
    })
  },
  getNativeUuid(vueCom){
    return new Promise((resolve,reject)=>{
      try {
        this.id = window.heg.getNativeUuid();
        resolve(this.id);
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('getNativeUuid',null,(data)=>{
            this.id = data;
            resolve(this.id);
          });
        }else{
          this.id = "";
          resolve(this.id);
        }
      }
    })
  },
  getNativeUserid(vueCom){
    return new Promise((resolve,reject)=>{
      try{
        this.userid = window.heg.getNativeUserid();
        resolve(this.userid);
      } catch(err){
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('getNativeUserid',null,(data)=>{
            this.userid = data;
            resolve(this.userid);
          });
        }else{
          this.userid = "";
          resolve(this.userid);
        }
      }
      
    })
  },
  goHomePage(vueCom){
    try {
      window.heg.goHomePage();
    } catch (error) {
      if(window.WebViewJavascriptBridge){
        vueCom.$bridge.callhandler('goHomePage',null,(data)=>{
        });
      }else{
        vueCom.$router.push('/');
      }
    }
  },
  goHotelPage(vueCom){
    try {
      if(window.heg.goHotelPage){
        window.heg.goHotelPage();
      }else{
        window.heg.goHomePage();
      }
    } catch (error) {
      if(window.WebViewJavascriptBridge){
        if(vueCom.$bridge.WebViewBridge.indexOf('goHotelPage') > -1){
          vueCom.$bridge.callhandler('goHotelPage',null,(data)=>{});
        }else{
          vueCom.$bridge.callhandler('goHomePage',null,(data)=>{});
        }
      }else{
        window.location.href="https://m-hotel.happyeasygo.com";
      }
    }
  },
  goShakePage(vueCom){
    try {
      if(window.heg.goShakePage){
        window.heg.goShakePage();
        window.heg.trackEvent("AC_Autmn_Go_to_Shake");
      }else {
        return true;
      }
    } catch (error) {
      if(window.WebViewJavascriptBridge){
        vueCom.$bridge.callhandler('goShakePage',null,(data)=>{
          vueCom.$bridge.callhandler("trackEvent","AC_Autmn_Go_to_Shake");
        });
      }else{
        vueCom.$router.push('/shake');
        emitCustomEvent('goForDetail', 'AutumnSale')
      }
    }
  },
  shareToApps(who,vueCom){
    let text = vueCom.sharesApp[who].text;
    switch (who) {
      case 0:
        try {
          if(window.heg.goSMSPage){
            let str = JSON.stringify({SMS:text});
            window.heg.trackEvent("AC_Autmn_Invite_SMS");
            try {
              window.heg.goSMSPage();
            } catch (error) {
              window.heg.goSMSPage(str);
            }
          }else {
            return true;
          }
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            vueCom.$bridge.callhandler('goSMSPage',{SMS:text},(data)=>{
              vueCom.$bridge.callhandler("trackEvent","AC_Autmn_Invite_SMS");
            });
          }
        }
        break;
      case 1:
        try {
          if(window.heg.goWhatsAppPage){
            let str = JSON.stringify({WhatsApp:text});
            window.heg.trackEvent("AC_Autmn_Invite_WhatsApp");
            try {
              window.heg.goWhatsAppPage();
            } catch (error) {
              window.heg.goWhatsAppPage(str);
            }
          }else{
            return true;
          }
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            vueCom.$bridge.callhandler('goWhatsAppPage',{WhatsApp:text},(data)=>{ 
              this.flag = 2;
              vueCom.$bridge.callhandler("trackEvent","AC_Autmn_Invite_WhatsApp")
            });
          }
        }
        break;
      case 2:
        try {
          if(window.heg.goMessengerPage){
            let str = JSON.stringify({Messenger:text});
            window.heg.trackEvent("AC_Autmn_Invite_Messenger");
            try {
              window.heg.goMessengerPage();
            } catch (error) {
              window.heg.goMessengerPage(str);
            }
          }else{
            return true;
          }
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            vueCom.$bridge.callhandler('goMessengerPage',{Messenger:text},(data)=>{
              vueCom.$bridge.callhandler("trackEvent","AC_Autmn_Invite_WhatsApp")
            });
          }
          
        }
        break;
      case 3:
        try { 
          if(window.heg.goMorePage){
            let str = JSON.stringify({More:text});
            window.heg.trackEvent("AC_Autmn_Invite_More");
            try {
              window.heg.goMorePage();
            } catch (error) {
              window.heg.goMorePage(str);
            }
          }else{
            return true;
          }
        } catch (error) {
          if(window.WebViewJavascriptBridge){
            vueCom.$bridge.callhandler('goMorePage',{More:text},(data)=>{
              vueCom.$bridge.callhandler("trackEvent","AC_Autmn_Invite_WhatsApp")
            });
          }
        }
        break;
      default:
        break;
    }
  },
  showShareView(who,vueCom){
    try {
      if(window.heg.showShareView){
        window.heg.showShareView(JSON.stringify(who));
      }
    } catch (error) {
      if(window.WebViewJavascriptBridge){
        vueCom.$bridge.callhandler('showShareView',who);
      }
    }
  },
  /**
   * 给 相对路径， 由app 生成绝对路径，并跳转新的webview；
   */
  jumpNewWebView(vueCom, url){
    if(window.heg && window.heg.jumpNewWebView){
      window.heg.jumpNewWebView(url);
    }else if(window.WebViewJavascriptBridge){
      vueCom.$bridge.callhandler('jumpNewWebView',url,(data)=>{
      });
    }else {
      vueCom.$router.push(url);
    }
  },
  nativeSignIn(who,vueCom){
    try {
      window.heg.nativeSignIn();
    } catch (error) {
      if(who == "in"){
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('nativeSignIn',null,(data)=>{
            
          });
        }else{
          emitCustomEvent('SignIn', 'AutumnSale');
          vueCom.$router.push('/login')
        }
      }else if(who == "up"){
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('nativeSignIn',null,(data)=>{
          });
        }else{
          emitCustomEvent('SignUp', 'AutumnSale');
          vueCom.$router.push('/register');
        }
      }
    }
  },
  nativeMyCoupons(vueCom){
    try {
      window.heg.nativeMyCoupons();
    } catch (error) {
      if(window.WebViewJavascriptBridge){
        vueCom.$bridge.callhandler('nativeMyCoupons',null,(data)=>{
          
        });
      }else{
        vueCom.$router.push('/privateCoupons');
      }
    }
  },
  goWalletPage(vueCom){
    try {
      window.heg.goWalletPage();
    } catch (error) {
      if(window.WebViewJavascriptBridge){
        vueCom.$bridge.callhandler('goWalletPage');
      }else{
        vueCom.$router.push('/happywallet');
      }
    }
  },
  getRechargeConfig(vueCom,userid){ // top-up page need
    return new Promise((resolve,reject)=>{
      let url = DomainManager.getRechargeConfig()+'?userId='+userid;
      vueCom.$axios.get(url).then(res=>{
        if (res.success) {
          resolve(res.data.maa);
        }
      }).catch(err=>{
        reject(err)
      });
    })
  },
  getGold(vueCom,userid){// top-up page need
    return new Promise((resolve,reject)=>{
      let url = DomainManager.balanceOfGold()+'?userId='+userid;
      vueCom.$axios.get(url).then(res=>{
        resolve(Number(res.happyGoldBalance));
      }).catch(err=>{
        reject(err)
      });
    })
  },
  getUserInfo(vueCom,userid){// user information
    return new Promise((resolve,reject)=>{
      let url = DomainManager.getUserInfoUrlString()+'?userId='+userid;
      vueCom.$axios.get(url).then(res=>{
        this.userinfo = res;
        resolve(res);
      }).catch(err=>{
        reject(err)
      });
    })
  },
  getAppVersionInfo(vueCom){// get app version
    return new Promise((resolve, reject) =>{
      try {
        if(window.heg.getVersionInfo){
          let data = typeof window.heg.getVersionInfo() === "string"?
          JSON.parse(window.heg.getVersionInfo()) : window.heg.getVersionInfo()
          resolve(data);
        }
      } catch (error) {
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('getVersionInfo',null,(data)=>{
            resolve(data);
          });
        }
      }
    })
  },
}