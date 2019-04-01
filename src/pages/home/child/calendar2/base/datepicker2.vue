<template>
  <div class="calendar-input-container" :class="[isRed ? 'red-theme' : 'blue-theme']" :style="containerStyle" >
    <label for="calendar-input">
      <input ref="mainInput" v-show="false" class="calendar-input" type="text"
        readonly="readonly" :class="{focus: isfocus}" @click="focus" v-model="selectValue">
    </label>
    <transition name="fade">
      <div id="calendar" v-show="changeShowCalendar">
        <div id="calendar-header">
          <!-- <span class="arrow" :class="{disabled:selectYear==limit.minYear}" @click="subYear">&lt;&lt;</span> -->
          <span
            class="arrow"
            :class="{disabled:selectMonth==limit.minMonth}"
            style="fontSize:80%"
            @click="subMonth"
          >&lt;</span>
          <span id="date-box">{{trueSelectMonths}} {{trueSelectYear}}</span>
          <span
            class="arrow"
            :class="{disabled:selectMonth==limit.maxMonth}"
            style="fontSize:80%"
            @click="addMonth"
          >&gt;</span>
          <!-- <span class="arrow" :class="{disabled:selectYear==limit.maxYear}" @click="addYear">&gt;&gt;</span> -->
        </div>
        <div class="week">
          <span
            v-for="(item, index) in week"
            :key="item.id"
            :class="{weekend: index === 0 || index === 6}"
          >{{item}}</span>
        </div>
        <div class="days">
          <div class="d-div1" v-for="(item, index) in renderData" :key="item.id" @click="changeSelectDay(index)"
            :class="{
              // weekend: index % 7 === 0 || index % 7 === 6,
              unselect: unselectArr.includes(index),
              select: index === firstDayInWeek + trueSelectDay - 1
            }" >
            <p class="d-p1" >{{item}}</p>
            <p class="d-p2" ><span class="rs">Rs</span><span>300</span></p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "calendar-input",
  props: {
    isRed:{
      type: Boolean
    },
    lowPrice:{
      type: Array
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
    }
  },
  data() {
    return {
      isfocus: true,
      changeShowCalendar: this.showCalendar,
      week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      date: new Date(),
      selectYear: this.limit.minYear,
      selectMonth: this.limit.minMonth,
      // selectDay: new Date().getDate(),
      selectDay: this.limit.minDay
    };
  },
  methods: {
    focus() {
      this.isfocus = !this.isfocus;
      this.changeShowCalendar = !this.changeShowCalendar;
    },
    subYear() {
      if (this.selectYear == this.limit.minYear) {
        this.selectYear = this.limit.minYear;
      } else {
        this.selectYear--;
      }
    },
    addYear() {
      if (this.selectYear == this.limit.maxYear) {
        this.selectYear = this.limit.maxYear;
      } else {
        this.selectYear++;
      }
    },
    subMonth() {
      if (this.selectMonth === 1) {
        this.selectMonth = 12;
        this.selectYear -= 1;
      } else {
        this.selectMonth -= 1;
      }
      if (this.selectYear < this.limit.minYear)
        this.selectYear = this.limit.minYear;
      if (this.selectYear === this.limit.minYear) {
        if (this.selectMonth <= this.limit.minMonth) {
          this.selectMonth = this.limit.minMonth;
        }
      }
    },
    addMonth() {
      if (this.selectMonth === 12) {
        this.selectMonth = 1;
        this.selectYear += 1;
      } else {
        this.selectMonth += 1;
      }
      if (this.selectYear > this.limit.maxYear)
        this.selectYear = this.limit.maxYear;
      if (this.selectYear === this.limit.maxYear) {
        if (this.selectMonth >= this.limit.maxMonth) {
          this.selectMonth = this.limit.maxMonth;
        }
      }
    },
    changeSelectDay(index) {
      if (this.unselectArr.includes(index)) return false;
      this.selectDay = index - this.firstDayInWeek + 1;
    }
  },
  computed: {
    trueSelectYear: function() {
      if (this.selectYear < this.limit.minYear) return this.limit.minYear;
      if (this.selectYear > this.limit.maxYear) return this.limit.maxYear;
      return this.selectYear;
    },
    trueSelectMonth: function() {
      if (
        this.selectYear === this.limit.minYear &&
        this.selectMonth < this.limit.minMonth
      )
        return this.limit.minMonth;
      if (
        this.selectYear === this.limit.maxYear &&
        this.selectMonth > this.limit.maxMonth
      )
        return this.limit.maxMonth;
      return this.selectMonth;
    },
    trueSelectDay: function() {
      if (
        this.selectYear === this.limit.minYear &&
        this.selectMonth === this.limit.minMonth &&
        this.selectDay < this.limit.minDay
      )
        return this.limit.minDay;
      if (
        this.selectYear === this.limit.maxYear &&
        this.selectMonth === this.limit.maxMonth &&
        this.selectDay > this.limit.maxDay
      )
        return this.limit.maxDay;
      return this.selectDay;
    },
    selectValue: function() {
      return `${this.trueSelectYear}-${this.trueSelectMonth}-${
        this.trueSelectDay
      }`;
    },
    firstDayInWeek: function() {
      return new Date(
        this.trueSelectYear,
        this.trueSelectMonth - 1,
        1
      ).getDay();
    },
    lastDayInWeek: function() {
      return this.firstDayInWeek + this.dayCount;
    },
    dayCount: function() {
      var n = new Date(this.trueSelectYear, this.trueSelectMonth, 0).getDate();
      this.dCount = n;
      return n;
    },
    lastMonthDay: function() {
      let lastNum = this.firstDayInWeek;
      let lastDays = [];
      if (lastNum === 0) return lastDays;

      let i = 0;
      let lastDayNum = new Date(
        this.trueSelectYear,
        this.trueSelectMonth - 1,
        0
      ).getDate();
      for (; i < lastNum; i++) {
        lastDays.unshift(lastDayNum);
        lastDayNum--;
      }
      return lastDays;
    },
    nextMonthDay: function() {
      let num = 42 - this.firstDayInWeek - this.dayCount;
      let nextDays = [];
      if (num === 0) return nextDays;

      let i = 1;
      for (; i <= num; i++) {
        nextDays.push(i);
      }
      return nextDays;
    },
    renderData: function() {
      let nowDays = [];
      let i = 1;
      for (; i <= this.dayCount; i++) {
        nowDays.push(i);
      }
      return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];
    },
    unselectArr: function() {
      let index = 0;
      let arr = [];

      if (
        this.trueSelectYear === this.limit.minYear &&
        this.trueSelectMonth === this.limit.minMonth
      ) {
        for (; index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
          arr.push(index);
        }
        //                } else {
        //                    for (; index < this.firstDayInWeek; index++) {
        //                        arr.push(index)
        //                    }
      }

      if (
        this.trueSelectYear === this.limit.maxYear &&
        this.trueSelectMonth === this.limit.maxMonth
      ) {
        index = this.firstDayInWeek + this.limit.maxDay;
        for (; index < 42; index++) {
          arr.push(index);
        }
        //                } else {
        //                    index = this.firstDayInWeek + this.dayCount;
        //                    for (; index < 42; index++) {
        //                        arr.push(index);
        //                    }
      }
      return arr;
    },
    trueSelectMonths() {
      switch (this.trueSelectMonth) {
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
    }
  },
  watch: {
    selectValue: function(newVal) {
      this.$emit("getValue", newVal);
    }
  },
  mounted() {
    this.$emit("getValue", this.selectValue);
  }
};
</script>

