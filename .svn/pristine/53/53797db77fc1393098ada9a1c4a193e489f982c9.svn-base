<template>
	<div class="wrapper">
    <div v-show="isShowCancel">
      <head-top class="head">
        <i slot="left" class="iconfont icon-back"></i>
        <div slot="title" class="title">
          Cancel
        </div>
        <i class="sp iconfont icon-back" slot="right"></i>
      </head-top>
      <div class="container"> 
        <div class="passengers">
          <div class="title" style="margin-top:2rem;">Select Trips & Passengers</div>
          <div class="trips" v-for="(item, key) in orders" :key="key">
            <div class="nav">
              <div class="flex space-between align-items-center">
                <div>{{item.voyageinfo[0].dc}} &rarr; {{item.voyageinfo[item.voyageinfo.length -1].ac}}</div>
                <div>Refund(Per Person):Rs.{{refundAmountArr[key]}} <a class="circle" @click="showFareModal(key)">?</a></div>
              </div>
              <ul class="flex space-between align-items-center" style="height:35px;">
                <li>Passenger</li>
                <li>PNR</li>
              </ul>
            </div>
            <ul>
              <li class="passengersDetial" 
              v-for="(travellerObj) in item.travellerinfo" 
              :key="travellerObj.travellerId">
                <div class="flex fontSz15 space-between align-items-center"  :class="{inactive: travellerObj.status != 1}">
                  <mt-checklist
                    v-model="checkList"
                    :options="[{value:isTogether? travellerObj.name:travellerObj.travellerId, label:travellerObj.name}]"
                  >
                  </mt-checklist>
                  <div>
                    {{travellerObj.pNR}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="fontSz12" v-if="isTogether" style="margin-bottom: 0.64rem;color:#999; text-align: left; padding: 0.64rem; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd">
          In this booking, the airline only allow to cancel round trip at same time.
        </div>
        <div class="line"></div>
        <div class="options">
          <div class="title">Choose reason for cancellation</div>
          <div class="optionDetail">
            <ul>
              <li v-for="(val, key) in reasons" :key="key">
                <div class="flex content-start align-items-center">
                  <input type="radio" name="reason" :value="val.reasonType" v-model="reasonType">
                  {{val.reason}}
                </div>
                
                <div class="reason_upload" v-if="val.isNeedStampCopy && reasonType == key">
                  <div class="reason_upload_text">
                    {{val.reasonRemark}}
                  </div>
                  <div class="reason_upload_file-name">
                    Attach file: <span>{{file && file.name}}</span>
                  </div>
                  <Upload @getFiles="getFiles" :btn_text="file? 'Reselect' : 'Browse'" />
                    
                </div>
                
              </li>
            </ul>
          </div>
  
        </div>
        <div class="line"></div>
        <div class="proceed">
          <div class="title">
            <p>Want to proceed with cancellation?</p>
            <img :src="isFold" @click="foldTerm" v-if="foldShow" alt="">
            <img :src="isUnFold" @click="foldTerm" v-else alt="">
          </div>
          <div class="terms" v-show="showTerm">
            <p>The fare will be refunded to the same account you used while you make the booking.</p>
            <p>What you should know before cancelling these tickets?</p>
            <p class="dot-p"><span></span>The refund amount is approximate and is calculated on the basis of the fare rules &amp; restrictions and flight booking.</p>
            <p class="dot-p"><span></span>The final amount refunded to your account may vary.</p>
            <p>Your refund will be processed in below sequence as per the mode of payment you opted while booking.</p>
            <p>1. Happy Silver</p>
            <p>2. Happy Gold</p>
            <p>3. Account/Cards</p>
            <p>Please note that Coupon applied will be deducted from the refundable amount. After cancellation, HEG will send you the complete break.</p>
            <p class="last-p"><span class="spanLeft">*</span>In case of flown tickets, no refund will be applicable.<span class="spanRight">*</span></p>
          </div>
        </div>
        <div class="line"></div>
        <div class="agree" >
          <label for="agreeTerm" >
            <input type="checkBox" ref="agreeTerm" @click="select" :checked="isChecked" name="term" id="agreeTerm">I agree the refunds 
            <a href="javascript:;" @click="jumpTerms"> Term &amp; Conditions</a>
          </label>
        </div>
        <div class="button">
          <a href="javascript:;" @click="showPoup()">Yes, Cancel now</a>
        </div>
      </div>
    </div>
		
		<div class="modal" v-show="showOTP"></div>
		<ul class="topUp" v-show="showOTP">
			<li>Insufficient balance of Cashback</li>
			<li>The balance of your HappyGold is insufficient for refund.Please top-up {{gold}} HappyGold ,then you can apply for refund.</li>
			<li><span @click="isTop">Top-up</span><span @click="notTop">No,give up</span></li>
		</ul>
    <mt-popup popup-transition="popup-fade" v-model="showModal" modal="true" closeOnClickModal="false" class="dialogPopup" >
      <div class="fareModal">
        <div class="fontSz18 title text-center">
          Refund(Per Person)
        </div>
        <div class="fontSz14 fareWrap">
          <div class="flex fareItem space-between">
            <span>Paid</span>
            <span>Rs. {{fareModalObj.paid}}</span>
          </div>
          <div class="flex fareItem space-between" style="border-bottom: 1px solid #ddd">
            <span>Cancellation fee</span>
            <span>Rs. {{fareModalObj.fee}}</span>
          </div>
          <div class="flex space-between" style="padding:7px 0">
            <span>Refund</span>
            <span>Rs. {{fareModalObj.refund}}</span>
          </div>
          <div class="fontSz14" style="text-align:left;color: #999; padding: 10px 0">
            The final amount refunded to your
            account may vary
          </div>
        </div>
        <div class="flex content-center" >
          <span class="ok" @click="showModal=false">OK</span>
        </div>
      </div>
    </mt-popup>
    <refundOTP :params="params" :stampCopyUrl="stampCopyUrl"  @onlisten="showCancel"  v-if="!isShowCancel"/>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import { TimeFormatUtil, OrderStatusUtil, GetFlightOrderUtil } from './../../../models/utils';
// import dialog from 'components/dialog/dialog.vue';
import { Popup, Toast, Indicator, Checklist } from 'mint-ui'
import { User } from '../../../models/user'
import { DomainManager } from '../../../config/DomainManager';
import refundOTP from './refundOTP.vue';
import Upload from 'components/upload/Upload';

export default {
	components: {
		headTop,
		Popup,
    GetFlightOrderUtil,
    [Checklist.name]: Checklist,
    refundOTP,
    Upload
    // dialog,
	},
	data() {
		return {
      reasons:null,
      showModal:false,
      fareModalObj:{},
      orders: null,
      isShowCancel: true,
      isTogether: false,
      params:null,
			// orderIndex: 0,
			checkList: [],
			// checkArr: [],
			reasonType: 0,
			showOTP: false,
			gold:0,
			showTerm:false,
			foldShow:true,
      isChecked:true,
      refundAmountArr:[],
			tripId:'',
			isFold:require('../../../assets/images/refund/fold.png'),
      isUnFold:require('../../../assets/images/refund/unfold.png'),
      file:null,
      stampCopyUrl: '',
		}
	},
	methods: {
    getFiles(files){
      const file = files.length == 0 ? null : files[0];
      
      this.file = file;
    },
    beforeUploadFile(){
      // 判断是否需要 上传文件
      const isNeedUpload = this.reasons[this.reasonType].isNeedStampCopy;
      // 需要上传，但没选择文件，需提示
      if(isNeedUpload && !this.file){
        Toast({
          message: 'Kindly attach airline request stamped copy or screenshot of the SMS/email proving the cancellation or rescheduling of your flight to apply for refund.',
				  duration:8000
        })
        return false;
      }
      // 检查是否大于size
      if(isNeedUpload && this.file){
        const size = this.file.size / 1024;
        if(size > 10240){
          Toast({
            message: 'The files should not be larger than 10 mb',
            duration: 2000,
          })
          return false;
        }
      }
      return true;
    },
    uploadFile(){
      // 判断是否需要 上传文件
      const isNeedUpload = this.reasons[this.reasonType].isNeedStampCopy;
      
      if(!isNeedUpload){
        return Promise.resolve();
      }

      // 判断是否 选择了文件；
      if(isNeedUpload && !this.file){
        return Promise.reject();
      }
      // 上传文件 ，返回promise ，接着提交退票申请；
      Indicator.open({
				spinnerType: 'fading-circle'
      });
      
      const data = new FormData();
      data.append('file', this.file);
      data.append("typeId", "ca72e59c-409b-11e9-93e2-000c29231d9f");

      return this.$axios({
        url: "/oss_api/upload/extract.do",
        method: 'post',
        data: data,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }).then(res => {
        Indicator.close();
        if(res.code == 200){
          return res;
        } else{
          Toast({
            message: res.message,
            duration: 2000,
          })
          return Promise.reject(res.message);
        }
      })
      // .catch(e => {
      //   Indicator.close();
      // })

    },
    randerRefundReason(){
      this.$axios.get('/heg_api/refund/getRefundReason.do')
      .then(res => {
        if(res.data.length > 0){
          this.reasons = res.data;
          // 设置默认值
          this.reasonType = res.data[0].reasonType;
        }
      });
    },
    showFareModal(index){
      let trip = this.orders[index];
      this.fareModalObj = {
        paid: (trip.price / trip.travellerinfo.length).toFixed(2),
        refund: this.refundAmountArr[index],
        fee: (trip.price / trip.travellerinfo.length).toFixed(2) - this.refundAmountArr[index],
      };
      this.showModal = true;
    },
		isCanRefund(checkedArr){
			Indicator.open({
				spinnerType: 'fading-circle'
			});
			let tarvellerId = checkedArr;
			let type = this.reasonType;
			User.refundOTP(this, tarvellerId, type).then(res =>{
				if(res.success){
					Indicator.close();
					if(res.data.success){
						this.isShowCancel = false;
					}else{
						this.showOTP = true;
						this.gold = res.data.amount;
					}
				}else{
					Indicator.close();
					Toast({
						message:res.msg,
						duration:1200
					})
				}
			}).catch(err =>{
				console.log(err);
				Indicator.close();
			})
    },
    showCancel(){
      this.isShowCancel = true;
    },
		isTop(){
      this.showOTP = false;
      this.$router.push('/top-up');
    },
    notTop(){
      this.showOTP = false;
    },
		jumpTerms(){
			this.$router.push('/domesticterms');
		},
		foldTerm(){
			this.foldShow = !this.foldShow;
			this.showTerm = !this.showTerm;
		},
		select(){
			this.isChecked = !this.isChecked;
		},
		showPoup() {
      let passengers = [];
      let tripObj = {};
      let _this = this

			if (this.checkList.length == 0) {
				Toast('Please select a passenger to cancel flight')
				return false
			}
      if(!this.isChecked){
        Toast({
          message:'Please read the terms.',
          position:'center',
          duration:1500
        })
        return;
      }
      if(!this.beforeUploadFile()) return;

      if(this.isTogether){
        this.orders.forEach(trip => {
          trip.travellerinfo.forEach(tra =>{
            if(_this.checkList.indexOf(tra.name) > -1){
              passengers.push(tra.travellerId);
            }
          })
        })
      }else{
        passengers = this.checkList;
      }

      this.orders.forEach((trip, i) => {
        trip.travellerinfo.forEach(tra =>{
          if(passengers.indexOf(tra.travellerId) > -1){
            tripObj[trip.id] = this.refundAmountArr[i];
          }
        })
      })
      
      this.params = {reasonType:this.reasonType, passengers, tripObj};

      this.uploadFile().then(res => {
        if(res){
          this.stampCopyUrl = res.data.path;
        }else{
          this.stampCopyUrl = '';
        }
        this.isCanRefund(passengers);
      })
      

		},
	},
	created() {
		this.orders = JSON.parse(sessionStorage.getItem('orders'));
	},
	mounted() {
    let tripId = this.orders[0].id;
    this.$axios.get('/heg_api/rebook/needRefundOrRebookTogether.do?tripId='+tripId).then(res => {
      // if(res.succ){
        this.isTogether = res.succ;
        // this.options = [].concat.apply([], this.orders.map(trip => trip.travellerinfo.map(traveller => traveller.name)));
      // }
    });
    Promise.all( this.orders.map(v=>User.getRefundAmount(this, `tripId=${v.id}`))).then(res => this.refundAmountArr = res);
    this.randerRefundReason();
	}
}
</script>
<style lang="less" scoped>
.reason_upload{
  margin-left: 20px;
  padding: 10px;
  background-color: #efefef;
  line-height: 1.2;
}
.reason_upload_text{
  margin-bottom: 25px;
  line-height: 24px;
}
.reason_upload_file-name{
  margin-bottom: 15px;
  overflow: hidden;
}

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
.fareModal{
  width: 270px;
  border-radius: 16px;
  .title{
    padding: 20px 0;
  }
  .fareWrap{
    padding: 0 15px;
    border-bottom: 1px solid #ddd;

    .fareItem{
      height: 20px;
      color: #999;
    }
  }
  .ok{
    height: 44px;
    line-height: 44px;
      color:#ffad3d;
      font-size: 18px;
  }
}
.container {
	overflow: auto;
	position: relative;
	.last-p{
			color:#607fa3;
			.spanLeft{
				margin-right:0.2rem;
			}
			.spanRight{
				margin-left:0.2rem;
			}
	}
	.otp-option {
		width: 12.16rem;
		position: fixed;
		top: 50%;
		margin-top: -6.4rem;
		left: 50%;
		margin-left: -6.08rem;
		z-index: 99;
		background: #fff;
		.content {
			width: 100%;
			height: 100%;
			padding: 1rem 0.85rem;
			box-sizing: border-box;
		}
		.top {
			margin-bottom: 0.512rem;
			.close {
				img {
					width: 0.682rem;
					display: block;
				}
			}
		}
		.text {
			margin-bottom: 0.45rem;
			p {
				font-size: 0.512rem;
				text-align: left;
				line-height:0.8rem;
			}
		}
		.otp {
			.msg {
				margin-bottom: 0.426rem;
				span,
				a {
					font-size: 0.469rem;
					display: block;
					line-height: 1.28rem;
				}
				a {
					width: 3.84rem;
					background: #0b9d78;
					color: #fff;
					border-radius: 4px;
				}
				span {
					text-align: left;
				}
			}
			.form-group {
				height: 1.28rem;
				margin-bottom: 1.06rem;
				border: 1px solid #ddd;
				border-radius: 2px;
				input {
					display: block;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 0 0.314rem;
				}
			}
		}
		.btn {
			margin: 0 0.64rem;
			display: block;
			line-height: 1.7rem;
			background: #ffad3d;
			color: #fff;
			font-size: 0.554rem;
			border-radius: 4px;
		}
	}
	.modal {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
		background: #000;
		opacity: 0.5;
	}
	.line {
		width: 100%;
		height: 0.213rem;
		background: #ebebeb;
		margin-top: 0.64rem;
	}
	.fi-wrapper {
		padding: 2.8rem 0.68rem 0rem;
	}
	.options {
		.title {
			font-size: 0.597rem;
			line-height: 1.7rem;
			text-align: left;
			border-bottom: 1px solid #ddd;
			padding: 0 0.64rem;
		}
		.optionDetail {
			padding: 0 0.64rem;
			ul {
				li {
					text-align: left;
					line-height: 1.28rem;
					font-size: 0.597rem;
					input {
						display: block;
					}
				}
			}
		}
	}
	.passengers {
    .circle{
      color:#0b9d78;
      border: 1px solid #0b9d78;
      width: 12px;
      height: 12px;
      border-radius: 10px;
      font-size: 11px;
      line-height: 13px;
    }
    .trips{
      margin-bottom: 15px;
    }
		.title {
			font-size: 0.597rem;
			line-height: 1.7rem;
			text-align: left;
			border-bottom: 1px solid #ddd;
			padding: 0 0.64rem;
		}
		.nav {
      padding: 0 0.64rem;
      font-size: 14px;
      &>div{
        height: 40px;
        border-bottom: 1px solid #ddd;
      }
		}
		.passengersDetial {
      &>div{
        margin-bottom: 5px;
        padding: 0 0.64rem;
        height:35px;
        background-color: #fdf3ec;
        &.inactive{
          background-color:inherit;
          color: #999;
          input{
            display: none;
          }
        } 
      }

			.sp {
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.amount {
		.title {
			font-size: 0.597rem;
			line-height: 1.7rem;
			text-align: left;
			border-bottom: 1px solid #ddd;
			padding: 0 0.64rem;
		}
		.nav {
			padding: 0 0.64rem;
			ul {
				width: 100%;
				border: 1px solid #ddd;
				border-radius: 4px;
				height: 1.7rem;
				margin-top: 0.64rem;
				li {
					width: 50%;
					font-size: 0.597rem;
					line-height: 1rem;
					border-right: 1px solid #ddd;
				}
				li:nth-child(2) {
					border-right: none;
				}
			}
		}
		.amountDetail {
			padding: 0 0.64rem;
			li {
				width: 50%;
				font-size: 0.587rem;
				line-height: 1.7rem;
				border-bottom: 1px solid #ddd;
			}
		}
	}
	.total {
		margin-top: 1.7rem;
		padding: 0 0.64rem;
		.title {
			font-size: 0.597rem;
			text-align: right;
		}
		.price {
			margin-top: 0.64rem;
			font-size: 0.64rem;
			text-align: right;
		}
	}
	.tips {
		padding: 0 0.64rem;
		margin-top: 0.64rem;
		p {
			font-size: 0.512rem;
			text-align: left;
		}
	}
	.proceed{
		.title {
			font-size: 0.597rem;
			text-align: left;
			border:1px solid #eee;
			padding:0.556rem 0.68rem;
			display:flex;
			justify-content: space-between;
			align-items: center;
			img{
				width: 0.5rem;
				cursor: pointer;
			}
		}
		.terms{
			padding:0.64rem 0.68rem 0;
			p{
				font-size:0.597rem;
				line-height:1.2rem;
				text-align: left;
				span{
					color:#f00;
				}
			}
			.dot-p span{
				display:inline-block;
				width:0.25rem;
				height:0.25rem;
				border-radius:50%;
				background:#000;
				vertical-align: middle;
				margin-right:0.3rem;
			}
		}
	}
	.agree{
		text-align: left;
		padding:0.556rem 0.68rem 0;
		font-size:0.597rem;
		input{
			margin-right: 0.3rem;
			vertical-align:middle;
		}
		a{
			display: inline-block;
			color:#0B9D78;
			border-bottom:1px solid #0B9D78;
			margin-left:0.1rem;
		}
	}
	.button {
		margin-top: 1.5rem;
		margin-bottom: 2rem;
		a {
			margin: 0 auto;
			display: block;
			line-height: 1.7rem;
			width: 14.72rem;
			background: #ffad3d;
			color: #fff;
			font-size: 0.554rem;
			border-radius: 4px;
		}
	}
}
.modal {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 11;
	background: #000;
	opacity: 0.5;
}
.topUp{
	position: absolute;
	background: #fff;
	top:30%;
	width:12rem;
	left:0;
	right: 0;
	margin:auto;
	z-index:99;
	padding:0.8rem 0.63rem;
	border-radius: 3px;
	font-size:0.68rem;
	li:nth-child(1){
		font-weight: bold;
	}
	li:nth-child(2){
		padding:0.8rem 0;
		text-align: left;
		line-height: 1rem;
	}
	li:last-child{
		display:flex;
		justify-content: space-between;
		align-items: center;
		span{
			width: 45%;
			background-color:#FFAD40;
			padding:0.4rem 0;
			color:#fff;
			border-radius: 3px;
		}
		span:nth-child(2){
			background-color:#999999; 
		}
	}
}
</style>
<style lang="less">
.passengers{
  .inactive{
    .mint-checkbox-core{
      visibility: hidden;
    }
    .mint-checkbox-label{
      color: #999 !important;
    }
  }
  .mint-checklist{
    .mint-checklist-title{
      margin:0;
    }
    .mint-cell{
      background-color: transparent;
    }
    .mint-checklist-label{
      .mint-checkbox .mint-checkbox-core{
        border-radius:2px;
        width:15px;
        height:15px;
      }
      .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: #ed8649;
        border-color: #ed8649;
      }
      .mint-checkbox-core::after{
        width:3px;
        top:1px;
        left:0;
        right: 0;
        margin:auto;
      }
      .mint-checkbox-label{
        font-size: 15px;
        color: #666666;
      }
    }
  }
}
</style>

