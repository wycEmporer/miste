<template>
<div>
  <headTop :operate="close">  
  <i slot="left" class="iconfont icon-back" ></i>
  <span slot="title" class="title">Select Issue</span>
  <i slot="right" class="sp iconfont icon-back" style="opacity:0;"></i>  
  </headTop>
  <div class="category-lists">
    <div class="category-lists-title">
      {{data[indexs[0]].node[indexs[1]].class}}
    </div>
    <div class="category-list" v-for="(list, index) in data[indexs[0]].node[indexs[1]].node" :key="index" @click="setIssue(index)">
      <div class="category-list-text">
        {{list.class}}
      </div>
      <div class="category-list-icon"></div>
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
    data: Array,
    indexs: Array,
  },
  methods:{
    setIssue(index){
      this.$emit('setIssue', [...this.indexs, index]);
    },
    close(){
      this.$emit('closeThird');
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
    color: #666;
    font-size: 14px;
    padding: 0 14px;
    height: 45px;
    margin-bottom: 5px;
  }
  .category-list{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 14px;
    border-bottom: 1px solid #cdcdcd

  }
  .category-list-text{
    font-size: 14px;
    text-align: left;
  }
  .category-list-icon{
    width: 8px;
    height: 13px;
    background: url('./images/icon-back.png') center/8px;

  }
</style>


