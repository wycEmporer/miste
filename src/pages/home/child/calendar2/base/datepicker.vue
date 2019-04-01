<template>
  <div class="calendar-input-container" :class="[isRed ? 'red-theme' : 'blue-theme']" :style="containerStyle">
    <div id="calendar" class="midCalendar" v-for="(item, index) in dateTable" :key="index">
      <div id="calendar-header">
        <span id="date-box">{{trueSelectMonth(Number(item.selectMonth))}} {{item.selectYear}}</span>
      </div>
      <div class="week">
        <span v-for="(item1, index1) in week" :key="item1.id" :class="{weekend: index1 === 0 || index1 === 6}">{{item1}}</span>
      </div>
      <div class="days" v-if="lowestPrice.length < 1 && lowPrice.length < 1 ">
        <div class="d-div1" v-for="(item2, index2) in renderData(item.selectYear, item.selectMonth, item)" :key="item2.id" @click="changeSelectDay(item, index, item2, item.selectYear, item.selectMonth, index2)"
        :class="{
          //Su: index2 % 7 === 0,
          //lowestPrice: item2 != '-' && lowestPrice[0][item.selectYear+'-'+item.selectMonth+'-'+item2],
          //weekend: index % 7 === 0 || index % 7 === 6, 
          unselect: unselectArr(item.selectYear, item.selectMonth, item).includes(index2) || item2 === '-' || (index == 12 && (item2 != '-'?item2 - nowDay >0:true)),
          select: index2 === firstDayInWeek(item) + item.selectDay - 1 && item2 !== '-'
        }">
          <p class="d-p1" :class="{'d-hide': item2 === '-'}">{{item2}}</p>
          <p class="d-p2" :class="{'d-hide': item2 === '-'}"><span>-</span></p>
        </div>
      </div>
      <div class="days" v-else >
        <div class="d-div1" v-for="(item2, index2) in renderData(item.selectYear, item.selectMonth, item)" :key="item2.id" @click="changeSelectDay(item, index, item2, item.selectYear, item.selectMonth, index2)"
        :class="{
          //Su: index2 % 7 === 0,
          lowestPrice: item2 != '-' && lowestPrice[0][item.selectYear+'-'+((item.selectMonth - 9) > 0? item.selectMonth:'0'+item.selectMonth)+'-'+item2],
          //weekend: index % 7 === 0 || index % 7 === 6, 
          unselect: unselectArr(item.selectYear, item.selectMonth, item).includes(index2) || item2 === '-' || (index == 12 && (item2 != '-'?item2 - nowDay >0:true)),
          select: index2 === firstDayInWeek(item) + item.selectDay - 1 && item2 !== '-' 
        }">
          <p class="d-p1" :class="{'d-hide': item2 === '-'}">{{item2}}</p>
          <p class="d-p2" v-if="lowPrice[0][item.selectYear+'-'+((item.selectMonth - 9) > 0? item.selectMonth:'0'+item.selectMonth)+'-'+item2]" :class="{'d-hide': item2 === '-'}"><span class="rs">Rs</span><span>
            {{lowPrice[0][item.selectYear+'-'+((item.selectMonth - 9) > 0? item.selectMonth:'0'+item.selectMonth)+'-'+item2]}}</span></p>
          <p class="d-p2" v-else :class="{'d-hide': item2 === '-'}"><span>-</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "calendar-input",
  props: {
    isRed: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Object,
      default() {
        return {
          minYear: 1900,
          minMonth: 1,
          minDay: 1,
          maxYear: 2030,
          maxMonth: 3,
          maxDay: 20
        };
      }
    },
    showCalendar: {
      type: Boolean,
      default: true
    },
    containerStyle: {
      type: Object
    },
    lowPrice:{
      type: Array
    },
    lowestPrice:{
      type: Array
    },
    isSelected:{}
  },
  data() {
    return {
      index: 0,
      isfocus: true,
      nowDay:new Date().getDate(),
      changeShowCalendar: this.showCalendar,
      week: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      dateTable:[
        {id:0,selectMonth: this.limit.minMonth,selectYear: this.limit.minYear, selectDay: this.limit.minDay},
        {id:1,selectMonth: this.limit.minMonth == 12?'0'+1:(this.limit.minMonth+1 > 12?this.limit.minMonth -11:this.limit.minMonth+1),selectYear: this.limit.minMonth +1 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:2,selectMonth: this.limit.minMonth == 12?'0'+2:(this.limit.minMonth+2 > 12?this.limit.minMonth -10:this.limit.minMonth+2),selectYear: this.limit.minMonth +2 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:3,selectMonth: this.limit.minMonth == 12?'0'+3:(this.limit.minMonth+3 > 12?this.limit.minMonth -9:this.limit.minMonth+3),selectYear: this.limit.minMonth +3 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:4,selectMonth: this.limit.minMonth == 12?'0'+4:(this.limit.minMonth+4 > 12?this.limit.minMonth -8:this.limit.minMonth+4),selectYear: this.limit.minMonth +4 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:5,selectMonth: this.limit.minMonth == 12?'0'+5:(this.limit.minMonth+5 > 12?this.limit.minMonth -7:this.limit.minMonth+5),selectYear: this.limit.minMonth +5 >12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:6,selectMonth: this.limit.minMonth == 12?'0'+6:(this.limit.minMonth+6 > 12?this.limit.minMonth -6:this.limit.minMonth+6),selectYear: this.limit.minMonth +6 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:7,selectMonth: this.limit.minMonth == 12?'0'+7:(this.limit.minMonth+7 > 12?this.limit.minMonth -5:this.limit.minMonth+7),selectYear: this.limit.minMonth +7 >12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:8,selectMonth: this.limit.minMonth == 12?'0'+8:(this.limit.minMonth+8 > 12?this.limit.minMonth -4:this.limit.minMonth+8),selectYear: this.limit.minMonth +8 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:9,selectMonth: this.limit.minMonth == 12?'0'+9:(this.limit.minMonth+9 > 12?this.limit.minMonth -3:this.limit.minMonth+9),selectYear: this.limit.minMonth +9 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:10,selectMonth: this.limit.minMonth == 12?10:(this.limit.minMonth+10 > 12?this.limit.minMonth -2:this.limit.minMonth+10),selectYear: this.limit.minMonth +10 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:11,selectMonth: this.limit.minMonth == 12?11:(this.limit.minMonth+11 > 12?this.limit.minMonth -1:this.limit.minMonth+11),selectYear: this.limit.minMonth+11 > 12?this.limit.minYear+1:this.limit.minYear, selectDay:null},
        {id:12,selectMonth: this.limit.minMonth, selectYear: this.limit.minYear+1, selectDay:null}
      ],
      selectValue:this.limit.minYear+'-'+this.limit.minMonth+'-'+this.limit.minDay,
    };
  },
  methods: {
    focus() {
      this.isfocus = !this.isfocus;
      this.changeShowCalendar = !this.changeShowCalendar;
    },
    unselectArr(y, m, item) {
      let index = 0;
      let arr = [];
      if (y === this.limit.minYear && m === this.limit.minMonth ) {
        for (; index < this.firstDayInWeek(item) + this.limit.minDay - 1; index++) {
          arr.push(index);
        }
      }
      return arr;
    },
    changeSelectDay(item, index, item2, y, m,index2) {
      let type = sessionStorage.getItem("flightType");
      // if(type == "two"){
      //   this.index = index2;
      //     if (this.unselectArr(item.selectYear, item.selectMonth, item).includes(index2) ){
      //       return false;
      //     }
      //     this.dateTable.forEach((e,i)=>{
      //       e.selectDay = null;
      //     });
      //     item.selectDay = index2 - this.firstDayInWeek(item) + 1;
      //     this.selectValue = `${item.selectYear}-${item.selectMonth}-${item.selectDay}`;
      // }else{
        if(item2 != '-' && index2 ){
          if((index == 12 && !(item2 != '-'?item2 - this.nowDay <=0:true))){
            return false;
          }else{
            this.index = index2;
            if (this.unselectArr(item.selectYear, item.selectMonth, item).includes(index2) ){
              return false;
            }
            this.dateTable.forEach((e,i)=>{
              e.selectDay = null;
            });
            item.selectDay = index2 - this.firstDayInWeek(item) + 1;
            this.selectValue = `${item.selectYear}-${item.selectMonth}-${item.selectDay}`;
          }
        }else{
          return false;
        }
      // }
    },
    dayCount(y, m) { // get the days for a month
      var n = new Date(y, m, 0).getDate();
      this.dCount = n;
      return n;
    },
    lastMonthDay(y, m, item) {
      let lastNum = this.firstDayInWeek(item);
      let lastDays = [];
      if (lastNum === 0){
        return lastDays;
      }
      let i = 0;
      let lastDayNum = new Date(y, m - 1, 0).getDate();
      for (; i < lastNum; i++) { // insert element in the top of a array, and return the new length 
        lastDays.unshift(lastDayNum);
        lastDayNum--;
      }
      return lastDays;
    },
    nextMonthDay(y, m, item) {
      let num = 42 - this.firstDayInWeek(item) - this.dayCount(y, m);
      let nextDays = [];
      if (num === 0) return nextDays;
      let i = 1;
      for (; i <= num; i++) {
        nextDays.push(i);
      }
      return nextDays;
    },
    firstDayInWeek(item) {
      return new Date( item.selectYear, item.selectMonth - 1, 1 ).getDay();
    },
    lastDayInWeek(item) {
      return this.firstDayInWeek(item) + this.dayCount(Number(item.selectYear), Number(item.selectYear));
    },
    renderData(y, m, item) { // render every month`s days
      let nowDays = [], last = [], next = [];
      for(let i = 0; i <= this.lastMonthDay(y, m, item).length - 1; i++){
        last[i] = "-";
      }
      for(let i = 0; i <= this.nextMonthDay(y, m, item).length - 1; i++){
        next[i] = "-";
      }
      let i = 1;
      
      for (; i <= this.dayCount(y, m); i++) {
        nowDays.push(i<=9?'0'+i:i);
      }
      return [...last, ...nowDays, ...next];
    },
    trueSelectMonth(m) {
      switch (m) {
        case 1:
          return "January";
          break;
        case 2:
          return "February";
          break;
        case 3:
          return "March";
          break;
        case 4:
          return "April";
          break;
        case 5:
          return "May";
          break;
        case 6:
          return "June";
          break;
        case 7:
          return "July";
          break;
        case 8:
          return "August";
          break;
        case 9:
          return "September";
          break;
        case 10:
          return "October";
          break;
        case 11:
          return "November";
          break;
        case 12:
          return "December";
          break;
      }
    },
  },
  watch: {
    selectValue(newVal) {
      this.$emit("getValue", newVal);
    }
  },
  mounted () {
    this.dateTable[0].selectDay = this.limit.minDay;
    this.selectValue = this.limit.minYear+'-'+this.limit.minMonth+'-'+this.limit.minDay;
  },
};
</script>
<style lang="less" scoped>
.disabled {
  color: #ccc !important;
}

