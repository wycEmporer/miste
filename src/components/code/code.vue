<template>
	<div>
		<div class="copy-code flex">
			<div class="codes">
				<h2>Happy hour on domestic flights</h2>
				<h3>CODE: <i id="code">HDFCY177</i></h3>
				<span @click="copyCode">COPY</span>
			</div>
			<div class="price">
				<h2>Best</h2>
				<h3>Prices</h3>
				<span><i class="rs">Rs.</i>1,000</span>
			</div>
			<span class="off" @click="closeCode">off</span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				isCode:false
			}
		},
		methods:{
			closeCode(){
				this.$emit("close",this.isCode);
			},
			copyCode(){
				
			}
		}
	}
</script>
<style lang='less' scoped>
	.copy-code{
		width:100%;
		height:auto;
		position:fixed;
		bottom:0rem;
		background-color:#00796b;
		padding:0.4rem 0;
		.codes{
			text-align:left;
			border-right:2px dashed #ffad3d;
			padding:0 0.4rem;
			h2{
				text-align:left;
				font-size:0.68rem;
				color:#fff;
			}
			h3{
				text-align:left;
				font-size:0.768rem;
				color:#fff;
				line-height:1.02rem;
			}
			span{
				font-size:0.68rem;
				color:#fff;
				width:2.56rem;
				height:1.2rem;
				line-height:1.2rem;
				text-align:center;
				background-color:#ff0000;
				border-radius:0.2rem;
			}
		}
		.price{
			padding-left:0.2rem;
			h2{
				font-size:0.8rem;
				color:#fff;
				text-align:left;
			}
			h3{
				font-size:0.8rem;
				color:#fff;
				text-indent:0.4rem;
				line-height:0.98rem;
			}
			span{
				font-size:0.768rem;
				color:#fff;
				text-align:left;
				display:block;
				i{
					font-size:0.52rem;
				}
			}
		}
		.off{
			font-size:0.5rem;
			color:#fff;
			width:1.06rem;
			height:0.68rem;
			line-height:0.68rem;
			text-align:center;
			background-color:#ffad3d;
			position:absolute;
			right:0.4rem;
			bottom:0;
		}
	}
</style>