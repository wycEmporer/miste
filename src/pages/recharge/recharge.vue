<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Top-up</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="content" :class="{marTop: contentMargin}">
        <div class="form-group">
          <label for="">Cardholder's Name</label>
          <input type="text" v-model.trim="info.name" placeholder="Please input your cardholder's name">
        </div>
        <div class="form-group">
          <label for="">Top-up Amount(you can recharge
            <i class="rs">Rs.</i>{{limitAmount}})</label>
          <input type="number" v-model.number.trim="info.amount" @blur.prevent="getExtraCash">

        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="email" v-model.trim="info.email">
        </div>
        <div class="form-group">
          <label for="">Mobile No.</label>
          <div class="inputSMS">
            <div class="select-group">
              <select name="" id="" v-model="code">
                <option :value="item.regionCode" v-for="(item, i) in phoneCode" :key="i">
                  {{item.countryName + ' (+' + item.regionCode + ')'}}
                </option>
              </select>
              <span>
                {{'+' + code}}
              </span>
            </div>
            <input id="inputSMS" type="text" v-model.number.trim="info.phone" placeholder="Please input your phone number">
          </div>
        </div>
        <div class="tips-total">
          <p>Balance
            <i class="rs">Rs.</i>{{goldTotal}}</p>
        </div>
        <div class="tips-total">
          <p>Received Amount
            <i class="rs">Rs.</i>{{info.amount}} +
            <i class="rs">Rs.</i>{{extra}}</p>
        </div>
        <!-- <p>Top-up more than Rs.5000, you will be rewarded extra 1% Happy Gold e-cash.</p> -->
        <a class="btn" href="javascript:;" @click="addRechargeRequest()">Submit</a>
      </div>
    </div>
  </div>
</template>
<script>
import { AppBridge } from '../../models/appbridge/appbridge.js';
import headTop from "../../components/head/head.vue";
import { User } from "models/user";
import { Toast, Indicator } from "mint-ui";
import { CookieUtil } from "../../models/utils";
import { CashfreeConfig } from "config/common.config";
import { DomainManager } from '../../config/DomainManager.js';

