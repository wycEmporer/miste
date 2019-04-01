<template>
  <div id="about-us">
    <div class="us-title">
      <img :src="require('../../../assets/images/H5/us-title.png')" alt="">
    </div>
    <div class="us-content">
      <div class="con-child" v-for="(item,index) in lists" :key="index">
        <h3 v-html="item.class">{{item.class}}</h3>
        <p class="children" v-for="(child,index) in item.content" :key="index" v-html="child.content">{{child.content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
import {DomainManager} from '../../../config/DomainManager.js';
export default {
  data(){
    return {
      lists:[]
    }
  },
  created(){
    this.getAboutus();
  },
  methods:{
    getAboutus(){
      let that = this
      let url = DomainManager.getFlightFAQS()+'?'+'cId=112'
      this.$http.get(url).then(res => {
        if(res.data.success){
          that.lists = res.data.list[0].node
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
#about-us{
  height: auto;
  padding:1.739rem 0.55rem 1.41rem;
  .us-title{
    img{
      width:94%;
      // height:1.413rem;
    }
    p{
      margin-top: 0.978rem;
      color:#999999;
      font-size:0.523rem;
    }
  }
  .us-content{
    .con-child{
      h3{
        color:#111;
        font-size:0.913rem;
        padding:1.63rem 0 1.087rem;
      }
      p{
        color:#111;
        font-size:0.523rem;
        line-height:1.046rem;
        text-align: left;
      }
      .children{
        margin-bottom: 0.6rem;
      }
      .children:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>

