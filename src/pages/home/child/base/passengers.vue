<template>
  <div id="d_dialog">
		<head-top class="header" :operate="close">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Travelers &amp; Class</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div style="margin:0 0.64rem;">
			<div class="d_adult d_passenger">
				<p>adults</p>
				<div class="flex space-between align-items-center">
          <div class="flex">
            <i class="s-icon s-icon-adults"></i>
            <input class="d_input" readonly v-blur="blur" @blur='ad' type="text" autocomplete="off" v-model="passengersNum.adults">
          </div>
					<div class="d_calc flex">
						<div class="d_img_minus s-icon s-icon-minus" @click='minus(passengersNum.adults,"adults")'></div>
						<div class="d_img_plus s-icon s-icon-plus" @click='plus(passengersNum.adults,"adults")'></div>
					</div>
				</div>
			</div>
			<div class="d_children d_passenger">
				<p>children <span>(2-11y)</span></p>
				<div class="flex space-between align-items-center">
          <div class="flex">
            <i class="s-icon s-icon-children"></i>
            <input class="d_input" readonly @blur='ch' type="text" autocomplete="off" v-model="passengersNum.children">
          </div>
					<div class="d_calc flex">
						<div class="d_img_minus s-icon s-icon-minus" @click='minus(passengersNum.children,"children")'></div>
						<div class="d_img_plus s-icon s-icon-plus" @click='plus(passengersNum.children,"children")'></div>
					</div>
				</div>
			</div>
			<div class="d_infants d_passenger">
				<p>infants <span>(below 2y)</span></p>
				<div class="flex space-between align-items-center">
          <div class="flex">
            <i class="s-icon s-icon-infants"></i>
            <input class="d_input" readonly @blur='inf' type="text" autocomplete="off" v-model="passengersNum.infants">
          </div>
					<div class="d_calc flex">
						<div class="d_img_minus s-icon s-icon-minus" @click='minus(passengersNum.infants,"infants")'></div>
						<div class="d_img_plus s-icon s-icon-plus" @click='plus(passengersNum.infants,"infants")'></div>
					</div>
				</div>
			</div>
			<div class="d_seat ">
				<div class="flex space-between align-items-center" v-for="item in seatType" :key="item.id" 
					@click="selectType(item.id,$event)">
					<p>{{item.type}}</p>
					<i :class="{active:item.ischeck}"></i>
				</div>
			</div>
			<div class="d_btn">
				<button @click="commitBox">Confirm</button>
			</div>
    </div>
  </div>
</template>
<script>
import headTop from 'components/head/head.vue';
import { CookieUtil, SHA2Util, GetFlightOrderUtil } from 'models/utils';
import{Toast} from 'mint-ui';

