<template>
	<div>
		<div class="traveller">
			<div class="title flex" @click="showInfo">
				<h2>Traveller details(<span class="yellow">&bull;</span>Adults<span class="green">&bull;</span>Child<span class="blue">&bull;</span>Infant)</h2>
				<span id="traveller-right"></span>
			</div>
			<div class="content" v-if="show">
				<div class="trave-list" v-for="(item, index) in orders[0].travellerinfo" :key="index">
					<h2><span :class="[{yellow:item.ticketno==1},{green:item.ticketno==2},{blue:item.ticketno==3}]">&bull;</span>{{item.name.split('/')[0]}} {{item.name.split('/')[1]}}</h2>
					<ul>
						<li class="flex">
							<span>9W 2423</span>
							<span>Ticket NO.17034154654555645</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			orders:{
				type:Array
			}
		},
		data(){
			return {
				show:false
			}
		},
		computed:{

		},
		methods:{
			showInfo(){
				this.show=!this.show
				this.rotates($('#traveller-right'),this.show)
			},
			rotates(el,item){
				if(item){
					el.css({
						transform:'rotateZ(90deg)',
						transition:'.5s'
					})
				}else{
					el.css({
						transform:'rotateZ(0deg)',
						transition:'.5s'
					})
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: all .5s;
	}
	.fade-enter, .fade-leave-active {
	  opacity:0;
	}
	.traveller{
		background-color:#fff;
		border-radius:0.4rem;
		margin-top:0.4rem;
		padding:0.4rem;
	}
	.title{
		
		justify-content:space-between;
		h2{
			font-size:0.6rem;
			color:#333;
			text-align:left;
			span{
				font-size:0.68rem;
				padding:0 0.2rem;
			}
		}
		#traveller-right{
			height:1rem;
			width:0.4rem;
			background:url('../../../../assets/images/ic-btn-one.png') right center no-repeat;
			background-size:0.4rem;
		}
	}
	.trave-list{
		h2{
			font-size:0.6rem;
			color:#333;
			text-align:left;
			padding:0.4rem 0;
			span{
				padding-right:0.2rem;
			}
		}
		ul{
			li{
				justify-content:space-between;
				font-size:0.52rem;
				color:#ccc;
				padding-left:0.4rem;
			}
		}
	}
</style>
