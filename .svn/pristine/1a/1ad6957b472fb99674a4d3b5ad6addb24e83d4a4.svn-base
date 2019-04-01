<template>
  <div id="heg-account">
    <div class="act-center">
      <head-top class="header">
        <i slot="left" class="prev iconfont icon-back"></i>
        <div slot="title" class="title sp-child">My Account</div>
      </head-top>
      <div class="content" v-show="accountPage">
        <div class="marTop"></div>
        <ul class="accout-info">
          <li class="flex space-between">
            <p>Name</p>
            <div class="li-right" @click="editInfo('name')">
              <input type="text" v-model="username" disabled name="username" placeholder="Enter your name">
              <i class="right-arrow iconfont icon-back"></i>
            </div>
          </li>
          <li class="flex space-between">
            <p>Gender</p>
            <div class="li-right" @click="editInfo('sex')">
              <input type="text" v-model="usersex" disabled name="gender" placeholder="Select your gender">
              <i class="right-arrow iconfont icon-back" ></i>
            </div>
          </li>
          <li class="flex space-between">
            <p>Birthday</p>
            <div class="li-right" @click="editInfo('birthDate')">
              <input type="text" v-model="userBirth" disabled name="birthay" placeholder="Select your birthday">
              <i class="right-arrow iconfont icon-back" ></i>
            </div>
          </li>
          <li class="flex space-between">
            <p>Mobile Number</p>
            <div class="li-right" @click="editInfo('phone')">
              <input type="text" v-model="userphone" disabled name="phone" placeholder="Enter your phone">
              <i class="right-arrow iconfont icon-back"></i>
            </div>
          </li>
          <li class="flex space-between">
            <p>E-mail</p>
            <div class="li-right" @click="editInfo('email')">
              <input type="text" v-model="userInfo.email" disabled name="email" placeholder="Link your email">
              <i class="right-arrow iconfont icon-back"></i>
            </div>
          </li>
          <li class="flex space-between">
            <p>Login Password</p>
            <div class="li-right" @click="editInfo('password')">
              <input type="text" v-model="userInfo.password" disabled name="password" placeholder="">
              <i class="right-arrow iconfont icon-back"></i>
            </div>
          </li>
        </ul>
        <div class="clickSex" v-show="clickSex">
          <mt-actionsheet
            :actions="actions"
            cancelText="Cancel"
            v-model="clickSex">
          </mt-actionsheet>
        </div>
        <div class="clickBirth" v-show="clickBirth">
          <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="datePicker.pickerValue"
            year-format="{value}"
            month-format="{value}"
            date-format="{value}"
            cancelText="Cancel"
            confirmText="Confirm"
            :visibleItemCount='datePicker.number'
            @confirm="handleConfirm"
            :startDate="datePicker.startDate"
            :endDate="datePicker.endDate">
          </mt-datetime-picker>
        </div>
      </div>
    </div>
    <user-name v-show="clickName" :userInfo="userInfo" @hiddenName="hiddenName" @changeName="changeName" ></user-name>
    <!-- <user-mobile v-show="clickPhone" :phoneCode="phoneCode" :userInfo="userInfo" @hiddenMobile="hiddenMobile" @changeMobile="changeMobile" ></user-mobile> -->
    <save-mobile v-show="clickPhone" :phoneCode="phoneCode" :userInfo="userInfo" @hiddenMobile="hiddenMobile" @hiddenVerify="hiddenVerify" ></save-mobile>
    <user-email v-show="clickEmail" :phoneCode="phoneCode" :userInfo="userInfo" @hiddenEmail="hiddenEmail" @changeEmail="changeEmail"></user-email>
    <user-pass v-show="clickPass" :userInfo="userInfo" @hiddenPas="hiddenPas"></user-pass>
  </div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import userName from "../../pages/profile/child/name.vue";
