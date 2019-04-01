export class TimeFormatUtil {
  static getDurationDescription(flight) {
    let duartionMin = flight.getDurationInMinute();

    let day = Math.floor(duartionMin / (24 * 60));
    let minuteLeft = Math.floor(duartionMin % (24 * 60));
    let hour = Math.floor(minuteLeft / 60);
    let minute = Math.floor(minuteLeft % 60);
    let des = day == 0 ? "" : day + "d ";
    des += hour + "h ";
    des += minute + "m";
    return des;
  }

  static getDisplayHourAndMinute(date) {
    let h = date.getHours().toString();
    h = h.length == 1 ? "0".concat(h) : h;

    let m = date.getMinutes().toString();
    m = m.length == 1 ? "0".concat(m) : m;

    return h + ":" + m;
  }
  static transferHourAndMinute(s){
    s = s < 0 ? 0 : s;
    let hour = Math.floor(s / 3600);
    hour = hour > 0 ? (hour + 100).toString().slice(1) + " : " : '';
    let min = Math.floor(s / 60) % 60;
    min = (min+100).toString().slice(1) + ' : ';
    let sec = (s%60 + 100).toString().slice(1);
    return hour + min + sec;
  }
  static getYearMonthDateString(date) { 
    if (date == "") {
      return;
    } else {
      let y = String(date.getFullYear());
      let m = String(date.getMonth() + 1);
      let d = String(date.getDate());

      m = m.length == 1 ? "0".concat(m) : m;
      d = d.length == 1 ? "0".concat(d) : d;

      return y + "-" + m + "-" + d;
    }
    // else if (date.indexOf(":")) {
    //   let td = date.split("T")[0];
    //   return (date = new Date(Date.parse(td.replace(/-/g, "/"))));
    // }
  }

  static getYearMonthDateStringSpe(date) {
    if (date == "") {
      return;
    }
    let y = String(date.getFullYear());
    let m = String(date.getMonth() + 1);
    let d = String(date.getDate());

    m = m.length == 1 ? "0".concat(m) : m;
    d = d.length == 1 ? "0".concat(d) : d;

    return d + "-" + m + "-" + y;
  }

  static getYearMonthDateStringSpe2(t, type) { // coupon page use
    if (t == "") {
      return;
    }
    let date = new Date(t);
    let y = String(date.getFullYear());
    let m = String(date.getMonth() + 1);
    let d = String(date.getDate());
    
    m = this.getMonthDescription(m - 1);
    d = d.length == 1 ? "0".concat(d) : d;
    if(type == 1){// no year 
      return d + " " + m;
    }else if(type == 2){
      return d + " " + m + ", " + y;
    }else{
      return m + " " + d + ", " + y;
    }
  }

  static getBookDetailDate(date) {
    let y = String(date.getFullYear());
    let m = this.getMonthDescription(date.getMonth()).replace(/\./g, "");
    let d = String(date.getDate());

    d = d.length == 1 ? "0".concat(d) : d;

    return d + " " + m + " " + y;
  }

  static getOrderDetailDate(date, type) {
    let t = new Date(date);
    let y = t.getFullYear();
    let m = this.getMonthDescription(t.getMonth());
    let d = t.getDate();
    let w = this.getWeekDayDescription(t.getDay());
    if(type){
      return w + ", " + d + " " + m;
    }else{
      return w + "," + d + " " + m + "," + y;
    }
  }
  static getOrderDetailDate2(date) {
    let t = new Date(date);
    let y = t.getFullYear();
    let m = this.getMonthDescription(t.getMonth());
    let d = t.getDate();
    let w = this.getWeekDayDescription(t.getDay());
    return w + "," + d + " " + m + " " + y;
  }

  static getWalletDate(date) {
    let t = new Date(date);
    let y = t.getFullYear();
    let m = this.getMonthDescription(t.getMonth()).replace(/\./g, "");
    let d = t.getDate();
    return d + " " + m + " " + y;
  }
  static dateWithoutYear(date) {
    let t = new Date(date);
    let m = this.getMonthDescription(t.getMonth()).replace(/\./g, "");
    let d = t.getDate();
    return d + " " + m;
  }
  static getWeekDayDescription(dayOfWeek) {
    switch (dayOfWeek) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  }

  static getMonthDescription(monthOfYear) {
    switch (monthOfYear) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
  }
  /**
   *  format Date to object str;
   * @param {*} dateStr 
   * @return {year, month, date, week}
   */
  static formatDatestrToObj(dateStr) {
    if (!dateStr) return;
    const weekArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const obj = {};
    const date = new Date(dateStr);
    obj.year = date.getFullYear();
    obj.month = month[date.getMonth()];
    obj.date = (date.getDate() + 100).toString().slice(1);
    obj.week = weekArray[date.getDay()];
    return obj;
  }
  /**
   * 
   * @param {number} timestamp  
   */
  static getIndiaDateStr(timestamp){
    timestamp = Number(timestamp);
    var d = new Date(timestamp + 900000);
    var offset = d.getTimezoneOffset() * 60000;
    var IndiaTime = d.getTime() + offset + 3600000 * 5.5;
    let dateObj = new Date(IndiaTime);
    return this.getBookDetailDate(dateObj) + ' ' + this.getDisplayHourAndMinute(dateObj);
  }
}
