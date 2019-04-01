<template>
	<div class="loading">
		<div class="loading-img">
			
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
	export default{
		mounted(){
			Indicator.open({
			  text: 'Hang on, searching for lowest price flights',
			  spinnerType: 'fading-circle'
			});
		},
		watch:{
			
		}
	}
</script>
<style lang="less" scoped>
	.loading,.loading-img{
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,.1)
	}
	.loading{
		position:fixed;
		z-index:10;
	}
</style>