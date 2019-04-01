<template>
	<div class="load-fail">
		<h2>Login failed</h2>
		<p>Looks like you've entered an incorrect user name and password.Please try again.</p>
		<input type="button" value="OKay">
	</div>
</template>
<style lang="less" scoped>
	.load-fail{
		width:12rem;
		height:6.2rem;
		background-color:#fff;
		border-radius:0.8rem;
		padding-top:0.68rem;
		h2{
			font-size:0.768rem;
			color:#ffad3d;
			padding-bottom:0.4rem;
		}
		p{
			font-size:0.6rem;
			color:#333;
			line-height:0.8rem;
			padding:0 0.68rem;
		}
		input{
			font-size:0.768rem;
			color:#007aff;
			width:100%;
			border-top:1px solid #eee;
			margin-top:0.6rem;
			line-height:1.4rem;
			display:inline-block;
			background-color:#fff;
		}
	}
	
</style>