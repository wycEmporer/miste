<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Forgot Passoword</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="content">
      <div class="form">
        <div class="form-group">
          <span>
            {{this.verification||'choose your verification type'}}
            <select class="select" v-model="verification">
              <option :value="userData.split(',')[0]">
                Email Address
              </option>
              <option :value="userData.split(',')[1]">Phone Number</option>
            </select>
          </span>
          <a class="btn" @click="getOtp()" href="javascript:">{{submit}}</a>

        </div>
        <div class="form-group">
          <input class="OTP" type="text" v-model="otp" placeholder="Verification Code">
          <a class="btn" @click="showPass()" href="javascript:">Confirm</a>
        </div>
        <div class="form-group" v-show="showPassword">
          <input class="pw" type="password" v-model="password" placeholder="Password">
        </div>
        <div class="form-group" v-show="showPassword">
          <input class="pwc" type="password" v-model="confirmpw" placeholder="Retype Password">
        </div>
        <div class="statement clear">
          <span class="selected" :class="{choose:isSelec}" @click="isSelec=!isSelec"></span>
          <p>By signing up,you agree to HappyEeasyGo's
            <span @click="$router.push('/agreement')">T&amp;C</span>
          </p>
        </div>
        <div class="register">
          <a class="reg" @click="validate">Confirm</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "components/head/head.vue";
import { Toast, Indicator } from "mint-ui";
import { User } from "models/user";
export default {
  components: {
    headTop
  },
  data() {
    return {
      isSelect: false,
      email: "",
      phone: "",
      otp: "",
      verification: "",
      showPassword: false,
      isSelec: true,
      userData: [],
      password: "",
      confirmpw: "",
      submit: "Submit",
      cdTime: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (to.path.indexOf("/bridge") > -1) {
      try {
        window.heg.nativeBack();
      } catch (e) {}
    }
    next();
  },
  computed: {
    getData() {}
  },
  methods: {
    validate() {
      if (!this.isSelec) {
        Toast({
          message: "Please agree to the terms",
          duration: 1000
        });
      } else {
        let type =
          this.verification.indexOf("@") >= 0 ? "email=" : "cellphone=";
        let parm =
          type +
          this.verification +
          "&otp=" +
          this.otp +
          "&password=" +
          this.password;
        User.resetPassNew(this, parm).then(res => {
          if (res.success) {
            Toast("Success");
            try {
              window.heg.showNativeToast("Success");
              window.heg.nativeBack();
            } catch (e) {}
            this.$router.push("/");
          } else {
            Toast(res.msg);
          }
        });
      }
    },
    getPassword() {
      if (!this.email) {
        return;
      }
      let str = "email=" + this.email;
      User.getPassword(this, str).then(res => {
        if (res.success) {
          Toast({
            message: "success",
            duration: 1500
          });
        } else {
          Toast({
            message: res.msg,
            duration: 1500
          });
        }
      });
    },
    getOtp() {
      if (this.verification == "") {
        Toast("Please choose your verification type");
      } else {
        if (this.submit != "Submit") {
          return false;
        }
        Indicator.open({
          spinnerType: "fading-circle"
        });

        var self = this;

        let type =
          this.verification.indexOf("@") >= 0 ? "email=" : "cellphone=";
        let parm = type + this.verification;
        var btn = document.querySelector(".btn");
        User.applyResetPass(this, parm)
          .then(res => {
            if (res.success) {
              Indicator.close();
              // if (self.submit == 'Submit') {
              //   self.submit = 60
              // }
              btn.style.backgroundColor = "#ccc";
              self.submit = res.lastSendTime;
              if (res.lastSendTime === 60) {
                Toast("send success!");
              } else {
                Toast({
                  message:
                    "Please try again " + res.lastSendTime + " seconds later",
                  duration: 2000
                });
              }
            } else {
              Indicator.close();
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        var stop = setInterval(function() {
          if (self.submit > 1) {
            self.submit--;
          } else {
            clearInterval(stop);
            btn.style.backgroundColor = "#0b9d78";
            self.submit = "Submit";
          }
        }, 1000);
      }
    },
    showPass() {
      this.showPassword = true;
    }
  },
  created() {
    this.userData = sessionStorage.findUserPw;
    console.log(this.userData);
  },
  mounted() {
    if (!sessionStorage.findUserPw) {
      Toast({
        message: "infomation expired",
        duration: 1500
      });
      this.$router.push("/forgotpassworduser");
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  .header {
    background: #0b9d78;
    i {
      padding: 0 0.64rem;
    }
    .title {
      font-size: 0.768rem;
    }
    .sp {
      opacity: 0;
    }
  }
  .content {
    padding: 0 1.28rem; // width: 100%;
    height: 100%;
    .form {
      padding-top: 2.44rem;
      .form-group {
        margin: 0.64rem 0;
        display: table;
        width: 100%;
        span {
          display: block;
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          position: relative;
          border: 1px solid #ddd;
          font-size: 0.64rem;
          text-align: left;
          padding: 0 0.64rem;
          box-sizing: border-box;
          .select {
            border-radius: 0;
            width: 100%;
            height: 2rem;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            option {
              // color: red;
              height: 2rem;
            }
          }
        }

        input {
          height: 2rem;
          display: table-cell;
          box-sizing: border-box;
          padding: 0.64rem;
          width: 100%;
          font-size: 0.64rem;
          border: 1px solid #ddd;

          border-radius: 0;
        }
        .email {
          border-right: none;
        }
        .btn {
          width: 2.3rem;
          display: table-cell;
          font-size: 0.64rem;
          color: #fff;
          background: #0b9d78;
          padding: 0.64rem;
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
          border-radius: 4px;
        }
      }
    }
  }
}
</style>