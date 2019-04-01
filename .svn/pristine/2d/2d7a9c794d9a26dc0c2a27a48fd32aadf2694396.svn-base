<template>
	<div class="failure">
		<div class="failure-cont flex">
			<img :src="require('../../../assets/images/payment/failure.png')" alt="">
			<h2>{{message}}</h2>
			<mt-button class="btn" @click="gohomePage" type="danger">Back home page</mt-button>
		</div>
	</div>
</template>
<script>
import {AppBridge} from '../../../models/appbridge/appbridge.js';
export default{
	props:["message"],
	methods:{
		gohomePage(){
			AppBridge.goHomePage(this);
		}
	}
}

</script>

<style lang="less" scoped>
	.failure{
		width:100%;
		height:100%;
		padding:2rem 0 0;
		background-color:#f8fefc;
		.failure-cont{
			height:100%;
			flex-direction:column;
			justify-content:center;
			align-items:center;
			img{
				width:7.72rem;
			}
			h2{
				font-size:0.68rem;
				color:#0b9d78;
			}
			.btn{
				width:10.68rem;
				background-color:#ffad3d;
				margin-top:2rem;
			}
		}
	}
</style>