.calendar-input-container {
  text-align: center;
  font-family: SimHei;
  width: 100%;
  padding:1px 0;
  height:100%;
	overflow-x:scroll;
}

.calendar-input-container .fade-enter-active,
.calendar-input-container .fade-leave-active {
  -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
}

.calendar-input-container .fade-enter,
.calendar-input-container .fade-leave-active {
  opacity: 0;
}

.calendar-input-container .calendar-input {
  box-sizing: border-box;
  width: 200px;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  border-top: 1px solid #ccc;
  border-radius: 4%;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
}

.calendar-input-container #calendar {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
}

.calendar-input-container #calendar div,
.calendar-input-container #calendar span {
  /*display: -webkit-box;*/
  /*display: -ms-flexbox;*/
  /*display: flex;*/
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  // line-height: 32px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.calendar-input-container #calendar div {
  width: 100%;
  padding:0.15rem 0;
}

.calendar-input-container #calendar span {
  width: 14%;
  height: 100%;
}

.calendar-input-container #calendar #calendar-header {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #eee;
}

.calendar-input-container #calendar #calendar-header,
.calendar-input-container #calendar #calendar-header span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: flex-start;
}

.calendar-input-container #calendar #calendar-header #date-box {
  -webkit-box-flex: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  padding:0 0.64rem;
  text-align: left;
}

