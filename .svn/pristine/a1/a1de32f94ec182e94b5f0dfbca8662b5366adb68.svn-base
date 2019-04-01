<template>
  <div id="sendOTP">
    <head-top class="head" :operate="showCancle">
			<i slot="left" class="iconfont icon-back"></i>
			<div slot="title" class="title">
				Verify OTP
			</div>
			<i class="sp iconfont icon-back" slot="right"></i>
		</head-top>
    <div class="content0">
			<div class="otp-option" >
				<div class="content">
					<div class="top">Are you sure to procced?</div>
					<div class="text">
						<p v-for="(v, key) in params.tripObj" :key="key">Your booking with trip id {{key}} will be cancelled and the Gross Refundable Amount is RS.{{v}} per passenger per sector.</p>
						<p class="last-p"><span class="spanLeft">*</span>In case of flown tickets, no refund will be applicable.<span class="spanRight">*</span></p>
					</div>
					<div class="otp">
						<div class="msg">
							<span>{{orders[orderIndex].contactMob}}
							</span>
							<a class="send" @click="getOTP">{{submit}}</a>
						</div>
						<div class="form-group">
							<input type="text" placeholder="OTP verification code" v-model="otp">
						</div>
					</div>
					<a class="btn" @click="applyCancel">Confirm</a>
				</div>
			</div>
      
    </div>
  </div>
</template>
<script>
import headTop from '../../../components/head/head.vue';
import { DomainManager } from '../../../config/DomainManager';
import { Popup, Toast, Indicator } from 'mint-ui';
import { User } from '../../../models/user';

export default {
  components: {
		headTop
  },
  props:{
    params: Object,
    stampCopyUrl: String,
  },
  data(){
    return{
      submit: 'Send OTP',
      otp: '',
      tripId:'21213245468',
      RS:'857',
      orders:[],
    }
  },
  methods:{
    showCancle(){
      this.$emit('onlisten')
    },
    applyCancel(){
      this.cancellation(this.stampCopyUrl);
    },
    cancellation(stampCopyUrl) {
      let params = {
        travellers: this.params.passengers.map(v => ({pId: v})),
        reasonType: this.params.reasonType,
        otp: this.otp,
      }

      if(stampCopyUrl){
        params.stampCopyUrl = stampCopyUrl;
      }

			if (this.otp.length == 0) {
				Toast('Please enter the OTP Code');
				return false;
			}
      Indicator.open({ spinnerType: 'fading-circle' });
      this.$axios({
        url: '/heg_api/refund/applyForRefundTogether.do',
        method: 'post',
        data:JSON.stringify(params),
        headers:{
          'Content-Type': 'application/json',
          'x-Device': 'mobile'
        }
      }).then(res => {
        if(res.succ){
          Indicator.close();
          Toast({
            message:'Success',
            duration: 1000
          });
          this.$router.push("/trip");
        }else{
          Indicator.close();
          Toast({
            message: res.msg,
            duration: 1000
          });
        }
      })
		},
    getOTP() {
			var self = this;
			if (self.submit != 'Send OTP') {
				// console.log(self.submit)
			}
			let parm = 'tripId=' + self.orders[this.orderIndex].id;
			var btn = document.querySelector('.send');
			btn.style.backgroundColor = '#ccc';
			if (self.submit == 'Send OTP') {
				self.submit = 60
			}
			User.getRefundOTP(self, parm).then(res => {
				self.submit = res.lastSendTime;
			})
			var stop = setInterval(function() {
				if (self.submit > 1) {
					self.submit--;
				} else {
					clearInterval(stop);
					btn.style.backgroundColor = '#0b9d78';
					self.submit = 'Send OTP';
				}
			}, 1000)
    },
  },
  created() {
    this.orders = JSON.parse(sessionStorage.getItem('orders'));
		this.fee = JSON.parse(sessionStorage.getItem('orderFee')).fee;
    this.orderIndex = JSON.parse(sessionStorage.cancelType);
	},
  mounted() {
		this.tripId = this.orders[this.orderIndex].id;
  },
}
</script>
<style lang="less" scoped>
#sendOTP{
  position: relative;
  width: 100%;
  height: 100%;
  .head {
    background: #0b9d78!important;
    .title {
      font-size: 0.768rem;
      color: #fff;
    }
    .sp {
      opacity: 0;
    }
  }
  .content0{
    .otp-option {
      width: 100%;
      .content {
        width: 100%;
        height: 100%;
        padding: 3.5rem 1rem 1rem;
        box-sizing: border-box;
      }
      .top {
        margin-bottom: 1rem;
        text-align: center;
      }
      .text {
        margin-bottom: 0.45rem;
        letter-spacing: 0.5px;
        color:#333;
        opacity: 0.9;
        p {
          font-size: 0.612rem;
          text-align: left;
          line-height:0.8rem;
          margin-bottom: 10px;
        }
        .last-p{
          color:#607FA3;
          span{
            color:#f00;
          }
          span:nth-child(1){
            margin-right:0.3rem;
          }
        }
      }
      .otp {
        .msg {
          margin-bottom: 0.426rem;
          border-bottom: 1px solid #ddd;
          padding-bottom:0.2rem;
          span{width:70%;text-align:left;font-size: 0.869rem;padding-top: 0.4rem;color:#999;}
          a {
            font-size: 0.469rem;
            display: block;
            line-height: 1.28rem;
            float: right;
          }
          a {
            width: 3.84rem;
            background: #ED864B;
            color: #fff;
            border-radius: 4px;
          }
          span {
            text-align: left;
          }
        }
        .form-group {
          height: 1.5rem;
          margin-bottom: 1.06rem;
          border-bottom: 1px solid #ddd;
          border-radius: 2px;
          input {
            display: block;
            width: 100%;
            // height: 100%;
            box-sizing: border-box;
            padding: 0.4rem 0.314rem 0.2rem;
            color:#999;
            font-size: 0.869rem;
          }
          ::-webkit-input-placeholder{
            color:#999;
            font-size: 0.65rem;
          }
        }
      }
      .btn {
        margin: 0 0.64rem;
        display: block;
        line-height: 1.7rem;
        background: #ED864B;
        color: #fff;
        font-size: 0.554rem;
        border-radius: 4px;
      }
    }
    
  }
}
</style>
