<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="ico iconfont icon-back"></i>
			<div slot="title" class="head-title">Sign Up</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="form-list">
				<div class="form-group">
					<input type="text" v-model.trim="email" placeholder="E-mail address">
					<!-- <p>! Please enter correct Email Adress</p> -->
				</div>
				<div class="form-group flex space-between align-items-center">
					<div class="select-group">
						<select name="" id="" v-model="code">
							<option :value="item.regionCode" v-for="(item, key) in phoneCode" :key="key">
								{{item.countryName + ' (+' + item.regionCode + ')'}}
							</option>
						</select>
						<span>
							{{'+' + code}}
						</span>
					</div>

					<input class="sp" type="text" v-model.trim="mobile" placeholder="Mobile Number">
					<a class="send" @click="sendOTP">{{submit}}</a>
				</div>
				<div class="form-group">
					<input type="text" v-model.trim="otp" placeholder="Verification Code">
				</div>
				<div class="form-group">
					<input type="password" v-model="password" placeholder="Password">
				</div>
        <div class="form-group">
					<input type="password" v-model="password2" placeholder="Confirm the password">
				</div>
        <div class="form-group" v-if="needCode">
					<input type="text" v-model="regCode" style="float: left;width:41%" placeholder="Registration code">
          <a href="javascript:void(0)" @click="changeImgUrl" style="display: inline-block;float:right;width: 20%">Refresh</a>
          <img :src="imgUrl" alt="" style="float: right;width: 112px;margin-top:5px;">
				</div>
				<div class="statement clear">
					<span class="selected" :class="{choose:isSelec}" @click="isSelec=!isSelec"></span>
					<p>By signing up,you agree to HappyEasyGo's
						<span @click="$router.push('/agreement')">T&amp;C</span>
					</p>
				</div>
				<div class="register">
					<a class="reg" @click="validate">Sign Up</a>
				</div>
				<div class="tips flex space-between">
          <div class="t-p1">
            <!-- <p>Invite code</p>
            <span>{{InviteCode}}</span> -->
          </div>
					<div class="t-p2" @click="$router.push('/login')">
            Have an account? 
            <span>Sign In</span>
          </div>
				</div>
			</div>
		</div>
    <!-- <div class="mark" v-if="registerSucc"></div>
    <div class="reg-dialog" v-if="registerSucc">
      <ul>
        <li class="d-li1">
          Best Price Guaranteed.
          <img :src="cancel" @click="hideDoalog" alt="">
        </li>
        <li class="d-li2">
          
        </li>
        <li class="d-li3">You got a registration reward!</li>
        <li class="d-btn" @click="redeemReward">Click to Redeem</li>
      </ul>
    </div> -->
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { Toast, Indicator } from "mint-ui";
import { Register } from "../../models/user/Register.js";
import { User } from "../../models/user/User.js";
import { CookieUtil,Reg } from "../../models/utils";

