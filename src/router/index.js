import Vue from "vue";
import Router from "vue-router";
import {
  Indicator
} from "mint-ui";


const Home = resolve => require(["../pages/home/home.vue"], resolve);
const oldHome = resolve => require(["../pages/home/home.vue"], resolve);
const Flight = resolve => require(["../pages/flight/flight.vue"], resolve);
const Order = resolve => require(["../pages/order/order.vue"], resolve);
const Payment = resolve => require(["../pages/payment/payment.vue"], resolve);
const Register = resolve =>require(["../pages/register/register.vue"], resolve);
const registerRewards = resolve =>require(["../pages/registerrewards/rewards.vue"], resolve);
const Book = resolve => require(["../pages/book/book.vue"], resolve);
const Search = resolve => require(["../pages/home/child/search.vue"], resolve);
const OneWay = resolve =>
  require(["../pages/flight/child/oneflight.vue"], resolve);
const Filter = resolve =>
  require(["../pages/flight/child/filter.vue"], resolve);
const FilterB = resolve =>
  require(["../pages/flight/child/filterB.vue"], resolve);
const Roundtrip = resolve =>
  require(["../pages/flight/child/roundtrip.vue"], resolve);
const International = resolve => require(["../pages/flight/child/international.vue"], resolve);

const Sign = resolve => require(["../pages/book/child/signin.vue"], resolve);
const Support = resolve => require(["../pages/support/support.vue"], resolve);
const writeToUs = resolve => require(["../pages/support/write-to-us.vue"], resolve);
const Feedback = resolve => require(["../pages/support/feedback.vue"], resolve);
const Contact = resolve => require(["../pages/contact/contact.vue"], resolve);
const Offer = resolve => require(["../pages/offer/offer.vue"], resolve);
const Bridge = resolve => require(["../pages/bridge/bridge.vue"], resolve);
const Fare = resolve => require(["../pages/book/child/fare.vue"], resolve);
const Trip = resolve => require(["../pages/trip/trip.vue"], resolve);
const Tripback = resolve => require(["../pages/trip/back.vue"], resolve);
const Ticket = resolve => require(["../pages/ticket/ticket.vue"], resolve);
const loading = resolve => require(["../components/loading/loading.vue"], resolve);
const account = resolve => require(["../pages/account/account.vue"], resolve);
const Choosepay = resolve => require(['../pages/payment/child/choosepay.vue'], resolve);
const ConfirmPay = resolve => require(['../pages/payment/child/confirm.vue'], resolve);
const payresults = resolve =>
  require(["../pages/payment/payresults.vue"], resolve);
const agreement = resolve =>
  require(["../pages/agreement/agreement.vue"], resolve);
const nopay = resolve => require(["../pages/order/child/nopay.vue"], resolve);
const complete = resolve =>
  require(["../pages/order/child/Complete.vue"], resolve);
const refund = resolve => require(["../pages/order/child/refund.vue"], resolve);
const refundOTP = resolve => require(["../pages/order/child/refundOTP.vue"], resolve);
const upcoming = resolve =>
  require(["../pages/order/child/upcoming.vue"], resolve);
const canceltrip = resolve =>
  require(["../pages/order/child/canceltrip.vue"], resolve);
const changetrip = resolve =>
  require(["../pages/order/child/changetrip.vue"], resolve);
const wallet = resolve => require(["../pages/wallet/wallet.vue"], resolve);
const about = resolve => require(["../pages/about/about.vue"], resolve);
const withdraw = resolve =>
  require(["../pages/happywallet/child/withdraw.vue"], resolve);
const referral = resolve =>
  require(["../pages/referral/referral.vue"], resolve);
const referrerInfo = resolve =>
  require(["../pages/referral/child/referralInfo.vue"], resolve);
const cashback = resolve =>
  require(["../pages/cashback/cashback.vue"], resolve);
//offer
const springsale = resolve =>
  require(["../pages/offer/child/springsale.vue"], resolve);
