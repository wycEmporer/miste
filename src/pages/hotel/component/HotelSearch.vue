<template>
  <div class="container">
			<div class="search">
        <div class="fontSz12 colorWar marB5 textL">
          Please enter your trip ID to find your  Hotel
        </div>
				<div class="search-cont">
          <div class="phoneNumber" style="margin-bottom: 15px">
            <p class="fontSz12 marB5 textL">Contact Phone No</p>
						<div class="select-group" style="margin-bottom: 10px">
							<select name="" id="" v-model="code">
								<option :value="item.regionCode" v-for="(item, key) in phoneCode" :key="key">
									{{item.countryName + ' (+' + item.regionCode + ')'}}
								</option>
							</select>
							<span>
								{{'+' + code}}
							</span>
						</div>
            <div>
              <input class="phone" type="number" placeholder="Contact Phone No" v-model.number="phoneNo">
            </div>
					</div>
					<div class="tripId" style="margin-bottom:5px;">
						<input type="email" class="email" placeholder="Contact Email" v-model="email" >
					</div>
					<div class="tripId">
            <p class="fontSz12 textL marB5">Order ID</p>
						<input type="search" class="search" @keypress.13="searchOrder" v-model="orderNubmer" placeholder="Tirp ID/Order ID" />
					</div>
          <div class="phoneNumber">
            <button type="button" @click="searchOrder">Submit</button>
          </div>
				</div>
			</div>
		</div>
</template>
<script>
import { User } from 'models/user/User.js'
import { Indicator,MessageBox,Toast } from "mint-ui";
import { CookieUtil } from '../../../models/utils';
import { AppBridge } from 'models/appbridge/appbridge.js';
import { Reg } from 'models/utils/Reg.js';

export default {
  data(){
    return {
      orderNubmer: '',
      phoneNo: '',
      phoneCode: null,
			code: '91',
			email:''
    }
  },
  methods:{
    searchOrder(){
			if(this.code == '91' && String(this.phoneNo).length != 10){
				Toast({
					message:"Please enter a valid mobile number",
					duration:1500
				});
				return false;
			}else if( this.code == '86' && String(this.phoneNo).length != 11){
				Toast({
					message:"Please enter a valid mobile number",
					duration:1500
				});
				return false;
			}else if(!Reg.email.test(this.email)){
				Toast({
					message:"Please enter a valid Email",
					duration:1500
				});
			}else if(this.orderNubmer == ''){
        Toast({
					message:"Please enter a valid Trip ID",
					duration:1500
				});
      }else{
				let url = `/hotel_order/order/${this.orderNubmer}/${this.code} ${this.phoneNo}?email=${this.email}`;
        AppBridge.jumpNewWebView(this, url);
			}
		}
  },
  created() {
		User.findSms(this).then(res => {
			this.phoneCode = res.list;
		})
	},
}
</script>
<style lang="less" scoped>
.marB5{
  margin-bottom: 5px;
}
.textL{
  text-align: left;
}
input{
  border-radius: 0;
}
.search {
	padding: 2.72rem 0.68rem 0.68rem;
	.search-cont {
		// position: relative;
		overflow: hidden;
		.tripId {
			.search {
				width: 100%;
				padding: 0.5rem;
				border: none;
				font-size: 0.6rem;
				// border-radius: 2px;
				// color: #ddd;
				border: 1px solid #ddd;
			}
		}
		.phoneNumber {
      margin-bottom: 0.32rem;
			.select-group {
				position: relative;
				border: 1px solid #ddd;
				box-sizing: border-box;
				// border-top-left-radius: 4px;
				// border-bottom-left-radius: 4px;
				width: 100%;
        height: 45px;
        line-height: 45px;
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
          position: absolute;
					width: 100%;
          height: 100%;
          padding: 0 0.5rem;
          text-align: left;
					top: 0;
					left: 0;
					font-size: 0.64rem; // color: #666;
          font-weight: normal;
          &::after{
            content: '';
            position: absolute;
            top: 10px;
            right: 10px;
          }
				}
			}
			.phone {
        width: 100%;
        height:45px;
				padding: 0 0.5rem;
				font-size: 0.6rem;
        box-sizing: border-box;
				border: 1px solid #ddd;
			}
			button {
				width: 100%;
        height: 40px; 
        line-height: 40px;
				background: #FFA000;
				font-size: 16px;
        color: #fff;
        margin-top: 30px;

			}
		}
	}
}
.email{
	text-align: left;
	height:45px;
	padding:0.5rem;
	width:100%;
	box-sizing: border-box;
	border: 1px solid #ddd;
}
</style>


