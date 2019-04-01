<template>
  <div id="insuranceDetail">
    <head-top class="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title" class="title">Insured</span>
      <i slot="right" ></i>
    </head-top>
    <ul class="fareList">
			<li class="fi-li" v-for="item in list" :key="item.id">
				<div class="fi-title flex space-between">
          <p>Name</p>
          <p>{{item.supplyName}}</p>
        </div>
        <div class="fi-detail flex space-between">
          <p class="fi-name"><span>{{item.firstName}}</span> / <span>{{item.lastName}}</span></p>
          <p v-if='item.insuranceNo == (null || undefined)?true:false' class="insured">insured</p>
          <p v-else-if='item.insuranceNo ==""?true:false' class="insured">insured</p>
          <p v-else class="unInsured">{{item.insuranceNo}}</p>
        </div>
			</li>
		</ul>
  </div>
</template>
<script>
import headTop from '../../../../components/head/head.vue';
import { DomainManager } from "../../../../config/DomainManager.js";
import {Toast,Indicator} from 'mint-ui';
export default {
  components:{
    headTop,
  },
  data () {
    return {
      list:[]
    }
  },
  created(){
    this.list = JSON.parse(sessionStorage.getItem('orderInsurance'));
  }
}
</script>
<style lang="less" scoped>
#insuranceDetail{
  padding-top: 2rem;
  .fareList{
		padding:0 0.6rem;
		text-align: left;
		li{
			font-size:0.6rem;
      color:#333;
      align-items: center;
			padding-top:0.6rem;
			border-bottom:1px solid #eee;
      .fi-title{
        margin-bottom:0.4rem;
        color:#999;

        letter-spacing: 0.5px;
      }
      .fi-detail{
        padding-bottom: 0.5rem;
        align-items: center;
        .unInsured{
          padding:0.2rem 0;
        }
        .insured{
          color:#0b9d78;
          font-size:0.6rem;
          background: #CEECE4;
          padding:0.2rem 0.5rem;
        }
      }
    }
	}
}
</style>
