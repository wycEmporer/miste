<template>
	<div class="wrapper">
		<head-top :operate="showM">
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Terms &amp; Conditions
			</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="containerA" :class="{marTop: contentMargin}">
			<div class="content" v-for="i in termsList" :key="i.cid">
				<h2 >{{i.class}}</h2>
				<!-- <p>
					The website
					<a href="https://www.happyeasygo.com">www.happyeasygo.com</a> (the "Site") is published and maintained by HAPPYEASYGO TRAVELS PRIVATE LIMITED ("HEG"), a HEG incorporated and existing in accordance with the laws of India When you access, browse or use this Site, you accept, without limitation or qualification, the terms and conditions set forth herein. When you access any of the sub-Site (whether belonging to an 'associate' of HEG or otherwise) through this Site, then such sub-Site may have its own terms and conditions, which are specific to such sub-Site.
				</p> -->
				<p v-for="(j,index) in i.content" :key="index" v-html="j.content">{{j.content}}</p>
				<p v-if="i.cid == 83"><a href="javascript:" @click='$router.push("/domesticterms")' target="_blank">Domestic Flight Booking Terms</a></p>
				
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue';
import { Toast, Indicator } from "mint-ui";
import { DomainManager } from "../../config/DomainManager.js";
import {AppBridge} from '../../models/appbridge/appbridge.js';
export default {
	components: {
		headTop
	},
	props:["flag"],
	data(){
		return {
			termsList: [],
			contentMargin:false,
		}
	},
	methods: {
		showM(){
			if(this.flag){
				this.$emit('showAgreement');
			}else{
				this.$router.go(-1);
			}
		},
		getTermInfo(){
			Indicator.open({
				spinnerType: 'fading-circle'
			});
			let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=82";
      this.$http.get(url).then(res => {
				if (res.data.success) {
					Indicator.close();
					that.termsList = res.data.list[0].node;
				} else {
					Toast({
						message: res.data.statusText,
						position: "center",
						duration: 1500
					});
				}
			}).catch(err => {
				console.log(err);
			});
		},
	},
	async created() {
		this.contentMargin = await AppBridge.getNativeSource(this);
		this.getTermInfo();
	},
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

a {
	color: #0db790;
}

.containerA {
	height: auto;
	padding: 0 0.68rem 2.4rem;
}
.marTop{
	margin-top:2.4rem;
}
.containerA .content {
	h2 {
		font-size: 0.6rem;
		color: #000;
		text-align: left;
		padding: 0.6rem 0 0;
	}
	p {
		font-size: 0.52rem;
		color: #666;
		text-align: left;
		padding: 0.2rem 0;
		/*letter-spacing:0.5px;*/
		line-height: 0.68rem;
	}
}
</style>