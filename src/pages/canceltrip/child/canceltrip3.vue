<template>
	<div class="wrapper">
		<head-top class="header">
			<img slot="left" :src="require('../../../assets/images/flight-prev.png')" class="prev">
			<div slot="title" class="title">Cancel trip</div>
		</head-top>						
		<div class="container">
			<div>
				<div class="cont-top">
					<div class="top-box flex direction-column space-between">
						<h2>Have received !</h2>
						<img src="../../../assets/images/trip/Cancel-trip_03.png"/>
						<p>Thank you for submitting your change request</p>
					</div>
				</div>
				<div class="detail">
					<h2>Successful application</h2>
					<p>We will contact you as soon as we can </p>
					<p>and help you complete your change</p>
				</div>
				<div class="contact">
					<a class="phone" href="tel:1800313699">Contact us</a>
				</div>
				<div class="foot">
					<p>Please note the airline will levy an amendment fee on the change you make. In addition to this fee,HappyEasyGo charges an amendment service fee passenger per sector.</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
	export default{
		components:{
			headTop
		},
		data(){
			return {
				msg:'reschedle'
			}
		}
	}
</script>
<style lang='less' scoped>
	.container{
		padding:0 0.68rem;
		position:relative;
	}
	.container>div{
		padding-top:2.4rem;
	}
	.header{
		background:#f7f7f8;
		border-bottom:1px solid #ccc;
		.title{
			line-height:2.04rem;
			font-size:0.768rem;
			color:#000;
		}
	}
	.cont-top{
		padding-top:1.2rem;
		.top-box{
			width:10rem;
			height:6rem;
			background-color:#fff;
			box-shadow:0 10px 20px #e0eaec;
			margin:0 auto;
			padding:0.8rem;
			h2{
				font-size:0.68rem;
				color:#333;
			}
			img{
				width:3.16rem;
				align-self:center;
			}
			p{
				font-size:0.6rem;
				color:#0b9d78;
				font-weight:lighter;
			}
		}
	}
	.detail{
		padding-top:1.2rem;
		h2{
			font-size:0.68rem;
			color:#333;
			line-height:1.2rem;
		}
		p{
			font-size:0.52rem;
			color:#666;
			line-height:0.6rem;
		}
	}
	.contact{
		padding-top:1.6rem;
		.phone{
			display:block;
			width:11rem;
			height:1.36rem;
			line-height:1.36rem;
			background:#ffad3d url('../../../assets/images/trip/Cancel-trip_07.png') 20% center no-repeat;
			background-size:0.8rem;
			border-radius:0.2rem;
			margin:0 auto;
			font-size:0.68rem;
			color:#fff;
		}
	}
	.foot{
		position:absolute;
		bottom:1.2rem;
		padding:0.68rem;
		p{
			font-size:0.52rem;
			color:#666;
		}
	}
</style>