const springtravel = resolve => require(["../pages/offer/child/SpringTravel.vue"], resolve);
const springtravel_terms = resolve => require(["../pages/offer/child/SpringTravel-terms"], resolve);
const springsale_terms = resolve => require(["../pages/offer/child/springsale-terms.vue"], resolve);
const recharge = resolve => require(["../pages/recharge/recharge.vue"], resolve);
const rechargeint = resolve => require(["../pages/recharge/rechargeint.vue"], resolve);
const happywallet = resolve => require(["../pages/happywallet/happywallet.vue"], resolve);
const privacy = resolve => require(["../pages/privacy/privacy.vue"], resolve);
const profile = resolve => require(["../pages/profile/accountcenter.vue"], resolve);
const security = resolve => require(["../pages/security/security.vue"], resolve);
const forgotpassword = resolve => require(["pages/forgotpassword/forgotpassword.vue"], resolve);
const forgotpassworduser = resolve => require(["pages/forgotpassword/forgotpassworduser.vue"], resolve);
const login = resolve => require(["pages/login/login.vue"], resolve);
const forgotpay = resolve => require(["pages/forgotpassword/forgotpay.vue"], resolve);
const ticketlist = resolve => require(["pages/ticketlist/ticketlist.vue"], resolve);
const guaranteed = resolve => require(["pages/homeoffer/guaranteed.vue"], resolve);
const verification = resolve => require(["pages/verification/verification.vue"], resolve);
const mnyagreement = resolve => require(["pages/agreement/mnyagreement.vue"], resolve);
const domesticterms = resolve => require(["pages/agreement/domesticterms.vue"], resolve);
const insurancePDF = resolve => require(["pages/agreement/insurancePDF.vue"], resolve);
const appllodomesticterms = resolve => require(["pages/agreement/apollo-domestic-terms.vue"], resolve);
const internationalterms = resolve => require(["pages/agreement/apollo-international-terms76.vue"], resolve);

const cheapbookapp = resolve => require(["pages/cheapapp/cheapapp.vue"], resolve);
const couponlist = resolve => require(["pages/coupon/couponlist.vue"], resolve);
const coupondetail = resolve => require(["pages/coupon/coupondetail.vue"], resolve);
const privateCoupons = resolve => require(["pages/coupon/privatecoupons.vue"], resolve);
const h5aboutus = resolve => require(["pages/h5pages/aboutus/aboutus.vue"], resolve);
const h5FAQS = resolve => require(["pages/h5pages/FAQS/FAQS.vue"], resolve);
const h5RegisterSign = resolve => require(["pages/h5pages/FAQS/registersign.vue"], resolve);
const h5Flight = resolve => require(["pages/h5pages/FAQS/flight.vue"], resolve);
const h5Payment = resolve => require(["pages/h5pages/FAQS/payment.vue"], resolve);
const h5Trouble = resolve => require(["pages/h5pages/FAQS/troubles.vue"], resolve);

const h5terms = resolve => require(["pages/h5pages/terms/terms.vue"], resolve);
const h5general = resolve => require(["pages/h5pages/terms/general.vue"], resolve);
const h5domestic = resolve => require(["pages/h5pages/terms/domestic.vue"], resolve);
const h5site = resolve => require(["pages/h5pages/terms/site.vue"], resolve);
const h5ownership = resolve => require(["pages/h5pages/terms/ownership.vue"], resolve);
const h5rights = resolve => require(["pages/h5pages/terms/rights.vue"], resolve);
const h5disclaimer = resolve => require(["pages/h5pages/terms/disclaimer.vue"], resolve);
const h5provisions = resolve => require(["pages/h5pages/terms/provisions.vue"], resolve);
const h5disputes = resolve => require(["pages/h5pages/terms/disputes.vue"], resolve);
const h5insurance = resolve => require(["pages/h5pages/terms/insurance.vue"], resolve);

