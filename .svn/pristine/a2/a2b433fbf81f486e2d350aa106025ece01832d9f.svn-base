<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back"></i>
      <div slot="title" class="title">Account security</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>

    <div class="content">
      <div class="pwdWrapper">
        <div class="title flex align-items-center">
          <span>Sign in Password</span>
        </div>
        <div class="changeForm">
          <div class="formgroup" :class="{error:signinPwd.isError.cur}">
            <input type="password" v-model="signinPwd.password" placeholder="Signin Password">
          </div>
          <div class="formgroup" :class="{error:signinPwd.isError.new}">
            <input type="password" v-model="signinPwd.newPassword" placeholder="New Password">
          </div>
          <div class="formgroup" :class="{error:signinPwd.isError.con}">
            <input type="password" v-model="signinPwd.confirmPwd" placeholder="Confirm Password">
          </div>
          <div class="btnBox flex space-between">
            <p class="sp">Forgot Password?</p>
            <a href="javascript:void(0)" @click="signSub" class="signpwd">
              Submit
            </a>
          </div>
        </div>
      </div>
      <div class="pwdWrapper">
        <div class="title flex align-items-center">
          <span>Payment Password</span>
        </div>
        <div class="changeForm">
          <div class="formgroup">
            <input type="password" v-model="payPwd.payPassword" placeholder="Current Password">
          </div>
          <div class="formgroup">
            <input type="password" v-model="payPwd.newPayPassword" placeholder="New Password">
          </div>
          <div class="formgroup">
            <input type="password" v-model="payPwd.confirmPwd" placeholder="Confirm Password">
          </div>
          <div class="btnBox flex space-between align-items-center">
            <p @click="$router.push('/forgotpay')">Forgot Password</p>
            <a href="javascript:void(0)" @click="paySub" class="signpwd">
              Submit
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { User } from "models/user";
import { Toast, Indicator } from "mint-ui";
export default {
  components: {
    headTop
  },
  data() {
    return {
      signinPwd: {
        password: "",
        newPassword: "",
        confirmPwd: "",
        isError: {
          cur: false,
          new: false,
          con: false
        }
      },
      payPwd: {
        payPassword: "",
        newPayPassword: "",
        confirmPwd: "",
        isError: {
          cur: false,
          new: false,
          con: false
        }
      },
      resetPayPw: {
        email: "",
        code: "",
        payPassword: "",
        cfPassword: ""
      }
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
  methods: {
    clear(property) {
      for (v in this.property) {
        this.property[v] = "";
      }
    },
    resetPay() {
      if (this.resetPayPw.email == "") {
        Toast("error");
      }
      let str = "email=" + this.resetPayPw.email;
      User.resetPayPassword(this, str).then(res => {
        if (res.success) {
          Toast("OTP is send into your email");
        } else {
          Toast("error");
        }
      });
    },
    setPay() {
      if (this.resetPayPw.email == "") {
        Toast("please complete your Email Address");
      } else if (this.resetPayPw.code == "") {
        Toast("please complete your OTP");
      } else if (
        this.resetPayPw.payPassword == "" ||
        this.resetPayPw.cfPassword == ""
      ) {
        Toast("please complete your Password");
      } else if (this.resetPayPw.payPassword != this.resetPayPw.cfPassword) {
        Toast("the password must be the same");
      } else {
        let str = "";
        for (let v in this.resetPayPw) {
          str += v + "=" + this.resetPayPw[v] + "&";
        }
        User.setPayPassword(this, str).then(res => {
          if (res.success) {
            Toast({
              message: "success!",
              duration: 1500
            });
          } else {
            Toast({
              message: res.msg,
              duration: 1500
            });
          }
        });
      }
    },
    paySub() {
      if (this.payPwd.payPassword == "") {
        Toast("please complete your password");
      } else if (this.payPwd.newPayPassword == "") {
        Toast("please complete your  new password");
      } else if (this.payPwd.confirmPwd == "") {
        Toast("please complete your confirm password");
      } else if (this.payPwd.newPayPassword != this.payPwd.confirmPwd) {
        Toast("The password must be the same");
      } else {
        let passwordString = "";
        passwordString =
          "payPassword=" +
          encodeURIComponent(this.payPwd.payPassword) +
          "&newPayPassword=" +
          encodeURIComponent(this.payPwd.newPayPassword);
        User.setPayPassword(this, passwordString).then(function(res) {
          if (res.success) {
            Toast({
              message: "Success!",
              duration: 1500
            });
          } else {
            Toast({
              message: res.msg,
              duration: 1500
            });
          }
        });
      }
    },
    signSub() {
      if (this.verify(this.signinPwd)) {
        let passwordString = "";
        for (let v in this.signinPwd) {
          passwordString +=
            v + "=" + encodeURIComponent(this.signinPwd[v]) + "&";
        }
        User.changeUserPassword(this, passwordString)
          .then(function(res) {
            if (res.success) {
              Toast({
                message: "Success!",
                duration: 1500
              });
              this.clear("signinPwd");
            } else {
              Toast({
                message: res.msg,
                duration: 1500
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    verify(pwdUnit) {
      let flag = true;
      if (
        pwdUnit.password == "" ||
        pwdUnit.newPassword == "" ||
        pwdUnit.confirmPwd == ""
      ) {
        flag = false;
        Toast({
          message: "The password can not be empty",
          duration: 1500
        });
        return false;
      }
      if (pwdUnit.confirmPwd != pwdUnit.newPassword) {
        Toast({
          message: "The password must be the same",
          duration: 1500
        });
        return false;
      }
      if (pwdUnit.newPassword == pwdUnit.Password) {
        Toast({
          message: "error",
          duration: 1500
        });
        return false;
      }
      return flag;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~assets/less/theme.less";
.header {
  background: #0b9d78;
  .title {
    font-size: 0.768rem;
    color: #fff;
  }
  .sp {
    opacity: 0;
  }
}

div {
  box-sizing: border-box;
}

.content {
  padding-top: 2rem;
  background-color: #fff;
  overflow: auto;
}

.pwdWrapper {
  font-size: 0.64rem;
  padding-bottom: 0.64rem;
  .title {
    width: 100%;
    height: 1.7rem;

    padding: 0 0.64rem;
    margin-bottom: 0.64rem;
    font-weight: bold;
    border-top: thin solid @gray-light;
    border-bottom: thin solid @gray-light;
  }
  .changeForm {
    padding: 0 1.36rem;

    .formgroup {
      height: 1.55rem;
      border: thin solid @gray-light;
      margin-bottom: 0.64rem;
      border-radius: 3px;
      display: flex;
      align-items: center;
      &.error {
        border-color: @danger-color;
      }
    }
    input {
      display: block;
      text-align: center;
      height: 100%;
      width: 100%;
      padding: 0.3rem 0.64rem;
      box-sizing: border-box;
    }
    .btnBox {
      .sp {
        opacity: 0;
      }
      p {
        font-size: 0.512rem;
        color: #0b9d78;
      }
    }
    a.signpwd {
      display: block;
      width: 3.4rem;
      height: 1.24rem;
      background-color: @warning-color;
      color: #fff;
      border-radius: 2px;
      line-height: 1.24rem;
    }
  }
  .payForm {
    padding: 0 1.36rem;
    .formgroup {
      display: table;
      width: 100%;
      margin-bottom: 0.64rem;
      text-align: left;
      input,
      a {
        display: table-cell;
        line-height: 1.24rem;
      }
      input {
        border: thin solid @gray-light;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }
      a {
        text-align: center;
        background-color: @warning-color;
        width: 3.4rem;
        color: #fff;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      } // label {
      //   display: block;
      //   margin-bottom: 0.3rem;
      // }
      &.error {
        border-color: @danger-color;
      }
    }
    .btnBox {
      p {
        font-size: 0.512rem;
        color: #0b9d78;
      }
      a.signpwd {
        display: block;
        width: 3.4rem;
        height: 1.24rem;
        background-color: @warning-color;
        color: #fff;
        border-radius: 4px;
        line-height: 1.24rem;
      }
    }
  }
}
</style>