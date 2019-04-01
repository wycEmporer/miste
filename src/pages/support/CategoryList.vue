<template>
<div>
  <headTop :operate="close">
  <i slot="left" class="iconfont icon-back"></i>
  <span slot="title" class="title">Issue Category</span>
  <i slot="right" class="sp iconfont icon-back" style="opacity:0;"></i>  
  </headTop>
  <div class="category-lists">
    <div v-for="(list, index) in lists" :key="index">
      <div class="category-lists-title">
        {{list.class}}
      </div>
      <div class="category-list" v-for="(secList, idx) in list.node" :key="idx" @click="getThirdList(index, idx)">
        <div class="category-list-text">
          {{secList.class}}
        </div>
        <div class="category-list-icon"></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import headTop from "components/head/head.vue";
export default {
  components:{
    headTop,
  },
  props:{
    lists: Array
  },
  methods:{
    getThirdList(firstIndex, secondIndex){
      this.$emit('gotoThird', firstIndex, secondIndex);
    },
    close(){
      this.$emit('closeGategoryList');
    }
  }
}
</script>

<style lang="less" scoped>
  .category-lists{
    margin-top: 2.04rem;
    overflow: hidden;
  }
  .category-lists-title{
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color: #efefef;
    font-size: 14px;
    color: #666;
    padding: 0 14px;
    height: 45px;
    margin-bottom: 5px;
  }
  .category-list{
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: 33px;
    padding:0 14px;

  }
  .category-list-text{
    font-size: 14px;
    color: #333;
  }
  .category-list-icon{
    width: 8px;
    height: 13px;
    background: url('./images/icon-back.png') center/8px;

  }
</style>


