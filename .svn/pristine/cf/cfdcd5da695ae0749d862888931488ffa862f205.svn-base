<template>
  <div id="faq-register-sign">
    <ul class="fq-list">
      <li v-for="(item,index) in listDetail" :key="index">
        <h3 v-html="item.class">{{item.class}}</h3>
        <p v-for="(it,j) in item.content" :key="j" v-html="it.content">{{it.content}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import {Toast,Indicator} from 'mint-ui';
import {DomainManager} from '../../../config/DomainManager.js';
export default {
  data(){
    return {
      listDetail:[],
    }
  },
  created(){
    this.getFaqs();
  },
  methods:{
    getFaqs(){
      Indicator.open({
				spinnerType: 'fading-circle'
			});
      let that = this
      let url = DomainManager.getFlightFAQS()+'?'+'cId=78'
      this.$http.get(url).then(res => {
        if(res.data.success){
          Indicator.close();
          that.listDetail = res.data.list[0].node
        }else{
          Toast({
            message:res.statusText,
            position:"center",
            duration:1500
          });
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>
<style lang="less" scoped>
#faq-register-sign{
  background:#eee;
  height:auto;
  .fq-list{
    li{
      padding:0.96rem 0.55rem 0.64rem;
      text-align: left;
      color:#111;
      background:#fff;
      margin-bottom: 0.68rem;
      h3{
        font-size:0.608rem;
        margin-bottom: 0.6rem;
      }
      p{
        font-size:0.515rem;
        line-height:0.85rem;
        letter-spacing: 0.2px;
        // font-family: 'PingFangSC-Light';
        // text-align: justify;
      }
    }
  }
}
</style>