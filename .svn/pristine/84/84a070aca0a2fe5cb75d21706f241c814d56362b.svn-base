<template>
  <div id="flight-top">
    <div class="top-select clear1" v-show="showTopPart">
      <div class="select-icon" @click="showCanlanderTable">
        <!-- <p v-text="selectMonth"></p> -->
        <img :src="require('../../../assets/images/ticketlist/icon_calendar.png')" alt="">
      </div>
      <ul class="select-date flex" id="s3Box" ref="s3Box" @touchmove='touchMove'>
        <li class="flex" v-for="(item, index) in months" :key="index">
          <!-- <div class="select-icon" v-if="isHasNextMonth && isTheFirstDay"> -->
          <div class="select-icon select-icon1" v-if="item.next" @click="showCanlanderTable">
            <p>{{monthCode[item.month-1]}}</p>
            <img :src="require('../../../assets/images/ticketlist/icon_calendar.png')" alt="">
          </div>
          <div class="date-div" :class="{'li-active':item.flag}" @click="reSearchFlight(item, index)">
            <div class="date-box">
              <p>{{item.day}},{{item.week}}</p>
              <p ><span class="rs" :class="{'p-lowest':item.lowest}" v-if="item.price != '-' ">Rs</span><span :class="{'p-lowest':item.lowest}">{{item.price}}</span></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { DomainManager } from 'config/DomainManager';
