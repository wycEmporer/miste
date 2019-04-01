<template>
	<div class="prompt flex">
		<div class="content">
			<h2></h2>
			<div class="inputGroup">
				<input type="text">
			</div>
			<div class="inputGroup">
				<input type="text">
			</div>
			<div class="choose">
				<mt-button class="btn" type="primary">primary</mt-button>
				<mt-button class="btn" type="danger">primary</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	
</script>
<style lang="less" scoped>
	.prompt{
		height:100%;
		background-color:rgba(0,0,0,0.5);
		justify-content:center;
		align-items:center;
		.content{
			background-color:#fff;
			border-radius:0.4rem;
			padding:0.68rem;
			.inputGroup{
				margin:0.4rem;
				input{
					border:1px solid #ccc;
					height:1.2rem;
				}
			}
			.choose{
				.btn{
					width:2.6rem;
					height:1.2rem;
					font-size:0.52rem;
				}
			}
		}
	}
</style>