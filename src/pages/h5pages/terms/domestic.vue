<template>
  <div id="domestic-detail" >
    <div v-if="domesticTerms?domesticTerms:[]" v-for="(item1,i) in domesticTerms" :key="i">
      <h3 v-html="item1.class">{{item1.class}}</h3>
      <ul class="detail-list">
        <li v-for="(item2,j) in item1.content" :key="j" v-html="item2.content">{{item2.content}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { DomainManager } from "../../../config/DomainManager.js";
export default {
  data(){
    return {
      domesticTerms:[]
    }
  },
  created () {
    this.getDomesticTerms();
  },
  methods:{
    getDomesticTerms() {
      let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=1";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success) {
            that.domesticTerms = res.data.list[0].node;
          } else {
            Toast({
              message: res.data.statusText,
              position: "center",
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>
<style lang="less" scoped>
#domestic-detail{
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
