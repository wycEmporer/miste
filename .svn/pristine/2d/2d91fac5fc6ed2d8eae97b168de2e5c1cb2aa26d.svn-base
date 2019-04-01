<template>
	<div class="mask" v-show="showMask">
		<div class="mask-slot">
			<slot>
			</slot>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
	export default{
		props:["showMask"],
		data(){
			return {
				//showMask:true
			}
		},
		mounted(){
			Indicator.open({
			  spinnerType: 'fading-circle'
			});
		}
	}
</script>
<style lang="less">
	.mask{
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,.5);
		position:fixed;
		z-index:20;
	}
	.mask-slot{
		width:100%;
		padding:0.68rem;
		position:absolute;
		top:50%;
		left:50%;
		transform:translateY(-50%) translateX(-50%);
		-webkit-transform:translateY(-50%) translateX(-50%);
	}
</style>