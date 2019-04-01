<template>
  <div class="page-ins">
    <div class="offers">
      <div class="title flex space-between align-items-center">
        <div class="ins-title flex">
          <span class="title-icon">3</span>
          <span class="title-info">Secure Your Trip</span>
        </div>
        <div class="title-logo"><img :src='require("../../../assets/images/book/insurance_logo.png")' alt=""></div>
      </div>
      <div class="form">
        <div class="form-gro form-gro-ins">
          <div class="flex space-between align-items-center" :class="{noIns:true}">
            <div class="ins-left flex align-items-center">
              <div class="iconSty">
                <!-- <img v-show="!noInsSelected" :src="require('assets/images/book/in-plane.png')" alt=""> -->
                <!-- <img v-show="noInsSelected" :src="require('assets/images/book/baoxian-m.png')" alt=""> -->
              </div>
              <!-- <div class="fontSz12 textSty" :class="{'no-select':!insureRadio}"> -->
              <div class="fontSz12 textSty">
                <p>96% of our customers insure their trip. See all</p>
                <p>the benefits you get for just <span :class="{fir_span:data.showProductInfoList}">Rs.{{data.product.price}}</span><span v-if="data.showProductInfoList">Rs.{{data.product.disPrice}}</span><span v-if="!data.isIntl">per person</span></p>
              </div>
            </div>
            <!-- <div class="showInsureItem" @click="isShowInsureItem">
              <i class="iconfont icon-back" :class="{down: !showInsureFlag}"></i>
            </div> -->
          </div>
          <div class="insureItems flex align-items-center">
            <div class="in_left">
              <div class="item flex align-items-center ">
                <div class="item-txt"><img :src="require('assets/images/book/in_up.png')" alt=""></div>
                <div class="item-pr" v-if="propsToView.isIntl">
                  <p >Claim upto <span class="rs">Rs</span><span>750</span></p>
                  <p >Trip Cancellation</p>
                </div>
                <div class="item-pr" v-else>
                  <p >Claim upto <span class="rs">Rs</span><span>20,000</span></p>
                  <p >Trip Cancellation</p>
                </div>
              </div>
              <div class="item flex align-items-center ">
                <div class="item-txt"><img :src="require('assets/images/book/in_down.png')" alt=""></div>
                <div class="item-pr" v-if="propsToView.isIntl">
                  <p>Claim upto <span class="rs">Rs</span><span>180</span></p>
                  <p>Trip Delay</p>
                </div>
                <div class="item-pr" v-else>
                  <p>Claim upto <span class="rs">Rs</span><span>10,500</span></p>
                  <p>Trip Delay</p>
                </div>
              </div>
              <div class="last-item item flex align-items-center content-center" @click="showTerms(propsToView.termsUrl)">
                <a>
                  <div class="insureLink" link-to="">
                    <span class="span_1">+</span><span>{{propsToView.isIntl?10:8}}</span><span class="span_2"> View All benefits</span>
                    <img :src="require('assets/images/book/in_select.png')" alt="">
                  </div>
                </a>
              </div>
            </div>
            <div class="in_right flex align-items-center" @click="setInsure(3)">
              <div class="r_div" >
                <img v-if="!insureRadio" :class="{noSave:data.showProductInfoList}" :src="require('assets/images/book/in_kongkuang.png')" alt="">
                <img v-else :class="{noSave:data.showProductInfoList}" :src="require('assets/images/book/in_kuang.png')" alt="">
              </div>
              <div class="r_div2">
                <p>Secure trip <i v-if="data.showProductInfoList">,</i></p>
                <span v-if="data.showProductInfoList">save Rs.{{data.product.price - data.product.disPrice}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-gro flex space-between" style="padding:0.64rem 0.64rem 0 0.64rem;">
          <div class="fontSz12 textSty flex align-items-center">
              <span class="insureRadio" :class="{active:insureRadio}" @click="setInsure(true)"></span>
            <div>
              <p>Yes, secure my trip with insurance</p>
              <p>I agree to the <span style="display:inline" @click="showInsurance" class="colorPri">terms & conditions</span></p>
            </div>
          </div>
        </div>
        <div class="form-gro isInter" v-if="propsToView.isIntl && insureRadio">
          <div class="fontSz12 child1">
            <span style="font-size:14px;">Stay duration:</span>
            <div class="Insdays">
              <input type="number" v-model="form.interDays" v-inputE="form" placeholder="2~180days">
              <span class="Indays" v-if="form.errCode">{{form.dayOrdays}}</span>
            </div>
            <i class="rs">Rs.</i>{{propsToView.totalMoney}} <span v-show="form.errCode1">for {{form.interDays}} {{form.dayOrdays2}}</span>{{form.text}}.
          </div>
          <p class="fontSz12">Policy begins on your departure date and ends after the duration.</p>
        </div>
        <div class="form-gro">
          <div class="fontSz12 textSty flex align-items-center">
              <span class="insureRadio" :class="{active:!insureRadio}" @click="setInsure(false)"></span>
            <div>No, I do not wish to insure my trip</div>
          </div>
          <div class="form-gro insuLine fontSz12">Insurance only for Indian citizens aged between 6 months to 70 years.</div>
        </div>
        <div style="height:0.21rem;background:#ebebeb;"></div>
      </div>
    </div>
    <!-- <mt-popup v-model="showDialog" popup-transition="popup-fade" modal="true" closeOnClickModal="false" class="dialogPopup" >
      <failure id="showDialg" >
        <div slot="content" class="slot-text" >{{data.noInsuranceMsg}}</div>
        <div slot="btn" class="flex space-between" >
          <mt-button @click="closePopup2()" class="btn btn1" type="default">I will pay Rs.{{Math.abs(data.tdis)}} more</mt-button>
          <mt-button @click="submitPopup2()" class="btn btn2" type="default">I want Insurance</mt-button>
        </div>
      </failure>
    </mt-popup> -->
  </div>
</template>
<script>
import failure from "pages/failure/failure.vue";
import { Indicator,Checklist } from 'mint-ui';
export default {
  components:{
    failure,
    'mt-checklist':Checklist 
  },
  props: {
    data:{
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      showSelect1:true,
      form:{
        number: this.data.product.computeMode,
        dayOrdays:this.data.days > 1?'days':'day',
        dayOrdays2:this.data.days > 1?'days':'day',
        errCode:true,
        errCode1:this.data.days > 1?true:false,
        interDays:this.data.days,
        text:'(Per Person)',
        price:this.data.product.disPrice?this.data.product.disPrice:this.data.product.price,
        total:(this.data.product.disPrice?this.data.product.disPrice:this.data.product.price) * this.data.days,
      },
      insureRadio: true,
      showInsureFlag: false,
      showDialog:false,
      noInsSelected:false,
    };
  },
  watch:{
    form:{
      handler:function(val,oldV){
        if(this.form.interDays == "" || this.form.interDays < 2){
          if(String(this.form.interDays == 1 || this.form.interDays).split("")[0] == 0 || (String(this.form.interDays).split("")[0] == 0 && String(this.form.interDays).split("")[1] == 0)){
            this.form.interDays = 2;
            this.form.errCode1 = false;
          }
          this.form.errCode = false;
          this.form.text = "(Per Day Per Person)";
        }else if(this.form.interDays > 180){
          this.form.interDays = 180;
          this.form.errCode = false;
          this.form.text = "(Per Person)";
        }else{
          this.form.errCode1 = true;
          this.form.text = "(Per Person)";
        }
        this.$emit('transInsureChecked', {insureRadio:true,insurance:this.propsToView});
        this.$emit("changed",this.form);
      },
      deep:true
    },
  },
  mounted () {
    let tp = JSON.parse(sessionStorage.ticketType);
    if(tp == 1 && !this.data.hasInsurance){
      this.insureRadio = false;
      this.noInsSelected = true;
      this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
    }
  },
  computed:{
    propsToView(){
      let termsUrl = this.data.isIntl ? "/international-terms" + this.data.product.value
        : "/domestic-terms";
      let day,title,totalMoney;
      if(this.data.isIntl){
        day = this.form.interDays;
        title = this.data.product.computeMode == 1 ? "per person" : "per day";
        totalMoney = (this.data.product.disPrice?this.data.product.disPrice:this.data.product.price) * (this.form.interDays == "" || this.form.interDays ==0 ? 0:this.form.interDays);
        if(day < 2){
          totalMoney = this.data.product.disPrice;
        }
      }else{
        title = "";
        day = null,
        totalMoney = this.data.insurePr;
      }
      let insObj = {
        days:this.data.days,
        totalMoney:this.data.product.price * this.data.days,
      };
      sessionStorage.setItem("insuranceInfo",JSON.stringify(insObj));
      let obj = {
        termsUrl,
        title,
        day:day,
        insurePr: this.data.insurePr,
        passengers: this.data.passengers,
        perInsurePr: this.data.product.disPrice?this.data.product.disPrice:this.data.product.price,
        totalMoney: totalMoney,
        isIntl: this.data.isIntl,
        hasInsurance:this.data.hasInsurance,
        tdis:this.data.hasInsurance?this.data.tdis:0,
      };
      return obj
    },
  },
  methods:{
    // closePopup2(){
    //   this.insureRadio = false;
    //   this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
    //   this.showDialog = false;
    // },
    // submitPopup2(){
    //   this.insureRadio = true;
    //   this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
    //   this.showDialog = false;
    // },
    showTerms(type){
      this.$emit('terms',type);
    },
    showInsurance(){
      this.$emit('insuranceDetail',true);
    },
    setInsure(flag){
      this.showSelect1 = flag;
      if(flag == 3){
        this.insureRadio = !this.insureRadio;
        this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
      }else{
        if(!flag){
          // if(sessionStorage.getItem('ticketType') == 1){
          //   if(this.data.hasInsurance){
          //     this.insureRadio = false;
          //     this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
          //   }else{
          //     this.insureRadio = false;
          //     this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
          //   }
          // }else{
            this.insureRadio = false;
            this.noInsSelected = true;
            this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
          // }
        }else{
          this.insureRadio = true;
          this.noInsSelected = false;
          this.$emit('transInsureChecked', {insureRadio:this.insureRadio,insurance:this.propsToView});
        }
      }
    },
    isShowInsureItem(){
      return this.showInsureFlag = !this.showInsureFlag;
    }
  },
  directives: {
    'inputE'(el,binding,vnode){
      el.onfocus = function(){
        binding.value.interDays = '';
        binding.value.errCode1 = false;
      },
      el.onblur = function(){
        if(binding.value.interDays == '' || binding.value.interDays < 0){
          let obj = JSON.parse(sessionStorage.getItem("insuranceInfo"));
          binding.value.errCode = true;
          binding.value.interDays = obj.days;
          binding.value.text = "(Per Person)";
        }else if(binding.value.interDays < 2 && binding.value.interDays >= 0){
          binding.value.interDays = 2;
          binding.value.errCode = true;
          binding.value.text = "(Per Person)";
        }else{
          binding.value.errCode = true;
          binding.value.text = "(Per Person)";
        }
      }
    }
  }
};
</script>
<style lang="less">
  @import "~assets/less/theme.less";
  .page-ins{
    padding-top: 10px;
    background: #fff;
    // margin-bottom: 0.21rem;
    .ins-title span{
      display:inline-block !important;
    }
    .title-logo{
      width:5rem;
      img{
        width: 100%;
        height:100%;
      }
    }
    .form-gro{
      padding: 0.64rem;
      .ins-left{
        flex:1;
      }
      img{
        width:0.8rem;
        margin-left: .5068rem;
        vertical-align: middle;
      }
      .iconSty{
        // margin-right: 14px;
      }
      .textSty{
        padding:0.2rem 0;
        text-align: left;
        line-height: 16px;
      }
      .no-select{
        color:#617fa3;
      }
    }
    .form-gro-ins{
      padding-bottom:0;
      .noIns{
        .ins-left{
          color: #ff4c1c;
          flex:1;
          font-size: 0.598rem;
          text-align:left;
          font-weight: bold;
          span{
            margin-right:0.2rem;
          }
          .fir_span{
            text-decoration: line-through;
          }
        }
        img{
          width:0.8rem;
          margin-left: .5068rem;
          vertical-align: middle;
        }
        .fontSz12{
          // color:#fff;
          padding:0;
          line-height: 16px;
        }
        .showInsureItem{
          padding:0 0 0 1rem;
        }
      }
      
    }
    .insuLine{
      // border-top:1px dotted #ddd;
      // border-bottom:1px dotted #ddd;
      text-align:left;
      color:#999;
      padding:0.2rem 0.64rem 0.5rem 30px;
      line-height:0.8rem;
    }
    .isInter{
      text-align: left;
      padding: 0 0.64rem;
      p,.child1{line-height: 0.8rem;}
      .child1{padding-bottom: 0.2rem;}
      .Insdays{
        width:3.7rem;
        display:inline-block;
        letter-spacing: -0.5px;
        border-bottom:1px solid #999;
        position: relative;
        span{padding: 2px 0 3px;}
        .Indays{
          position: absolute;
          top:0;
          left:2rem;
          font-size: 18px;
          color:#ed8649;
        }
        input{
          text-indent:0.5rem;
          width:3.7rem;
          font-size: 18px;
          color:#ed8649;
          border-radius:0;
        }
        input::-webkit-input-placeholder{font-size:16px;text-indent:0;text-align: center;}
      }
    }
    .showInsureItem{
      i{
        display: block;
        color: @gray-dark;
        transform: rotateZ(90deg);
        &.down{
          transform: rotateZ(-90deg);
        }
        .show{
          transform: rotateZ(-90deg);
        }
      }
    }
    .insureItems{
      margin-top: 0.6rem;
      .in_left{height:7.4rem;border-radius:2px;}
      .in_right{
        width:5.8rem;
        height:7.4rem;
        background: #FAECEA;
        margin-left:10px;
        border-radius:4px;
        box-shadow:0px 3px 13px #999;
        background-attachment:fixed;
        background: url('~assets/images/book/san-m.png') right bottom/90% no-repeat #FFE8DD;
        .r_div{
          img{
            width:0.7rem;
            height:0.7rem;
            vertical-align: text-top;
            margin-right: 5px;
          }
          .noSave{
            margin-top:-6px;
          }
        }
        p{
          font-size:0.681rem;
          color:#ff4c1c;
          margin-bottom:5px;
        }
        span{float:left;margin-left:-11px;font-size:0.681rem;color:#ff4c1c;font-weight: bold;}
      }
      
    }
    .item{
      box-sizing: border-box;
      border: 1px solid #eee;
      font-size:10px;
      width:8.9rem;
      background: #F9FBFB;
      padding: 0.427rem 0;
      margin-bottom: 10px;
      .item-txt{
        padding:0 0.64rem 0 0.747rem;
        img{
          width:1.068rem;
          height:1.068rem;
          margin-left: 0;
        }
      }
      .item-pr{
        p{
          text-align: left;
          font-size: 0.534rem;
          color:#999;
          span{
            color:#333;
            font-weight: bold;
          }
        }
        p:last-child{
          font-size: 0.427rem;
          color:#333;
          margin-top: 8px;
        }
      }
      &:last-child{
        // border: 1px solid @primary-color;
        box-shadow: none;
      }
    }
    .last-item{
      cursor: pointer;
      margin-bottom: 0;
      .insureLink{
        font-size: 1.068rem;
        color:#333;
        .span_2{
          font-size: 0.8rem;
          padding-left: 0.3rem;
        }
        .span_1{
          font-size:0.8rem;
          padding-right: 0.2rem;
        }
      }
      img{
        width:0.5rem;
        margin-left: 0;
        vertical-align: middle;
      }
    }
    .insureRadio{
      display: inline-block;
      margin-right: 8px;
      width:14px;
      height: 14px;
      border: 1px solid #c7c7c7;
      border-radius: 13px;
      background-color: @gray-lighter;
      box-sizing: content-box;
      padding:3px;
      &.active{
        background-color: @warning-color;
        border: 1px solid @warning-color;
        background-clip: content-box;
      }
    }
    
    #showDialg{
      width: 12.5rem;
      padding-top:0;
      .head{display: none;}
      .content{
        padding:1.285rem 0.35rem 1.1rem; 
        .slot-text{
          text-align: left;
          font-size: 0.512rem;
          word-wrap:break-word;
          letter-spacing:0.2px;
        }
      }
      .sure{
        margin-top:0;
        line-height:0.6rem;
        .btn{
          width: 50%;
          background-color:#999;
          color:#fff;
          font-size: 0.512rem;
          letter-spacing: 0.2px;
          line-height:0.6rem;
        }
        .btn2{
          background-color:#FFAD3D;
        }
        .mint-button{
          border-radius:0;
        }
      }
    }
// 

  }
</style>
