<template>
  <div id="terms-detail">
    <h3 v-html="termsDetail.class">{{termsDetail.class}}</h3>
    <ul class="detail-list">
      <li v-for="(item,i) in termsDetail.content" :key="i" v-html="item.content">{{item.content}}</li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { DomainManager } from "../../../config/DomainManager.js";
export default {
  data(){
    return {
      termsDetail:{}
    }
  },
  created(){
    this.getTerms();
  },
  methods:{
    getTerms(){
      let that = this
      let url = DomainManager.getFlightFAQS()+'?'+'cId=84'
      this.$http.get(url).then(res => {
        if(res.data.success){
          that.termsDetail = res.data.list[0]
        }else{
          Toast({
            message:res.data.statusText,
            position:"center",
            duration:1500
          });
        }
      }).catch(err => {
        console.log(err)
      });
    },
  }
}
</script>
<style lang="less" scoped>
#terms-detail{
  height:auto;
  padding:1rem 0.55rem 0.667rem;
  text-align: left;
  h3{
    font-size: 14px;
    line-height: 1.067rem;
    margin-bottom:0.5rem;
  }
  .detail-list{
    li{
      color:#111;
      font-size: 12px;
      line-height: 1rem;
      padding-bottom:0.5rem;
    }
  }
}
</style>