.calendar-input-container #calendar .week {
  width:auto;
  box-sizing: border-box;
  font-size: 16px;
  padding:0.3rem 0;
  border-bottom:1px solid #eee;
  span{
    width: 14%;
  }
}

.calendar-input-container #calendar .week span {
  height: 100%;
}

.calendar-input-container #calendar .days {
  box-sizing: border-box;
  font-size: 14px;
  padding:0 0 1px;
}

.calendar-input-container #calendar .days .d-div1 {
  display: inline-block;
  width: 13.9%;
  cursor: pointer;
  border-bottom:1px solid #eee;
  border-right:1px solid #eee;
  p{
    width:100%;
    text-align: center;
    span{
      width:auto;
      color:#ccc;
    }
  }
  .d-hide{
    opacity: 0;
  }
  .d-p1{
    font-size: 16px;
    line-height:18px;
  }
  .d-p2{
    line-height: 14px;
  }
}
.calendar-input-container #calendar .days .Su{
  border-left:1px solid #eee;
}
.calendar-input-container #calendar .days .unselect {
  cursor: default;
}

.calendar-input-container #calendar .days .lowestPrice{
  .d-p2{
    span{
      color:#ffad3d;
    }
  }
}

.blue-theme .focus { // top search input
  border-color: #ffad3d;
  box-shadow: 0 0 5px #ffad3d;
}