export default {
  components: {
    headTop
  },
  data() {
    return {
      needCode: false,
      imgUrl:'/heg_api/user/validateCode.do',
      isSelec: true,
      email: "",
      otp: "",
      mobile: "",
      password: "",
      password2:"",
      regCode:"",
      submit: "OTP",
      deviceNo: "",
      deviceType: 0,
      phoneCode: [],
      code: "91",
      count:0,
      flag:true,
      registerSucc:false,
      InviteCode:'XXXXXXXXX',
      cancel:require('../../assets/images/grabcashback/grab_share_icon_cancel.png'),
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("/bridge") > -1) {
      try {
        window.heg.nativeBack();
      } catch (e) {}
    }
    next();
  },
  created() {
    let json;
    // this.deviceNo = 1||json.deviceType;
    try {
      json = window.heg.getNativeSource();
      this.deviceType = 1;
      this.deviceNo = JSON.parse(json).deviceId;
    } catch (e) {}
    var _this = this;
    User.findSms(this).then(res => {
      res.list.forEach(item => {
        // _this.phoneCode.push(item.regionCode)
        _this.phoneCode = res.list;
      });
    });
  },
  methods: {
    changeImgUrl(){
      this.imgUrl = '/heg_api/user/validateCode.do' + '?rnd=' + Math.random();
    },
    sendOTP() {
      if(Reg.onlyNumber1.test(this.mobile)){
        if(this.code == '91' && String(this.mobile).length != 10){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else if( this.code == '86' && String(this.mobile).length != 11){
          Toast({
            message:"Please enter a valid mobile number",
            duration:1500
          });
          return false;
        }else {
          var self = this;
          if (this.submit != "OTP") {
            return false;
          }
          let parm = "phone=" + this.code + " " + this.mobile;
          var pl = this.mobile + "";
          var btn = document.querySelector(".send");

          if (self.mobile == "") {
            Toast("Please enter correct phone number.");
          } else if (!Reg.number.test(this.mobile)) {
            Toast("Please enter correct phone number.");
          } else {
            // if (this.submit == 'Submit') {
            // 	this.submit = 60
            // }
            User.sendRegisterOTP(self, parm).then(res => {
              // if (this.submit == 'Submit') {
              // 	this.submit = 60
              // }
              if (res.success) {
                try {
                  window.heg.send2nativeAdjust("pfogyu");
                } catch (e) {}
                if(res.code == 0){
                  Toast("success");
                  btn.style.backgroundColor = "#ccc";
                  self.submit = res.lastSendTime;
                  var stop = setInterval(function() {
                    if (self.submit > 1) {
                      self.submit--;
                    } else {
                      clearInterval(stop);
                      btn.style.backgroundColor = "#0b9d78";
                      self.submit = "OTP";
                    }
                  }, 1000);
                }else if(res.code == 1){
                  Toast("The mobile number has existed");
                }else{
                  Toast(res.msg);
                }
              } else {
                Toast(res.msg);
              }
            });
          }
        }
      }else{
        Toast({
          message:"Please enter a valid mobile number",
          duration:1500
        });
      }
      
    },
    validate() {
      if (
        this.email.trim() == "" ||
        !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g.test(
          this.email
        )
      ) {
        Toast({
          message: "Please enter correct Email Adress",
          duration: 2000
        });
      } else if (this.otp.trim() == "") {
        Toast({
          message: "Please enter correct OTP",
          duration: 2000
        });
      } else if (this.mobile.trim() == "" || !/\d/g.test(this.mobile)) {
        Toast({
          message: "Please enter correct Phone number",
          duration: 2000
        });
      } else if (this.password.length < 6) {
        Toast({
          message: "Plaese enter correct password (6 digital allowed)",
          duration: 2000
        });
      }else if (this.password != this.password2) {
        Toast({
          message: "Two input password must be consistent",
          duration: 2000
        });
      } else if (!this.isSelec) {
        Toast({
          message: "Please agree to the terms",
          duration: 2000
        });
      } else {
        Indicator.open({
          spinnerType: "fading-circle"
        });

        let moCode = this.code + " " + this.mobile;
        let register = new Register(
          this.email,
          this.otp,
          moCode,
          this.password,
          this.password2,
          this.deviceNo,
          this.regCode
        );
        register.register(this).then(res => {
          res.json().then(jsonObj => {
            if (jsonObj.success) {
              Indicator.close();
              Toast({
                message: "registration success,please verify your email",
                duration: 3000
              });
              try {
                window.heg.signUpSucc();
              } catch (e) {}
              let json;
              try {
                json = window.heg.getNativeSource();
              } catch (e) {}
              if (CookieUtil.hasItem("uuid")) {
                User.loadUser(this)
                  .then(user => {
                    this.$nextTick(() => {
                      this.user = user;
                      sessionStorage.setItem("user", JSON.stringify(user));
                    });
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
              // this.registerSucc = true;
              this.$router.push("/");
            } else {
              Indicator.close();
              if(jsonObj.needCode){
                this.count++;
                this.needCode = true;
                let that = this;
                if(this.count != 1){
                  if(this.flag){
                    this.flag = false;
                    Toast({
                      message:jsonObj.msg,
                      duration: 2000
                    });
                    setTimeout(function(){
                      that.flag = true;
                    },2000);
                  }
                }
              }else{
                Toast({
                  message:jsonObj.msg,
                  duration: 2000
                });
              }
            }
          }).catch(err => {
            Indicator.close();
            console.log(err);
          });
        }).catch(err => {
          Indicator.close();
          console.log(err);
          Toast({
            message: "network anomaly",
            duration: 2000
          });
        });
      }
    },
    redeemReward(){
      this.registerSucc = false;
      this.$router.push('/privateCoupons');
    },
    hideDoalog(){
      this.registerSucc = false;
    }
  }
};
</script>
<style lang='less' scoped>
.header {
  background: #0b9d78;
  .head-title {
    font-size: 0.768rem !important;
    line-height: 2.04rem;
    color: #fff;
  }
  .sp {
    opacity: 0;
  }
}

.container {
  padding: 0 0.68rem;
  overflow: auto;
  .form-list {
    padding-top: 2.68rem;
    .form-group {
      width: 100%;
      margin-bottom: 0.64rem;
      box-sizing: border-box;
      border-radius: 2px;
      &:after{
        content: ' ';
        clear:both;
        display: table;
      }
      .select-group {
        position: relative;
        border: 1px solid #ddd;
        box-sizing: border-box;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        width: 20%;
        height: 1.92rem;
        margin-right: 0.5rem;
        select {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 9;
          display: block;
          width: 100%;
          height: 100%;
        }
        span {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          line-height: 1.92rem;
          font-size: 0.64rem; // color: #666;
          font-weight: normal;
        }
      }
      input {
        height: 1.92rem;
        border: 1px solid #ddd;
        box-sizing: border-box;
        width: 100%;
        padding: 0.44rem;
        font-size: 0.64rem;
        -webkit-appearance: none;
        border-radius: 2px;
      }
      input::placeholder{
        color:#999;
      }
      .sp {
        width: 60%;
        border-right: none;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        padding: 0.44rem;
        box-sizing: border-box;
      }
      a {
        display: block;
        height: 1.92rem;
        width: 20%;
        line-height: 1.92rem;
        font-size: 0.64rem;
        color: #fff;
        background: #0b9d78;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
      p {
        text-align: left;
        font-size: 0.64rem;
        color: red;
        padding: 0.21rem 0.44rem;
      }
    }
    .hb {
      border: 1px solid #ddd;
    }
    .register {
      margin-top: 2rem;
      a {
        width: 100%;
        background-color: #ffad3d;
        height: 1.8rem;
        font-size: 0.768rem;
        color: #fff;
        line-height: 1.8rem;
        display: block;
        border-radius: 2px;
      }
    }
    .statement {
      text-align: left;
      .selected {
        float: left;
        width: 0.68rem;
        height: 0.68rem;
        background: url("../../assets/images/common/select-gray.png") center
          no-repeat;
        background-size: 0.68rem;
        margin-top: 0.05rem;
      }
      .choose {
        background: url("../../assets/images/common/select-green.png") center
          no-repeat;
        background-size: 0.68rem; // border-color: #f56600!important;
      }
      p {
        color: #999;
        font-size: 0.6rem;
        margin-left: 1rem;
        line-height: 0.8rem;
        span {
          color: #0db88f;
        }
      }
    }
    .tips {
      position: absolute;
      bottom: 0;
      left: 0;
      width:100%;
      font-size: 0.45rem;
      color:#999;
      div{
        width:5rem;
        padding:0.64rem 0.64rem;
      }
      .t-p1{
        text-align:left;
      }
      .t-p2{
        text-align:right;
      }
      span {
        font-size: 0.512rem;
        color: #0b9d78;
        margin-top:0.3rem;
      }
    }
  }
}
.mark{
  position: absolute;
  top: 0;
  left: 0;
}
.reg-dialog{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin:auto;
  width:12.4rem;
  height:11.3rem;
  background:#fff;
  border-radius:4px;
  z-index:19;
  .d-li1{
    position: relative;
    font-size:0.769rem;
    color:#111;
    padding:0.854rem 0 0.68rem;
    img{
      width:1rem;
      position: absolute;
      right:0.3rem;
      top: 0.2rem;
      background:#eee;
      border-radius:50%;
      cursor: pointer;
    }
  }
  .d-li2{
    height:3.8rem;
    margin:0 0.962rem 0;
    background:#cce198;
  }
  .d-li3{
    font-size: 0.598rem;
    color:#111;
    font-weight: bolder;
    padding:0.534rem 0 0.641rem;
    margin:0 0.427rem;
    border-bottom:1px solid #ddd;
  }
  .d-btn{
    color:#fff;
    font-size: 0.769rem;
    height:1.495rem;
    line-height:1.495rem;
    margin:0.85rem 0.962rem 0;
    background: #ffad3d;
    border-radius:2px;
  }
}
</style>