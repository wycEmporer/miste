<template>
	<div id="cancel-order">
		<div class="head">
			<slot name="head"></slot>
		</div>
		<div class="content">
			<slot name="content"></slot>
		</div>
		<div class="sure">
			<slot name="btn"></slot>
		</div>
	</div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
#cancel-order {
  width: 13rem;
  background-color: #fff;
  border-radius: 4px;
  padding-top: 0.68rem;
  .head {
    text-align: left;
    img {
      width: 1.8rem;
      margin-bottom: 0.4rem;
    }
    font-size: 0.68rem;
    color: #ffad3d;
    padding:0 0.68rem 0.4rem;
    border-bottom:1px solid #eee;
  }
  .content {
    font-size: 0.52rem;
    color: #333;
    line-height: 0.8rem;
    padding: 0.3rem 0.68rem 0;
    text-align: center;
    text-align: left;
  }
  .sure {
    padding: 0 0.68rem 1rem;
    font-size: 0.8rem;
    color: #007aff;
    margin-top: 0.6rem;
    line-height: 1rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-radius:0 0 4px 4px;
    border-top:1px solid transparent;
    .mint-button{
      height:30px;
    }
    .mint-button::after{
      background: #fff;
    }
  }
  .btn {
    width: 45%;
    border-radius:0;
    line-height: 1rem;
    font-size:0.7rem;
  }
  .active{
    color:#fff;
    background: #ffad3d;
  }
}
</style>