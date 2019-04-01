<template>
  <div class="forgot">
    <head-top class="header">
      <img slot="left" :src="require('../../assets/images/prevs.png')" class="prev">
      <div slot="title" class="title">Forgot Passoword</div>
    </head-top>
  </div>
</template>
<script>
  import headTop  from 'components/head/head.vue';
  import {Toast,Indicator} from 'mint-ui';

  export default{
    components:{
      headTop
    },
  }
</script>
<style lang="less" scoped>
  @import './content.less';
</style>