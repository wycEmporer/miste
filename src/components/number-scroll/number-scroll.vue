<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
 </div>
</template>
<script>
export default {
 props: {
  time: {
   type: Number,
   default:2
  },
  value: {
   type: Number,
   default:0
  }
 },
 data(){
   return {
     values:0
   }
 },
 watch: {
  value(val){
    if(val > 0){
      this.values = val;
      this.numberGrow(this.$refs.numberGrow)
    }
  }
 },
 methods: {
  numberGrow (ele) {
   let step = parseInt((this.values * 10) / (this.time * 1000))
   let current = 0
   let start = 0
   let t = setInterval(() =>{
    start += step
    if (start > this.values) {
     clearInterval(t)
     start = this.values
     t = null
    }
    if(start == 0){
      start = this.values;
      clearInterval(t)
    }
    if (current === start) {
     return
    }
    current = start
    ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
   }, 10)
  }
 },
}
</script>
<style scoped>
.number-grow-warp{
 transform: translateZ(0);
}
.number-grow {
  display: block;
}
</style>