// import userMobile from "../../pages/profile/child/mobile.vue";
import saveMobile from "../../pages/profile/child/mobile-save.vue";
import userEmail from "../../pages/profile/child/email.vue";
import userPass from "../../pages/profile/child/password.vue";
import { CookieUtil } from "../../models/utils";
import { User } from "../../models/user";
import { loginUserInfo } from "../../vuex/models/user/XUser.js";
import { DomainManager } from "../../config/DomainManager.js";
import { Toast, Indicator,MessageBox } from "mint-ui";
import { Reg } from "../../models/utils/Reg";
export default {
  components: {
    headTop,
    userName,
    // userMobile,
    saveMobile,
    userEmail,
    userPass,
  },
  data(){
    return{
      userInfo:{},
      phoneCode:[],
      clickName:false,
      clickSex:false,
      clickBirth:false,
      clickPhone:false,
      clickEmail:false,
      clickPass:false,
      accountPage:true,
      actions:[
        {name:'Male',method:this.selectMale},
        {name:'Female',method:this.selectFemale},
      ],
      datePicker:{
        number:5,
        pickerValue:'1990-03-26',
        endDate:new Date(),
        startDate:new Date('1900'),
      },
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    }
  },
  computed: {
    username(){
      if(this.userInfo.firstName != undefined && this.userInfo.firstName != undefined){
        return this.userInfo.firstName +' '+ this.userInfo.lastName;
      }else{
        return null;
      }
    },
    usersex(){
      if(this.userInfo.sex == 0){
        return 'Male';
      }else if(this.userInfo.sex == 1){
        return 'Female';
      }
    },
    userphone(){
      if(this.userInfo.cellphone && this.userInfo.cellphone.indexOf(' ') > -1){
        return this.userInfo.cellphone;
      }else{
        return null;
      }
    },
    userBirth(){
      if(this.userInfo.birthDate){
        if(this.userInfo.birthDate.indexOf('-') > -1){
          let date = this.userInfo.birthDate.split('-');
          return date[0]+'-'+this.months[date[1]-1]+'-'+date[2];
        }else{
          return this.formatDate(this.userInfo.birthDate,2);
        }
      }else{
        return null;
      }
    }
  },
  methods:{
    handleConfirm(val) {
      this.userInfo.birthDate = this.formatDate(val,1);
      this.changeUserInfo({birthDate:this.userInfo.birthDate,cellphone:this.userInfo.cellphone});
    },
    formatDate(date,type) {
      const y = new Date(date).getFullYear();
      let m = new Date(date).getMonth()+1;
      m = m < 10 ? '0' + m : m;
      let d = new Date(date).getDate();
      d = d < 10 ? ('0' + d) : d;
      if(type == 1){
        return d +  '-' + m + '-' + y;
      }else if(type == 2){
        return d +  '-' + this.months[Number(m-1)] + '-' + y;
      }
    },
    editInfo(who){
      switch (who) {
        case 'name':
          this.accountPage = false;
          this.clickName = true;
          break;
        case 'sex':
          this.clickSex = true;
          break;
        case 'birthDate':
          this.clickBirth = true;
          this.$refs.picker.open();
          break;
        case 'phone':
          this.clickPhone = true;
          this.clickEmail = false;
          this.accountPage = false;
          break;
        case 'email':
          this.clickEmail = true;
          this.clickPhone = false;
          this.accountPage = false;
          break;
        case 'password':
          this.clickPass = true;
          this.accountPage = false;
          break;
        default:
          break;
      }
    },
    showUserInfo(){
      this.accountPage = true;
      this.clickName = false;
    },
    selectMale(val){
      this.userInfo.sex = 0;
      this.changeUserInfo({sex:0,cellphone:this.userInfo.cellphone});
    },
    selectFemale(val){
      this.userInfo.sex = 1;
      this.changeUserInfo({sex:1,cellphone:this.userInfo.cellphone});
    },
    changeName(data){
      let obj = {
        firstName:data.firstName,
        lastName:data.lastName,
        cellphone:this.userInfo.cellphone
      };
      this.changeUserInfo(obj);
      this.accountPage = true;
      this.clickName = false;
    },
    hiddenName(){
      this.getUser();
      this.accountPage = true;
      this.clickName = false;
    },
    hiddenMobile(){
      this.accountPage = true;
      this.clickPhone = false;
    },
    hiddenVerify(data){
      this.userInfo.cellphone = data;
      this.getUser();
      this.accountPage = true;
      this.clickPhone = false;
    },
    hiddenEmail(){
      this.clickEmail = false;
      this.accountPage = true;
    },
    changeEmail(data){
      this.getUser();
      this.clickEmail = false;
      this.accountPage = true;
    },
    hiddenPas(){
      this.clickPass = false;
      this.accountPage = true;
    },
    getUser() {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let self = this;
      let hasPhone = CookieUtil.getItem('phone');
      if (CookieUtil.hasItem("uuid")) {
        User.loadUser(self).then(user => {
          Indicator.close();
          let userId = user.userId;
          this.$set(user,"userId",userId);
          self.$nextTick(() => {
            self.userInfo = user;
            self.$store.commit(loginUserInfo, user);
          });
        }).catch(err => {
          Indicator.close();
          console.log(err);
        });
      } else {
        Indicator.close();
        console.log("error");
      }
    },
    changeUserInfo(who){
      Indicator.open({
        spinnerType:'fading-circle'
      });
      let infoString = "";
      for (let v in who) {
        if (who[v] != undefined) {
          infoString += v + "=" + who[v] + "&";
        }
      }
      User.changeUserInfo(this, infoString).then(res => {
        Indicator.close();
        if (res.success) {
          Toast({
            message: "success",
            duration: 1500
          });
          this.getUser();
        } else {
          Toast({
            message: res.msg,
            duration: 1500
          });
        }
      }).catch(err=>{
        Indicator.close();
        console.log(err);
      });
    },
  },
  created() {
    this.getUser();
    User.findSms(this).then(res => {
			res.list.forEach(item => {
				this.phoneCode = res.list;
			});
    });
  },
}
</script>
<style lang="less" >
#heg-account{
  .mint-datetime-cancel{
    color:#fff;
    background:#999;
  }
  .mint-datetime-confirm{
    color:#fff;
    background:#ffad3d;
  }
}
</style>
<style lang="less" scoped>
#heg-account{
  .sp{
    position: absolute;
    color:#fff;
    font-size:12px;
    right: 0.5rem;
    cursor: pointer;
  }
  .sp-child{margin-left:-1.5rem;}
  .content{
    height:100%;
    background:#eee;
    .marTop{padding-top:2.04rem;}
  }
  .accout-info{
    li{
      height:1.8rem;
      line-height:1.8rem;
      font-size:0.598rem;
      color:#111;
      background:#fff;
      padding:0 0.64rem;
      border-bottom:1px solid #eee;
      .li-right{
        cursor: pointer;
        font-size:12px;
        color:#999999;
        text-align: right;
        flex:1;
        i{
          display:inline-block;
          font-size:12px;
          margin-left: 0.1rem;
          transform: rotate(180deg);
        }
        input{text-align: right;}
        input::placeholder{
          color:#999;
          text-align: right;
        }
      }
    }
    li:nth-child(4){
      margin-top:0.512rem;
      padding:0 0.84rem 0 0.64rem;
    }
  }
}
</style>
