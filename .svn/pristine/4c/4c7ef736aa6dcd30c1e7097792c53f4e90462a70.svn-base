<template>
  <div id="download-channel">
    <searchCity @getDepartAirport="getDepartAirport" @getArriveAirport="getArriveAirport" @closeS="closeSearch" :showDepart="showDepart" :showSearch="showSearch">
		</searchCity>
    <transition enter-active-class="slideInLeft" leave-active-class="slideOutLeft">
			<calendar :limit='limit' :lowPrice="lowPrice" :lowestPrice="lowestPrice" class="animated" @showHomePage="closeSearch" v-if="showCalendar" @getVal="getDateVal"></calendar>
		</transition>
    <div class="content" v-show="showPageOne">
      <div class="action1" :style="{background:'transparent url('+actionBg.a1bg+') no-repeat center/100% 100.1%'}">
        <div class="a1-top">
          <img :src="require('assets/images/home/app-homelogo.png')" alt="">
        </div>
        <div class="a1-center clear1">
          <img :src="actionBg.topIcon" alt="search cheaper flights" name="" @click="goToHomePage">
        </div>
        <div class="a1-bottom clear1">
          <div class="a1-download-icon">
            <a :href="actionBg.url" @click="emitCustomEvent('DownloadButton', 'social_download_sale')"><img :src="require('assets/images/paydownload/icon_app.png')" alt="" ></a>
            <a :href="actionBg.url" @click="emitCustomEvent('DownloadButton', 'social_download_sale')"><img :src="require('assets/images/paydownload/icon_google.png')" alt=""></a>
          </div>
          <p>Download the app</p>
        </div>
        <div style="height:4.587rem;"></div>
      </div>
      <div class="action2" :style="{background:actionBg.backgroundColor}">
        <div class="a2-title" :class="{'a2-small':smallScreen}">
          <span :class="{'select-span':isOne,'a2-small-p1':smallScreen}" @click="selectOneWay">One Way</span>
          <span :class="{'select-span':isRound,'a2-small-p2':smallScreen}" @click="selectRoundTrip">Round Trip</span>
        </div>
        <div class="a2-selectCity a2-select flex space-between align-items-center">
          <div class="a2-flight a2-depart" >
            <span>From</span>
            <div @click="selectDepartCity"><img :src="require('../../assets/images/paydownload/icon_arr.png')" alt="">{{departAirport.cityName}}</div>
          </div>
          <div class="a2-flight a2-arrive" >
            <span>To</span>
            <div @click="selectArriveCity"><img :src="require('../../assets/images/paydownload/icon_dep.png')" alt="">{{arriveAirport.cityName}}</div>
          </div>
        </div>
        <div class="a2-selectDate a2-select flex space-between align-items-center">
          <div class="a2-flight" :class="{'a2-depart': isRound}">
            <span>Departure</span>
            <div @click="openPickerFrom">
              <img :src="require('../../assets/images/paydownload/icon_date.png')" alt="">{{departTime}}
            </div>
          </div>
          <div class="a2-flight a2-arrive" v-show="isRound">
            <span>Return</span>
            <div @click="openPickerTo">
              <img :src="require('../../assets/images/paydownload/icon_date.png')" alt="">{{returnTime}}
            </div>
          </div>
        </div>
        <button class="a2-search-btn" @click="searchFlight">Search flights</button>
        <div class="a2-guaranted">
          <h6 class="a2-g_title">BEST PRICE GUARANTEED</h6>
          <p>We assure the lowest flight price or refund you 200% of the difference.</p>
        </div>
        <div class="a2-share">
          <h6>Follow US</h6>
          <ul class="share-icon flex space-between">
            <li v-for="(item,index) in shareWebsite" :key="index" @click="adEvent(index)">
              <a :href="item.href" target="_blank">
                <img :src="item.url" alt="">
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="action3" >
        <img :src="actionBg.a3bg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { DomainManager } from "config/DomainManager";
