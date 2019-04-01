import {
  Button,
  DatetimePicker,
  Field,
  Picker,
  Popup,
  Radio,
  Range,
  Actionsheet,
  InfiniteScroll,
} from "mint-ui";
import Vue from "vue";
import resource from "vue-resource";
import App from "./App.vue";
import filters from "./filter/filter.js";
import { FontUtil } from "./models/utils";
import router from "./router";
import { store } from "./vuex";
import axios from "axios";
import { AxiosConfig } from "./models/utils/AxiosConfig";
import base64 from 'js-base64';
import iOSBridge from './config/bridge.js';

// const FastClick = require("fastclick");
// FastClick.attach(document.documentElement);

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component("mt-button", Button);
Vue.component("mt-range", Range);
Vue.component("mt-popup", Popup);
Vue.component("mt-radio", Radio);
Vue.component(Field.name, Field);
Vue.component("mt-actionsheet", Actionsheet);
Vue.use(InfiniteScroll);

Vue.use(resource);
Vue.prototype.$axios = axios;
Vue.prototype.$Base64 = base64.Base64;
Vue.prototype.$bridge = iOSBridge;

Vue.filter("formatDate", filters.formatDate);

var refurl = document.referrer;

if (refurl.indexOf("referer") != -1) {
  var val1 = "";
  var o1 = refurl.split("?")[1].split("&");
  for (var i1 of o1) {
    i1.indexOf("referer") != -1 ? (val1 = i1.split("=")[1]) : null;
  }
  document.cookie = "refererWay=" + val1;
}

if (refurl.indexOf("acId") != -1 && refurl.indexOf("happyeasygo") != -1) {
  var val2 = "";
  var o2 = refurl.split("?")[1].split("&");
  for (var i2 of o2) {
    i2.indexOf("acId") != -1 ? (val2 = i2.split("=")[1]) : null;
  }
  document.cookie = "acId=" + val2;
}

if (refurl.indexOf("happyeasygo") == -1 || refurl == "") {
  document.cookie = "refurl=" + refurl;
}

FontUtil.init();
AxiosConfig.init();

var vm = new Vue({
  el: "#app",
  store,
  router,
  methods: {
    onLoadFinish() {
      try {
        window.heg && window.heg.onViewShow();
      } catch (e) {
        // statements
      }
    }
  },
  mounted() {
    this.onLoadFinish();
  },
  render: h => h(App)
});