export default {
	props:{
		selectShow:{
			type: Boolean,
			default: false
		}
	},
	components: {
		headTop
	},
	data(){
		return{
			blur:true,
			message:'hello',
			passengersNum: {
				adults:1,
				children:0,
				infants:0,
				type:'Economy',
			},
			seatType:[
				{id:0,type:'Economy',ischeck:false},
				{id:1,type:'Business',ischeck:false},
				{id:2,type:'First',ischeck:false},
				{id:3,type:'Premium Economy',ischeck:false}
			],
			iconMinus: require('assets/images/home-new/minus.png'),
			iconPlus: require('assets/images/home-new/plus.png'),
		}
	},
	created(){
		this.loadSearchInfo();
	},
  methods:{
		close() {
			this.$emit('closePassenger');
		},
		ad(){
			if(Number(this.passengersNum.adults) + Number(this.passengersNum.children) >= 9){
				this.passengersNum.adults = 9 - this.passengersNum.children;
			}else if(Number(this.passengersNum.adults) < 1){
				this.passengersNum.adults = 1;
			}else{
				this.clearZero(this.passengersNum.adults,0);
			}
		},
		ch(){
			if(Number(this.passengersNum.adults) + Number(this.passengersNum.children) >= 9){
				this.passengersNum.children = 9 - this.passengersNum.adults;
			}else{
				this.clearZero(this.passengersNum.children,1);
			}
		},
		inf(){
			if(Number(this.passengersNum.infants) >= Number(this.passengersNum.adults)){
				this.passengersNum.infants = this.passengersNum.adults;
			}else{
				this.clearZero(this.passengersNum.infants,2);
			}
		},
    minus(num,who){
			num--;
			if(who == 'adults'){
				this.passengersNum.adults = num;
				if(num < 1){
					num = 1;
					this.passengersNum.adults = num;
				}
				if(this.passengersNum.infants > this.passengersNum.adults){
					this.passengersNum.infants = this.passengersNum.adults;
				}
			}else if(who == 'children'){
				this.passengersNum.children = num;
				if(num < 1){
					num = 0;
					this.passengersNum.children = num;
				}	
			}else if(who == 'infants'){
				this.passengersNum.infants = num;
				if(num < 1){
					num = 0;
					this.passengersNum.infants = num;
				}
			}
		},
		plus(num,who){
			num++;
			if(who == 'adults'){
				this.passengersNum.adults = num;
				if(num + this.passengersNum.children > 9){
					num = 9 - this.passengersNum.children;
					this.passengersNum.adults = num;
				}
			}else if(who == 'children'){
				this.passengersNum.children = num;
				if(num > 9 - this.passengersNum.adults){
					num = 9 - this.passengersNum.adults;
					this.passengersNum.children = num;
				}
			}else if(who == 'infants'){
				this.passengersNum.infants = num;
				if(num > this.passengersNum.adults){
					num = this.passengersNum.adults;
					this.passengersNum.infants = num;
				}
			}
		},
		selectType(i,event){
			this.seatType.forEach((e,i)=>{
				e.ischeck = false;
			})
			this.passengersNum.type = this.seatType[i].type;
			this.seatType[i].ischeck = true;
		},
		commitBox(){
			// let numbers = this.passengersNum.adults + this.passengersNum.children + this.passengersNum.infants;
			this.$emit('surePassenger',{ passengerData: this.passengersNum, type: this.passengersNum.type})
		},
		clearZero(val,who){
			let v = String(val).split('');
			if(v[0] == '0' && v[1]){
				if(who == 0){
					this.passengersNum.adults = v[1]
				}else if(who == 1){
					this.passengersNum.children = v[1]
				}else if(who == 2){
					this.passengersNum.infants = v[1]
				}			
			}
		},
		loadSearchInfo() {
			if (sessionStorage.searchInfo) {
				let info = JSON.parse(sessionStorage.searchInfo);
				this.passengersNum.adults = info.passengersNum.adults;
				this.passengersNum.children = info.passengersNum.children;
				this.passengersNum.infants = info.passengersNum.infants;
				this.passengersNum.type = info.defaultCabinClass;
				this.seatType.forEach((e)=>{
					e.ischeck = false;
				})
				if(info.defaultCabinClass == "Economy"){
					this.seatType[0].ischeck = true;
				}else if(info.defaultCabinClass == "Business"){
					this.seatType[1].ischeck = true;
				}else if(info.defaultCabinClass == "First"){
					this.seatType[2].ischeck = true;
				}else if(info.defaultCabinClass == "Premium Economy"){
					this.seatType[3].ischeck = true;
				}
			}else{
				this.seatType[0].ischeck = true;
			}
		}
	},
	directives: {
		blur: {
			inserted: function(el,binding) {
				el.focus()
			}
		},
	}
}
</script>
<style lang="less" scoped>
.header {
	background: #0b9d78;
	.title {
		line-height: 2.04rem;
		font-size: 0.768rem;
		color: #fff;
	}
	.sp {
		opacity: 0;
	}
}
#d_dialog{
	top: 2.4rem;
	position: relative;
	.d_Top{
		position: relative;
		.d_close{
			position: absolute;
			display:inline-block;
			font-size: 1.2rem;
			color:#999;
			top: -0.3rem;
			right: 0;
			width: 0.8rem;
			height: 0.8rem;
			z-index:2;
		}
		.d_close:hover{
			color:#000;
		}
	}
	.d_passenger{
		position: relative;
		text-align: left;
		color:#111;
		margin-bottom: 0.64rem;
		p{
			font-size: 14px;
			line-height:19px; 
			margin-bottom: 10px;
			span{
				color:#999;
				font-size: 12px;
				line-height:19px; 
			}
		}
	}
	.d_input{
		width: 5rem;
		height:29px;
		line-height: 29px;
		font-size:27px;
		padding:0 34px;
	}
	.d_calc{
		.d_img_minus,.d_img_plus{
			cursor: pointer;
			vertical-align: middle;
		}
		.d_img_minus{
			margin-right:0.854rem;
		}

		.d_img_minus:active{
			background: url('~assets/images/home-new/minus_active.png') left center/20px 20px no-repeat;
		}
		.d_img_plus:active{
			background: url('~assets/images/home-new/plus_active.png') left center/20px 20px no-repeat;
		}

	}
	.d_infants{
		padding-bottom: 0.854rem;
		border-bottom:1px solid #dcdcdc;
	} 
	.d_seat{
		text-align: left;
		padding-bottom: 2.7rem;
		div{
			color:#111;
			font-size: 16px;
			line-height:0.68rem;
			margin:0.854rem 0 0;
			i{
				display:block;
				width: 7px;
				height: 7px;
				margin-right: 10px;
				border: 3px solid #bbb;
				border-radius: 12px;
			}
			.active{
				background: #fff;
				border-color:#0b9d78;
			}
		}
	}
	.d_btn{
		button{
			width:13.6rem;
			padding:10px 0;
			margin:auto;
			color:#fff;
			font-size: 18px;
			border-radius: 2px;
			background: #E3A428;
		}
	}
}
</style>