export default {
  props:["lowest","lowPrice","departDate","showTopPart"],
  data(){
    return {
      index:0,
      loadNum:0,
      haslowest:[],
      haslowPrice:[],
      selectedIndex:0,
      index:0,
      preMonths:[],
      months:[],
      selectMonth:'',
      isTheFirstDay:false,
      isHasNextMonth:false,
      week: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthCode:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      switchMonth:0,
      switchMonth1:0,
      switchMonth2:0,
      selectValue:'',
      searchInfo:{},
      isiOS:false,
    }
  },
  methods:{
    showCanlanderTable(){
      this.$emit("openPickerFrom");
    },
    getLowestPrice(item){
      let arr = [], index, obj={};
      for(let key in item){
        arr.push(Number(item[key]));
      }
      let key = Math.min.apply(null, arr);
      for(let k in item){
        if(item[k] == String(key)){
          index = k
          obj[index] = key;
        }
      }
      return obj;
    },
    reSearchFlight(who, index){
      this.selectValue = who;
      this.months.forEach((e, i)=>{
        if(index === i){
          e.flag = true;
          this.$emit('reSearchFlight',who.year+'-'+who.month+'-'+who.day);
        }else{
          e.flag = false;
        }
      });
      this.selectMonth = this.monthCode[who.month-1];
    },
    showDateSelect1(time, index){
      let date = time;
      let today = date.getDate();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let days = new Date(year, month, 0).getDate();
      let gap = days - today;
      let nextArr = [];
      if(gap >= 15){ 
        for(let i = today+1; i<= today + 15;i++){
          let week = this.isiOS? new Date(year+'/'+month+'/'+(i)).getDay() : new Date(year+'-'+month+'-'+(i)).getDay();
          this.months.push({
            year: year,
            month: month<=9?'0'+month:month,
            day: i<=9?'0'+i:i,
            week: this.week[week],
            flag: false,
            next: i == 1?true:false,
            price:'-',
            lowest:false,
          });
        }
      }else{ // 跨月
        if(gap != 0){
          for(let i = today+1; i<= days;i++){
            let week = this.isiOS? new Date(year+'/'+month+'/'+(i)).getDay() : new Date(year+'-'+month+'-'+(i)).getDay();
            this.months.push({
              year: year,
              month: month<=9?'0'+month:month,
              day: i<=9?'0'+i:i,
              week: this.week[week],
              flag: false,
              price:'-',
              lowest:false,
              next: i == 1?true:false,
            });
          }
        }
        for(let i = 1; i<= 15-gap;i++){
          let week = this.isiOS? new Date((month == 12?year+1:year)+'/'+(month==12?1:month+1)+'/'+i).getDay() :
            new Date((month == 12?year+1:year)+'-'+(month==12?1:month+1)+'-'+i).getDay();
          this.months.push({
            year: month >= 12?year+1:year,
            month: month>=12?'0'+1:(month<=9?'0'+(month+1):month+1),
            day: i<=9?'0'+i:i,
            week: this.week[week],
            flag: false,
            price:'-',
            lowest:false,
            next: i == 1?true:false,
          });
        }
      }
      if(index){
        let date2 = this.getDateParams(new Date(time));
        let week2 = this.isiOS? new Date(date2.year+'/'+date2.month+'/'+(date2.day)).getDay() : 
          new Date(date2.year+'-'+date2.month+'-'+(date2.day)).getDay();
        this.months.unshift({
          year: date2.year,
          month: date2.month<=9?'0'+date2.month:date2.month,
          day: date2.day<=9?'0'+date2.day:date2.day,
          week: this.week[week2],
          flag: false,
          price:'-',
          lowest:false,
          next: date2.day == 1?true:false,
        });
      }
      this.computedLowestPrice();
    },
    computedLowestPrice(){
      // computed the lowest value of every month
      this.months.forEach((e, i)=>{
        this.$set(e, "lowest", false);
        let name = e.year+'-'+e.month+'-'+e.day;
        for(const key in this.haslowPrice[0]){
          if(name == key){
            e.price = this.haslowPrice[0][key];
          }
        }
        this.haslowest.forEach((e2, i2)=>{
          let lowestKey = this.getLowestPrice(e2);
          for(const kk in lowestKey){
            if(name == kk){
              this.$set(e, "lowest", true);
            }
          }
        })
      })
    },
    selectPreDays(today, month, year){
      // let arr = [], curGap;
      // let days = new Date(year, month, 0).getDate();
      // let curYear = new Date().getFullYear();
      // let curDate = new Date().getDate();
      // let curMonth = new Date().getMonth() + 1;

      // if(today == 1 || today <= 15){//  跨月
      //   curGap = 15 - today;
      //   let arr2 = [], index = 0;
      //   for(let i = 1;i< today;i++){ // 选择日期前的当月天数
      //     let week = new Date((month == 1?year - 1:year)+'-'+(month == 1?12:month -1)+'-'+(i)).getDay();
      //     arr2.push({
      //       id:i - today -1,
      //       year: month == 1?year - 1:year,
      //       month: month == 1?12:month -1,
      //       day: i,
      //       week: this.week[week],
      //       flag: false,
      //       next: i == 1 ?true:false
      //     });
      //   }
      //   for(let i = days - curGap; i<= days;i++){// 选择日期上个月的天数
      //     index++;
      //     let week = new Date((month == 1?year - 1:year)+'-'+(month == 1?12:month -1)+'-'+(i)).getDay();
      //     arr.push({
      //       id: index - 15 -1,
      //       year: month == 1?year - 1:year,
      //       month: month == 1?12:month -1,
      //       day: i,
      //       week: this.week[week],
      //       flag: false,
      //       next: i == 1 ?true:false
      //     });
      //   }
      //   if(arr2.length == 0){
      //     return arr;
      //   }else{
      //     arr.concat(arr2);
      //     return arr.concat(arr2);;
      //   } 
      // }else{
      //   curGap = today - curDate;
      //   for(let i = 1; i< today;i++){
      //     let week = new Date(year+'-'+month+'-'+(i)).getDay();
      //     arr.push({
      //       id:i - today,
      //       year: year,
      //       month: month,
      //       day: i,
      //       week: this.week[week],
      //       flag: false,
      //       next: i == 1 ?true:false
      //     });
      //   }
      //   if(curGap == 0){
      //     arr = [];
      //   } else{
      //     arr = arr.splice(curDate - today,today);
      //   }
      //   return arr;
      // }
    },
    getFirDayTime(year, month, day){
      let date = new Date(year+'-'+month+'-'+day);
      let today = date.getDate();
      let days = new Date(year, month, 0).getDate();
      let nextMonthFirstDay = days - today + 1;
      return nextMonthFirstDay;
    },
    getDateParams(time, index){
      let date = time;
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      let days = new Date(year, month, 0).getDay();
      return {year :year, month: month,day: day, days:days};
    },
    touchMove(ev) {
      ev = ev || event;
      if (ev.touches.length == 1) {
        let lastChild = this.months[this.months.length -1];
        let time = this.isiOS? new Date(lastChild.year+'/'+lastChild.month+'/'+lastChild.day) : 
          new Date(lastChild.year+'-'+lastChild.month+'-'+lastChild.day);
        let width = this.months.length * 100;
        let sLeft = this.$refs.s3Box.scrollLeft;
        let dis = width - sLeft;

        if(dis <= 200 && this.months.length < 350){
          this.index++;
          this.showDateSelect1(time);
        }
      }
    },
    transformObj(param){
      let dt = new Date(param);
      let obj = {
        year:dt.getFullYear(),
        month:dt.getMonth()+1>9?dt.getMonth()+1:"0"+(dt.getMonth()+1),
        day:dt.getDate()>9?dt.getDate():"0"+dt.getDate(),
        days:new Date(dt.getFullYear(), dt.getMonth()+1, 0).getDay()
      }
      return obj;
    }
  },
  created() {
    var u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.showDateSelect1(new Date(), 1);
  },
  mounted() {
    this.searchInfo = JSON.parse(sessionStorage.getItem("searchInfo"));
    this.selectValue = this.transformObj(this.searchInfo.departDate);
  },
  watch:{
    lowest(val){
      if(val){
        this.haslowest = val;
      } 
    },
    lowPrice(val){
      // this.index++;
      if(val) {
        this.haslowPrice = val;
        // if(this.index <=1){
          // this.showDateSelect1(new Date(), 1);
        // }
        this.computedLowestPrice();
      }
    },
    departDate(val){
      this.selectValue = this.transformObj(val);
    },
    months(val){
      let lastChild = this.months[this.months.length -1];
      let time = this.isiOS?new Date(lastChild.year+'/'+lastChild.month+'/'+lastChild.day)
        : new Date(lastChild.year+'-'+lastChild.month+'-'+lastChild.day);
      val.forEach((e, i)=>{
        if(e.year == this.selectValue.year && e.month == this.selectValue.month && e.day == this.selectValue.day ){
          this.loadNum = 1;
        }
      })
      if(this.loadNum != 1){
        this.showDateSelect1(time);
      }
    },
    selectValue(val){
      this.months.forEach((e, i)=>{
        if(val.year == e.year && val.month == e.month && val.day == e.day){
          e.flag = true;
          if(i <= 1){
            i = 0;
          }else{
            i = i -1;
          }
          this.selectedIndex = i;
          this.$refs.s3Box.scrollLeft = 112 * this.selectedIndex;
          // console.log(this.index, i, this.$refs.s3Box.scrollLeft);
        }else{
          e.flag = false;
        }
      });
    },
  }
}
</script>
<style lang="less" scoped>
#flight-top{
  ul,li{list-style-type: none;}
  .top-select{
    position: relative;
    padding-left:1.4rem;
    .select-icon{
      position: fixed;
      left: 0;
      font-size: 0.512rem;
      color:#15a07d;
      background: #fff;
      padding:0.534rem 0.21rem 0.19rem;
      border-top:2px solid transparent;
      img{
        width:0.769rem;
        height:0.854rem;
        margin-top: 0.15rem;
        vertical-align:top;
      }
    }
    .select-date{
      overflow-x:scroll;
      li{
        background: #E6F4EF;
        .select-icon1{
          position: relative;
          height:1.55rem;
        }
        .date-div{
          padding:0.2rem 0;
          border-bottom:2px solid transparent;
          .date-box{
            border-right:1px solid #A1D8C9;
            padding:0.334rem 1.35rem 0.12rem;
            p{
              font-size: 0.64rem;
              color:#111;
              min-width: 1rem;
              display: flex;
              justify-content: center;
              span{
                font-size: 0.47rem;
              }
              span:first-child{
                margin-right: 0.1rem !important;
              }
              .p-lowest{color: #ffad3d;}
            }
            p:last-child{margin-top:0.21rem;}
          }
        }
        .li-active{
          border-bottom:2px solid #14A07D;
          .date-box p{
            color:#14A07D;
            font-weight: bold;
          }
        }
      }
      li:last-child .date-box{border:0;}
    }
  }
}
</style>