const h5support = resolve => require(["pages/h5pages/support/support.vue"], resolve);
const referralactivity = resolve => require(["pages/referralactivity/referralactivity.vue"], resolve);
const referraldetail = resolve => require(["pages/referralactivity/referraldetail.vue"], resolve);
const referralwinner = resolve => require(["pages/referralactivity/referralwinner.vue"], resolve);
const monsoon = resolve => require(["pages/referralactivity/monsoon/monsoon.vue"], resolve);

const insuranceDetail = resolve => require(["pages/order/child/base/insuranceDetail.vue"], resolve);

const anniversary = resolve => require(["pages/anniversary/anniversary.vue"], resolve);
const anniversaryIntroduce = resolve => require(["pages/anniversary/introduce.vue"], resolve);
const anniversaryPrize = resolve => require(["pages/anniversary/prize.vue"], resolve);
const anniversarylandingpage = resolve => require(["pages/anniversary/anniversarylandingpage.vue"],resolve);
const autumnsale = resolve => require(["pages/autumn/autumnsale.vue"],resolve);
const autumnshake = resolve => require(["pages/autumn/autumn.vue"],resolve);
const autumnrules = resolve => require(["pages/autumn/autumnrules.vue"],resolve);
const autumnprizes = resolve => require(["pages/autumn/autumnprizes.vue"],resolve);
const autumnintro = resolve => require(["pages/autumn/autumnintro.vue"],resolve);
const dussehraMegaSale = resolve => require(["pages/autumn/dussehra-mega-sale.vue"],resolve);
const DiwaliDhamakaSale = resolve => require(["pages/autumn/diwali-dhamaka-sale.vue"],resolve);
const PreChristmasSale = resolve => require(["pages/autumn/pre-christmas-sale.vue"],resolve);

const blackFridayCyberMondaySale = resolve => require(["pages/activity/black-friday-cyber-monday-sale.vue"],resolve);

const GrabCashbackSale = resolve => require(["pages/grabcashback/grab-cashback.vue"],resolve);
const GrabActivity = resolve => require(["pages/grabcashback/grab-activity.vue"],resolve);
const GrabAppShare = resolve => require(["pages/grabcashback/grab-app-share.vue"],resolve);
const GrabTerms = resolve => require(["pages/grabcashback/child/grab-terms.vue"],resolve);

const careers = resolve => require(["pages/joinus/joinus.vue"],resolve);
const careersdetail = resolve => require(["pages/joinus/joinusdetail.vue"],resolve);
const applyonline = resolve => require(["pages/joinus/careers.vue"],resolve);