.blue-theme .arrow { // header arrow
  cursor: pointer;
  /* color: #2f80c3; */
  color: #ffad3d;
  /*-webkit-transition: color .5s;*/
  /*transition: color .5s*/
}

.blue-theme .arrow:hover {
  color: #ffad3d;
}

.blue-theme .weekend {
  color: #ffad3d;
}

.blue-theme #calendar .days .d-div1:hover {
  border-radius: 2px;
  background-color: #CEECE4;
  color: #0b9d78;
  span{
    color: #0b9d78;
  }
}

.blue-theme #calendar .days .unselect,
.blue-theme #calendar .days .unselect:hover {
  border-radius: 0;
  background-color: #fff;
  color: #ccc;
  span{color:#ccc;}
}
.blue-theme #calendar .days .unselect{
  span{color:#ccc !important;}
}
.blue-theme #calendar .days .select,
.blue-theme #calendar .days .select:hover {
  border-radius: 2px;
  /* background-color: #2f80c3; */
  background-color: #CEECE4;
  color: #0b9d78;
  p{
    span{
      color: #0b9d78;
    }
  }
}

.blue-theme .days .isHide {
  -webkit-transition: all 0s;
  transition: all 0s;
  visibility: hidden;
}

.red-theme #calendar-header {
  color: #fff;
  background-color: #cb1b01;
}

.red-theme .focus {
  border-color: #ccc;
  box-shadow: 0 0 5px #ccc;
}

.red-theme .arrow {
  cursor: pointer;
}

.red-theme .weekend {
  color: #cb1b01;
}

.red-theme .days {
  color: #888;
}

.red-theme .days span:hover {
  border-radius: 2px;
  background-color: red;
  color: #fff;
}

.red-theme .days .unselect,
.red-theme .days .unselect:hover {
  border-radius: 0;
  background-color: #fff;
  color: #ccc;
}

.red-theme .days .select,
.red-theme .days .select:hover {
  border-radius: 2px;
  background-color: #cb1b01;
  color: #fff;
}
</style>