<style lang="less" scoped>
.disabled {
  color: #ccc !important;
}

.calendar-input-container {
  display: inline-block;
  text-align: center;
  font-family: SimHei;
  width: 100%;
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
  border: 1px solid #ccc;
  border-radius: 4%;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
}

.calendar-input-container #calendar {
  width: 100%;
  // height: 280px;
  padding:0.5rem 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  // border-radius: 2%;
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
  line-height: 32px;
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
  // height: 12.5%;
  width: 100%;
}

.calendar-input-container #calendar span {
  height: 100%;
  width: 14.2857%;
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
}

.calendar-input-container #calendar #calendar-header,
.calendar-input-container #calendar #calendar-header span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.calendar-input-container #calendar #calendar-header #date-box {
  -webkit-box-flex: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
}

.calendar-input-container #calendar .week {
  box-sizing: border-box;
  padding:0.5rem 5px;
  font-size: 18px;
}

.calendar-input-container #calendar .week span {
  height: 100%;
}

.calendar-input-container #calendar .days .d-div1{
  box-sizing: border-box;
  display: inline-block;
  width: 14.2%;
  margin-bottom: 0.5rem;
  cursor: pointer;
  padding:0.3rem 0;
  p{
    width:100%;
    text-align: center;
    span{
      width:auto;
      color:#ccc;
      line-height:1;
    }
  }
  .d-p1{
    font-size: 0.769rem;
    line-height:20px;
  }
  .d-p2{
    font-size: 0.427rem;
    line-height: 14px;
    span:first-child{vertical-align: 2%;}
    span:last-child{
      max-width:1.3rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.calendar-input-container #calendar .days span {
  height: 16.666667%;
  cursor: pointer;
  /*-webkit-transition: all .5s;*/
  /*transition: all .5s*/
}

.calendar-input-container #calendar .days .unselect {
  cursor: default;
}

.blue-theme .focus {
  border-color: #ffad3d;
  box-shadow: 0 0 5px #ffad3d;
}

.blue-theme .arrow {
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

.blue-theme #calendar .days .select,
.blue-theme #calendar .days .select:hover {
  // border-radius: 2px;
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