import { Toast, Indicator, Switch } from "mint-ui";
import { emitCustomEvent } from 'models/utils/adGAEvent';
import { First, PremiumEconomy, Business, Economy, CabinClass } from 'models/cabinclass'
export default {
  components:{
    "mt-switch":Switch,
    searchCity: require('pages/home/child/base/searchcity.vue'),
    calendar: () => import('pages/home/child/calendar2/calendar.vue'),
  },
  props:{
    activityname:[String]
  },
  data (){
    return {
      emitCustomEvent,
      smallScreen:false,
      searchInfo:{},
      order:{},
      isOne: true,
      isRound: false,
      showDepart:true,
      showSearch: false,
      showPageOne: true,
      showCalendar: false,
      tripType:0,
      currentTarget: 'DEPART',
      limit: {
				minYear: new Date().getFullYear(),
				minMonth: new Date().getMonth() + 1,
				minDay: new Date().getDate(),
				maxYear: new Date().getFullYear() + 1
      },
      departDate: new Date(),
      returnDate: new Date(),
      lowPrice: [],
      lowestPrice: [],
      departAirport: {
        name: "Chhatrapati Shivaji Int'l Airport", 
        cityName: 'Mumbai', 
        countryName: 'India', 
        countryCode: 'In', 
        iataCode: 'BOM',
        anotherNames:"Chhatrapati Shivaji International Airport , Sahar International Airport , Mumbai International Airport , Bombay International Airport , Chhatrapati Shivaji Intl Airport , Mumbai Airport , Mumbai , Bombay"
      },
      arriveAirport: {
        name: 'Delhi Airport', 
        cityName: 'Delhi', 
        countryName:"India",
        countryCode:"IN",
        iataCode: 'DEL',
        anotherNames:"Delhi Airport , Indira Gandhi International Airport , New Delhi International Airport , IGI Airport , Delhi Airport , Delhi Airport , Delhi , Dilli , New Delhi"
      },
      shareWebsite:[
        {href:'https://www.facebook.com/happyeasygo/',url:require('../../assets/images/anniversarysale/share-f.png')},
        {href:'https://twitter.com/happyeasygo',url:require('../../assets/images/anniversarysale/share-b.png')},
        {href:'https://www.instagram.com/happyeasygo_india/',url:require('../../assets/images/anniversarysale/share-c.png')},
        {href:'https://www.youtube.com/channel/UCBlph2534GSN1PDJH9E5ylg',url:require('../../assets/images/anniversarysale/share-s2.png')},
        {href:'https://plus.google.com/+HappyEasyGoIndia',url:require('../../assets/images/anniversarysale/share-g.png')},
      ],
      actionBg:{
        a1bg:'',
        a3bg:'',
        url:'java:;',
        topIcon:'',
        activityName:'',
        backgroundColor:'',
      },
    }
  },
  computed: {
    departTime: {
      get() {
        let arr = this.departDate.toString().split(" ");
        let arr2 = new Date(this.departDate);
        arr = arr.slice(0, 1).join() + ", " + arr.slice(2, 3).join() + " " + arr.slice(1, 2).join() + ", " + arr.slice(3, 4).join();
        arr2 = arr2.getFullYear() + "-" + arr2.getMonth() + 1 + "-" + arr2.getDate();
        return arr;
      },
      set(arr) {
        this.departDate = arr;
      }
    },
    returnTime: {
      get() {
        let now = this.returnDate
        let arr = now.toString().split(" ");
        let arr2 = new Date(this.returnDate);
        arr = arr.slice(0, 1).join() + ", " + arr.slice(2, 3).join() + " " + arr.slice(1, 2).join() + ", " + arr.slice(3, 4).join();
        arr2 = arr2.getFullYear() + "-" + arr2.getMonth() + 1 + "-" + arr2.getDate();
        return arr;
      },
      set(arr) {
        this.returnDate = arr;
      }
    }
  },
  watch:{
    departDate(val){
      if(val > this.returnDate){
				this.returnDate = val
			}
    },
    isOne(val){
			if(val == false){
				this.lowPrice = [];
				this.lowestPrice = [];
			}else{
				this.getlowPrice("session");
			}
		}
  },
  methods: {
    adEvent(who){
      switch (who) {
        case 0:
          emitCustomEvent("social_link_facebook", "social_download_sale");
          break;
        case 1:
          emitCustomEvent("social_link_twitter", "social_download_sale");
          break;
        case 2:
          emitCustomEvent("social_link_instagram", "social_download_sale");
          break;
        case 3:
          emitCustomEvent("social_link_youtube", "social_download_sale");
          break;
        case 4:
          emitCustomEvent("social_link_google", "social_download_sale");
          break;
      
        default:
          break;
      }
    },
    goToHomePage(){
      emitCustomEvent(this.activityname, "social_download_sale");
      let device = this.browserRedirect();
      if(device){
        this.$router.push('/');
        // window.location.href = "https://m.happyeasygo.com/";
      }else{
        window.location.href = "https://www.happyeasygo.com/";
      }
    },
    getlowPrice(searchStyle){
      this.lowPrice = [];
      this.lowestPrice = [];
			let data;
			if(searchStyle == "selectCity"){
				data = {
					from: this.departAirport.iataCode,
					to: this.arriveAirport.iataCode,
				};
			}else{
				if(sessionStorage.getItem("searchInfo")){
					let info = JSON.parse(sessionStorage.getItem("searchInfo"));
					data = {
						from: info.departAirport.iataCode,
						to: info.arriveAirport.iataCode,
					};
				}else{
					data = {
						from: this.departAirport.iataCode,
						to: this.arriveAirport.iataCode,
					};
				}
			}
			let url = DomainManager.getLowPriceCalendar();
			this.$axios.post(url, data).then(res =>{
				if(res.success){
					let name, obj={};
					for (const key in res.data) {
						let obj2 = {}, obj3;
						for(const key2 in res.data[key]){
							name = key+'-'+key2;
							obj[name] = res.data[key][key2];
							obj2[name] = res.data[key][key2];
						}
						obj3 = this.getLowestPrice(obj2);
						this.lowestPrice.push(obj3);
					}
					this.lowPrice.push(obj);
					let priceKey = {};
					this.lowestPrice.forEach((e, i)=>{
						for(let key in e){
							priceKey[key] = e[key];
						}
					})
					this.lowestPrice = [];
					this.lowestPrice.push(priceKey);
				}else{
					Toast(res.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		getLowestPrice(item){
      let arr = [], index;
      for(let key in item){
        arr.push(Number(item[key]));
			}
			let obj={};
      let key = Math.min.apply(null, arr);
      for(let k in item){
        if(item[k] == String(key)){
					index = k
					obj[index] = key;
        }
      }
			return obj;
    },
    selectOneWay(){
      this.isOne = true;
      this.isRound = false;
      this.tripType = 0;
    },
    selectRoundTrip(){
      this.isOne = false;
      this.isRound = true;
      this.tripType = 1;
    },
    closeSearch(){
      this.showPageOne = true;
      this.showSearch = false;
      this.showCalendar = false;
    },
    selectDepartCity(){
      this.showSearch = true;
      this.showDepart = true;
      this.showPageOne = false;
    },
    selectArriveCity(){
      this.showSearch = true;
      this.showDepart = false;
      this.showPageOne = false;
    },
    getDepartAirport(airport){
      this.showPageOne = true;
      this.showSearch = false;
      this.departAirport = airport;
    },
    getArriveAirport(airport){
      this.showPageOne = true;
      this.showSearch = false;
      this.arriveAirport = airport;
    },
    openPickerFrom(event){
      this.limit = {
				minYear: new Date().getFullYear(),
				minMonth: new Date().getMonth() + 1,
				minDay: new Date().getDate(),
			};
      this.showCalendar = true;
      this.currentTarget = 'DEPART';
      if(this.isOne){
				this.getlowPrice("selectCity");
			}
    },
    openPickerTo(){
      this.limit = {
        minYear: this.departDate.getFullYear(),
				minMonth: this.departDate.getMonth() + 1,
				minDay: this.departDate.getDate(),
      }
      this.showCalendar = true;
      this.currentTarget = 'RETURN';
      if(this.isOne){
				this.getlowPrice("selectCity");
			}
    },
    getDateVal(dateVal, data){
      this.showCalendar = data;
			switch (this.currentTarget) {
				case 'DEPART':
					this.departDate = dateVal;
					break;
				case 'RETURN':
					this.returnDate = dateVal;
			}
    },
    searchFlight(){
      this.handleOrderParams();
      let departDate = this.transDateFormat(this.departDate);
      let returnDate = this.transDateFormat(this.returnDate);
      let device = this.browserRedirect();
      if(!device){ // pc
        emitCustomEvent("flightSearch", "social_download_sale");
        if(this.tripType === 1){ // round trip
          window.location.href = `https://www.happyeasygo.com/flights/${this.departAirport.iataCode}-${this.arriveAirport.iataCode}/${departDate}-${returnDate}?tripType=${this.tripType}&adults=1&childs=0&baby=0&cabinClass=Economy&airline=&carrier=`;
        }else{ // single trip
          window.location.href = `https://www.happyeasygo.com/flights/${this.departAirport.iataCode}-${this.arriveAirport.iataCode}/${departDate}?tripType=${this.tripType}&adults=1&childs=0&baby=0&cabinClass=Economy&airline=&carrier=`;
        }
      }else{ // msite
        emitCustomEvent("flightSearch", "social_download_sale");
        if(this.tripType === 1){
          if(this.departAirport.countryName != "India" || this.arriveAirport.countryName != "India"){
            this.$router.push('/international');
          }else{
            this.$router.push('/roundtrip');
          }
        }else{
          this.$router.push('/oneway');
        }
      }
    },
    handleOrderParams(){ // msite use
      this.searchInfo = {
        arriveAirport: this.arriveAirport,
        defaultCabinClass: "Economy",
        departAirport: this.departAirport,
        departDate: new Date(this.departDate),
        passengersNum: {adults: 1, children: 0, infants: 0},
        returnDate: new Date(this.returnDate),
      };
      this.order = {
        adults: [{birthday: null}],
        baggageinfo: [],
        cabinClass: "Economy",
        children: [],
        contactInfo: {},
        departAirport: this.departAirport,
        departDate: new Date(this.departDate).getTime(),
        destinationAirport: this.arriveAirport,
        infants: [],
        orderNumber: "",
        orderType: this.tripType == 0?"one":"two",
        serviceFee: 0,
      };
      if(this.tripType == 1){
        this.order.returnDate = new Date(this.returnDate).getTime();
      }
      sessionStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      sessionStorage.setItem("order", JSON.stringify(this.order));
    },
    transDateFormat(date){
      let newDate = new Date(date);
      let year = newDate.getFullYear();
      let month = (newDate.getMonth()+1)<= 9?'0'+(newDate.getMonth()+1):newDate.getMonth()+1;
      let day = newDate.getDate() <= 9?'0'+newDate.getDate():newDate.getDate();
      return year+"-"+month+"-"+day
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
      } else {
        return false;
      }
    },
    getOfferApiData(){
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let device = this.browserRedirect();
      let url = DomainManager.paidDownLoadChannel();
      this.$axios.post(url, {activityName:this.activityname},{headers:{
        "x-Device":"mobile"
      }}).then(res =>{
        Indicator.close();
        if(res.success && res.code == 200 && res.data){
          this.actionBg.a1bg = res.data.headBackgroundImg;
          this.actionBg.a3bg = res.data.bottomImg;
          this.actionBg.topIcon = res.data.headImg;
          this.actionBg.activityName = res.data.activityName;
          this.actionBg.url = res.data.activityUrl;
          this.actionBg.backgroundColor = res.data.backgroundColor;
        }else{
          Toast(res.msg);
          // setTimeout(()=>{
            if(device){
              this.$router.push('/');
              // window.location.href = "https://m.happyeasygo.com/";
            }else{
              window.location.href = "https://www.happyeasygo.com/";
            }
          // },2000)
        }
      }).catch(err =>{
        Indicator.close();
        console.log(err);
        if(device){
          this.$router.push('/');
          // window.location.href = "https://m.happyeasygo.com/";
        }else{
          window.location.href = "https://www.happyeasygo.com/";
        }
      })
    }
  },
  created() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width < 350){
      this.smallScreen = true;
    }
    if(this.isOne){
			this.getlowPrice("session");
    }
    this.getOfferApiData();
  },
  mounted () {
    if(sessionStorage.getItem("searchInfo")){
      let info = JSON.parse(sessionStorage.getItem("searchInfo"));
      this.departDate = new Date(info.departDate);
      this.returnDate = new Date(info.returnDate);
      this.departAirport = info.departAirport;
      this.arriveAirport = info.arriveAirport;
    }
  }
}
</script>
<style lang="less" scoped>
#download-channel{
  h6{ font-weight:normal;}
  .action1{
    padding:0 0.64rem;
    .a1-top{
      padding:0.854rem 0  0.64rem;
      img{
        height:0.854rem;
      }
    }
    .a1-center{
      width:100%;
      height:3.5rem;
      img{
        float: right;
        width:10.48rem;
        height:100%;
        font-size: 0.6rem;
        color: #666;
        cursor: pointer;
      }
    }
    .a1-bottom{
      width:100%;
      margin-top:0.64rem;
      .a1-download-icon{
        width:10.48rem;
        height:1.495rem;
        float: right;
        a{width:5.1rem;height:1.495rem;}
        img{
          width:5.1rem;
          height:100%;
        }
      }
      p{
        float: right;
        width:10.48rem;
        margin-top: 0.1rem;
        font-family: SFCompactDisplay-Regular;
        font-size:0.512rem;
        line-height: 0.62rem;
        color: #666666;
        letter-spacing: -0.6px;
      }
    }
  }
  .action2{
    padding:0 0.64rem 0.3rem;
    .a2-title{
      width:7.2rem;
      height:1.068rem;
      margin:0 auto;
      position: relative;
      span{
        font-family: SFCompactDisplay-Medium;
        width:3rem;
        color: #999;
        font-size: 0.512rem;
        line-height: 1.068rem;
        background: #fff;
        position: absolute;
        top: 0;
        z-index:3;
        cursor: pointer;
        border-top-left-radius:0.6rem;
        border-bottom-left-radius:0.6rem;
        border-top-right-radius:0.6rem;
        border-bottom-right-radius:0.6rem;
      }
      span:first-child{
        left: 0;
        text-align: left;
        padding-left:0.6rem;
      }
      span:last-child{
        right: 0;
        text-align: right;
        padding:0 0.6rem 0 0.2rem;
      }
      .select-span{
        z-index:2;
        color:#fff;
        width:4rem;
        background: #0B9D78;
      }
    }
    .a2-small{
      width:7.8rem;
      .a2-small-p2{width:3.5rem;}
      span.select-span{
        width:4rem;
      }
    }
    .a2-select{
      margin-top: 0.21rem;
      .a2-flight{
        text-align: left;
        flex:1;
        img{
          width:0.726rem;
          vertical-align: middle;
          margin:0 10px 0 8px;
        }
        span{
          font-family: SFCompactDisplay-Regular;
          font-size: 0.512em;
          color: #111111;
        }
        div{
          margin-top:5px;
          height:1.28rem;
          line-height: 1.28rem;
          border-radius:2px;
          background: #fff;
          font-family: SFCompactDisplay-Regular;
          font-size: 0.598rem;
          color: #999999;
          cursor: pointer;
        }
      }
      .a2-depart{
        margin-right: 1.068rem;
      }
    }
    .a2-selectDate{
      .a2-flight div{
        letter-spacing:-1px;
      }
    }
    .a2-search-btn{
      display: block;
      width:100%;
      height:1.28rem;
      line-height:1.28rem;
      background: #0B9D78;
      border-radius: 2px;
      font-family: SFCompactDisplay-Medium;
      font-size: 0.598rem;
      color: #FFFFFF;
      cursor: pointer;
      margin:0.854rem 0 0.64rem;
    }
    .a2-guaranted{
      position: relative;
      padding:0.21rem 0.747rem;
      text-align: left;
      background: #fff;
      .a2-g_title{
        font-family: SFCompactDisplay-Medium;
        font-size: 0.556rem;
        color: #0B9D78;
      }
      p{
        margin-top: 0.21rem;
        font-family: SFCompactDisplay-Regular;
        font-size: 0.512rem;
        color: #999999;
        line-height: 0.65rem;
        letter-spacing: -0.6px;
      }
    }
    .a2-guaranted::before{
      display:inline-block;
      content:"";
      width:2.5px;
      height:1.8rem;
      background: #0B9D78;
      position: absolute;
      top: 0;
      left: 0;
    }
    .a2-share{
      background:transparent;
      margin:0 1.6rem;
      h6{
        font-family: SFCompactDisplay-Medium;
        font-size: .512rem;
        color: #111111;
        padding:.64rem 0;
      }
      .share-icon li{
        width: 1.28rem;
        height: 1.28rem;
        img{
          width: 100%;
          height:100%;
          border-radius:50%;
          cursor: pointer;
        }
      }
    }
  }
  .action3{
    img{
      width:100%;
      vertical-align: top;
    }
  }
}
</style>