const Hotel = resolve => require(["pages/hotel/"],resolve)
const HotelList = resolve => require(["pages/hotel/component/hotelList.vue"], resolve);
const HotelOrder = resolve => require(["pages/hotel/component/hotelOrder.vue"], resolve);
const HotelSearch = resolve => require(["pages/hotel/component/HotelSearch.vue"], resolve)
const PayDownloadChannel = resolve => require(["pages/paydownloadchannel/paydownloadchannel.vue"], resolve);
const NewYearSale = resolve => require(["pages/activity/new-year-sale.vue"],resolve);

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [{
      path: "/",
      component: Home,
      name: "home",
      meta: {
        keepAlive: true
      }
    },
    {
      path:"/social-traffic-download/:activityname",
      name:"social-traffic-download",
      props: true,
      component: PayDownloadChannel
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/oldhome",
      component: oldHome,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/about",
      component: about
    },
    {
      path: "/privacy",
      component: privacy
    },
    {
      path: "/profile",
      component: profile
    },
    {
      path: "/wallet",
      component: wallet
    },
    {
      path: "/withdraw",
      component: withdraw
    },
    {
      path: "/account",
      component: account
    },
    {
      path: "/security",
      component: security
    },
    {
      path: "/guaranteed",
      component: guaranteed
    },
    {
      path: "/happywallet",
      component: happywallet
    },
    {
      path: "/cashback",
      component: cashback
    },
    {
      path: "/springsale",
      component: springsale
    },
    {
      path: "/SpringTravel",
      component: springtravel,
    },
    {
      path: "/SpringTravel-terms",
      component: springtravel_terms,
    },
    {
      path: "/springsale-terms",
      component: springsale_terms
    },
    {
      path: "/ticketlist",
      component: ticketlist
    },
    {
      path: "/referral",
      component: referral
    },
    {
      path: "/referrerInfo",
      component: referrerInfo
    },
    {
      path: "/top-up",
      component: recharge
    },
    {
      path: "/rechargeint",
      component: rechargeint
    },
    {
      path: "/loading",
      component: loading
    },
    {
      path: "/agreement",
      component: agreement,
    },
    {
      path: "/domesticterms",
      component: domesticterms,
    },
    {
      path: "/domestic-terms",
      component: appllodomesticterms,
    },
    {
      path: "/international-terms",
      component: internationalterms,
    },
    {
      path: "/cheap-flights-booking-app",
      component: cheapbookapp
    },
    {
      path: "/christmastc",
      component: mnyagreement
    },
    {
      path: "/verification",
      component: verification
    },
    {
      path: "/search",
      component: Search,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/flight",
      component: Flight,
      redirect: "/oneway",
      children: [{
          path: "/oneway",
          component: OneWay,
          meta: {
            keepAlive: false
          },
          children: [{
            path: "filter",
            component: Filter
          }]
        },
        {
          path: "/roundtrip",
          component: Roundtrip,
          meta: {
            keepAlive: false
          },
          children: [{
              path: "filter",
              component: Filter
            },
            {
              path: "filterB",
              component: FilterB
            }
          ]
        },
        {
          path: "/international",
          component: International,
          meta: {
            keepAlive: false
          },
          children: [{
            path: "filter",
            component: Filter
          }]
        }
      ]
    },
    {
      path: "/order",
      component: Order,
      redirect: "/search",
      children: [{
          path: "nopay",
          component: nopay
        },
        {
          path: "complete",
          component: complete
        },
        {
          path: "refund",
          component: refund
        },
        {
          path: "refundOTP",
          component: refundOTP
        },
        {
          path: "upcoming",
          component: upcoming
        },
        {
          path: "cancel",
          component: canceltrip
        },
        {
          path: "change",
          component: changetrip
        },
        {
          path: "insurancedetail",
          component: insuranceDetail
        }
      ]
    },
    {
      path: '/hotel_order',
      component: Hotel,
      children:[{
        path: '',
        component: HotelList,
      },{
        path: 'list',
        component: HotelList,
        name: 'hotelList'
      },{
        path: 'order/:orderId/:phoneNo?',
        component: HotelOrder,
        props: true,
        name: 'hotelOrder'
      },{
        path: 'search',
        component: HotelSearch,
        name: 'hotelSearch'
      }]
    },
    {
      path: "/payment/",
      component: Payment,
      children: [{
          path: 'confirm',
          component: ConfirmPay
        },
        {
          path: 'choosepay/:orderId/:phoneNo',
          component: Choosepay,
          props: true,
          name: 'choosepay'
        },
        
      ]
    },
    {
      path: "/payment-state",
      component: payresults,
      name: 'payresults',
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/registration-reward",
      component: registerRewards
    },
    {
      path: "/book",
      component: Book,
      children: [{
        path: "fare",
        component: Fare
      }]
    },
    {
      path: "/sign",
      component: Sign
    },
    {
      path: "/support",
      component: Support,
      meta:{
        keepAlive: true,
      }
    },
    {
      path: "/write-to-us",
      component: writeToUs
    },
    {
      path: "/feedback",
      component: Feedback
    },
    {
      path: "/offer",
      component: Offer
    },
    {
      path: "/bridge",
      component: Bridge
    },
    // {
    //   path: "/download",
    //   component: Download
    // },
    {
      path: "/ticket",
      component: Ticket
    },
    {
      path: "/trip",
      component: Trip
    },
    {
      path: "/tripback",
      component: Tripback
    },
    {
      path: "/contact",
      component: Contact
    },
    {
      path: "*",
      component: Home
    },
    {
      path: "/forgotpassword",
      component: forgotpassword
    },
    {
      path: "/forgotpassworduser",
      component: forgotpassworduser
    },
    {
      path: "/couponlist",
      component: couponlist
    },
    {
      path: "/coupondetail",
      component: coupondetail
    },
    {
      path: "/privateCoupons",
      component: privateCoupons,
      meta: {checkLogined: true}
    },
    {
      path: "/forgotpay",
      component: forgotpay
    },
    {
      path: "/h5aboutus",
      component: h5aboutus
    },
    {
      path: "/h5FAQS",
      component: h5FAQS,
      children: [{
        path: "registersign",
        component: h5RegisterSign
      },
      {
        path: "flights",
        component: h5Flight
      },
      {
        path: "payment",
        component: h5Payment
      },
      {
        path: "troubles",
        component: h5Trouble
      }]
    },
    {
      path: "/h5terms",
      component: h5terms,
      children: [{
        path: "general",
        component: h5general
      },
      {
        path: "domestic",
        component: h5domestic
      },
      {
        path: "site",
        component: h5site
      },
      {
        path: "ownership",
        component: h5ownership
      },
      {
        path: "rights",
        component: h5rights
      },
      {
        path: "disclaimer",
        component: h5disclaimer
      },
      {
        path: "provisions",
        component: h5provisions
      },
      {
        path: "disputes",
        component: h5disputes
      },
      {
        path: "insurance",
        component: h5insurance
      }]
    },
    {
      path: "/h5support",
      component: h5support,
      redirect:"/support"
    },
    {
      path: "/referralactivity",
      component: referralactivity
    },
    {
      path: "/referraldetail",
      component: referraldetail
    },
    {
      path: "/referralwinner",
      component: referralwinner
    },
    {
      path: "/monsoon",
      component: monsoon
    },
    {
      path: "/insurancePDF",
      component: insurancePDF
    },
    {
      path: "/anniversary",
      component: anniversary
    },
    {
      path: "/anniversaryIntroduce",
      component: anniversaryIntroduce
    },
    {
      path: "/anniversaryPrize",
      component: anniversaryPrize
    },
    {
      path: "/autumnsale",
      component: dussehraMegaSale,
    },
    {
      path: "/dussehra-mega-sale",
      component: dussehraMegaSale
    },
    {
      path: "/diwali-dhamaka-sale",
      component: DiwaliDhamakaSale
    },
    {
      path: "/pre-christmas-sale",
      component: PreChristmasSale
    },
    {
      path: "/shake",
      component: autumnshake
    },
    {
      path: "/autumnrules",
      component: autumnrules
    },
    {
      path: "/autumnprizes",
      component: autumnprizes
    },
    {
      path: "/autumnintro",
      component: autumnintro
    },
    {
      path: "/careers",
      component: careers
    },
    {
      path: "/careersdetail",
      component: careersdetail
    },
    {
      path: "/applyonline",
      component: applyonline
    },
    {
      path: "/first-anniversary-offers",
      component: anniversarylandingpage,
    },
    {
      path: "/grab-cashback",
      component: GrabCashbackSale,
    },
    {
      path: "/grab-activity",
      component: GrabActivity,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/grab-app-share",
      component: GrabAppShare,
    },
    // {
    //   path:"/grab-terms",
    //   component:GrabTerms
    // },
    
    // activity 
    {
      path:"/black-friday-cyber-monday-sale",
      component:blackFridayCyberMondaySale
    },
    {
      path:"/new-year-sale-2019",
      component: NewYearSale
    },
  ]
});
router.beforeEach((to, from, next) => {
  // if(to.path.indexOf('offers/') < 0 && from.path.indexOf('offers/') > -1){
  //   window.location.href = to.path;
  //   return;
  // }
  // if(to.meta.checkLogined){
  //   if(!isLogin){
  //     sessionStorage.setItem('LOGIN_BEFORE', to.fullPath);
  //     next({path:'/login'})
  //   }else{
  //     next();
  //   }
  // }else{
  //   next();
  // }
  next();
  Indicator.close();
  
});
export default router;