export default {
  components: {
    headTop
  },
  data() {
    return {
      model:0,
      info: {
        name: "",
        amount: "",
        email: "",
        phone: "",
        extra:0,
      },
      showEmail: false,
      userEmail: "",
      limitAmount: 0,
      goldTotal: 0,
      phoneCode: [],
      code: "91",
      contentMargin: false
    };
  },
  computed: {
    amount() {
      return this.info.amount;
    },
    isLogin() {
      return CookieUtil.hasItem("uuid");
    },
    extra(){
      return this.info.extra;
    }
  },
  watch: {
    amount(newValue) {
      if (newValue == "") {
        return 
      }
      this.info.amount = Math.min.apply(null, [
        Number.parseInt(newValue),
        this.limitAmount
      ]);
      
    },
  },
  methods: {
    addRechargeRequest() {
      if (this.isLogin) {
        if (!this.info.name) {
          Toast({
            message: "Please input the Cardholder's Name",
            duration: 1500
          });
          return false;
        }
        if (!this.info.amount) {
          Toast({
            message: "Please input the Amount",
            duration: 1500
          });
          return false;
        }
        if (!this.info.email) {
          Toast({
            message: "Please input the Email Address",
            duration: 1500
          });
          return false;
        }
        if (!this.info.phone) {
          Toast({
            message: "Please input the Phone Number",
            duration: 1500
          });
          return false;
        }
        // let nreg = /[^a-zA-Z]+/g;
        let preg = /\d{5,}/;
        let mreg = /\d{10}/; //  匹配10位数字
        let ereg = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/;
        let areg = /^(-)?[1-9][0-9]*$/;
        if (!areg.test(this.info.amount) || this.info.amount < 0) {
          Toast({
            message: "Please enter correct Amount",
            duration: 1000
          });
          this.info.amount = 0;
          return false;
        }
        if (this.info.amount > 1000000) {
          Toast({
            message: "Every recharge amount cannot be over 1000000",
            duration: 1000
          });
          return false;
        }
        if (!ereg.test(this.info.email)) {
          Toast({
            message: "Please enter correct Email Adress",
            duration: 1000
          });
          return false;
        }
        var ml = this.info.phone + "";
        if(this.code == "91"){
          if (ml.length != 10 || !mreg.test(this.info.phone)) {
            Toast({
              message:
                "Please enter a valid mobile number ( 10 digital number allowed )",
              duration: 1500
            });
            return false;
          }
        }else{
          if (ml.length < 5 || !preg.test(this.info.phone) ) {
            Toast({
              message:
                "Please enter a phone, not less than 5 digital",
              duration: 1500
            });
            return false;
          }
        }
        let str1 = this.code + " " + this.info.phone;
        let str =
          "name=" +
          this.info.name +
          "&amount=" +
          this.info.amount +
          "&email=" +
          this.info.email +
          "&phone=" +
          str1 +
          "&";
        str += "returnUrl=https://m.happyeasygo.com/happywallet";
        User.rechargeWallet(this, str).then(res => {
          Indicator.open({
            spinnerType: "fading-circle"
          });
          if (res.success) {
            this.makePayment(res.msg);
            Indicator.close();
          } else {
            Indicator.close();
            Toast({
              message: res.msg,
              duration: 2000
            });
          }
        }).catch(err=>{
          console.log(err);
        });
      } else {
        Toast({
          message: "need Login"
        });
      }
    },
    makePayment(data, sessionStorage) {
      let paymentCallback = event => {
        var eventName = event.name;
        switch (eventName) {
          case "PAYMENT_REQUEST":
            console.log(event.message);
            break;
          default:
            console.log(event.message);
        }
      };
      // PROD
      let res = window.CashFree.init(CashfreeConfig.setConfig());
      if (res.status == "OK") {
        //sessionStorage.clear()
        window.CashFree.makePayment(data, paymentCallback);
      } else {
        //handle error
        console.log(response.message);
      }
    },
    getScript(){
      let script = document.createElement('script');
      script.async = 'async';
      script.src = 'https://www.cashfree.com/assets/cashfree.sdk.v1.1.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    getExtraCash(){
      let url = DomainManager.getRechargeAmount()+'?amount='+this.info.amount;
      this.$axios.post(url).then(res => {
        if(res.succ){
          this.info.extra = res.data.amount?res.data.amount:0;
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  async created() {
    this.contentMargin = await AppBridge.getNativeSource(this);
    let id = await AppBridge.getNativeUuid(this);
    this.model = AppBridge.device;
    if(id){
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid",id);
    }else{
      if(!CookieUtil.hasItem("uuid")){
        CookieUtil.removeItem("uuid");
      }
    }
    User.getRechargeConfig(this).then(res => {
      if (res.success) {
        this.limitAmount = res.data.maa;
      }
    });
    User.getGold(this).then(res => {
      this.goldTotal = Number(res.happyGoldBalance);
    });

    var _this = this;
    User.findSms(this).then(res => {
      res.list.forEach(item => {
        _this.phoneCode = res.list;
      });
    });
    if (this.isLogin) {
      User.loadUser(this).then(function(res) {
        if (res.email != "") {
          _this.info.email = res.email;
        }
      });
    }
    this.getScript();
  },
};
</script>
<style lang='less' scoped>
.wrapper {
  .header {
    background: #0b9d78;
    .title {
      color: #fff;
      font-size: 0.769rem;
    }
    .sp {
      opacity: 0;
    }
  }
  .container {
    .marTop {
      margin-top: 2rem;
    }
    .content {
      padding: 0.64rem;
      .form-group {
        width: 100%;
        margin-bottom: 0.64rem;
        text-align: left;
        label {
          display: block;
          font-size: 0.64rem;
          margin-bottom: 0.3rem;
        }
        input {
          border: 1px solid #ddd;
          box-sizing: border-box;
          display: block;
          width: 100%;
          padding: 0.32rem 0.64rem;
          font-size: 0.64rem;
        }
        .inputSMS {
          display: flex;
          justify-content: space-between;
          #inputSMS {
            width: 75%;
          }
          .select-group {
            border: 1px solid #ddd;
            border-radius: 4px;
            position: relative;
            width: 20%;
            select {
              width: 100%;
              padding: 0.32rem 0.64rem;
              opacity: 0;
              position: absolute;
              z-index: 5;
            }
            span {
              position: absolute;
              top: 0.5rem;
              left: 0.64rem;
              z-index: 4;
            }
          }
        }
        span {
          font-size: 0.64rem;
        }
      }
      p {
        font-size: 0.512rem;
        text-align: left;
        margin-bottom: 0.64rem;
      }
      .btn {
        display: block;
        width: 100%;
        color: #fff;
        background: #ffad3d;
        font-size: 0.64rem;
        line-height: 1.5rem;
      }
    }
  }
}
</style>