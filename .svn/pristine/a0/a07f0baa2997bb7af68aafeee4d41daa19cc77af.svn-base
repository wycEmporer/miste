<template>
  <div class="query-order-summary">
    <Queryform v-show="showSearch" :tripType="tripType" :query_error_msg="detailCloseMsg"  @getSeachParams="getSeachParams" />
    <OrderSummary v-if="loadSummary" @closeDetail="closeDetail" @loadSuccess="loadSuccess" :params="mobile"/>
    <OrderSummaryHotel v-if="loadSummaryHotel" @closeDetail="closeDetail" @loadSuccess="loadSuccess" :params="mobile"/>
  </div>
</template>
<script>
import Queryform from './Queryform';
import OrderSummary from './OrderSummary'
import OrderSummaryHotel from './OrderSummaryHotel'

export default {
  name: 'QueryOrderSummary',
  components:{
    Queryform,
    OrderSummary,
    OrderSummaryHotel
  },
  data(){
    return{
      tripType:null,
      mobile:null,
      showSearch: true,
      detailCloseMsg:'',
      loadSummary:false,
      loadSummaryHotel:false,
    }
  },
  methods:{
    getSeachParams(load, type){
      this.mobile = load;
      if(type == 1){
        this.loadSummary = true;
        this.loadSummaryHotel = false;
      }else{
        this.loadSummary = false;
        this.loadSummaryHotel = true;
      }
    },
    closeDetail(type, msg){
      this.showSearch = true;
      this.loadSummary = false;
      this.loadSummaryHotel = false;
      this.detailCloseMsg = msg || '';
      this.tripType = type;
        this.$emit('isShowus',false);
    },
    loadSuccess(){
      this.showSearch = false;

        this.$emit('isShowus',true);
    }
  }
}
</script>
<style lang="less" scoped>

  // .query-order-summary{
  //   background-color: #fff;
  // }
</style>

