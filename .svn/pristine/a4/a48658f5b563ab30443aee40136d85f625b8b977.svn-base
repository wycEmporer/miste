<template>
  <div id="h5terms">
    <div v-show="showTermsList">
      <ul class="faq-list" >
        <li class="faq-child" id="lists" v-for="(item,i) in termsList" :key="i" >
          <div class="term-title" v-html="item">{{item}}</div>
          <div class="term-detail" ref="ref" v-for="(child,j) in termsChildList" :key="j" :dataId="j" @click="jumpTermsDetail(j,$event)">
            <p v-html="child">{{child}}</p>
            <div class="faq-icon"><img :src="icon" alt=""></div>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { DomainManager } from "../../../config/DomainManager.js";
export default {
  data() {
    return {
      showTermsList: true,
      termsDetail: [],
      termsDetails: [],
      termsChildList: [],
      termsList: [],
      domesticTerms: [],
      icon: require("../../../assets/images/H5/lg-arrow.png"),
      jumpList: [
        "/h5terms/general",
        "/h5terms/site",
        "/h5terms/ownership",
        "/h5terms/rights",
        "/h5terms/disclaimer",
        "/h5terms/provisions",
        "/h5terms/disputes",
        "/h5terms/insurance",
      ]
    };
  },
  created() {
    this.getTerms();
    this.getDomesticTerms();
  },
  beforeRouteEnter: (to, from, next) => {
    next(ve => {
      if (to.path == "/h5terms" || to.path == "/h5terms/") {
        ve.showTermsList = true;
      } else {
        ve.showTermsList = false;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path == "/h5terms" || to.path == "/h5terms/") {
      this.showTermsList = true;
    } else {
      this.showTermsList = false;
    }
    next();
  },
  methods: {
    jumpTermsDetail(id,event) { 
      this.showTermsList = false;
      this.$router.push(this.jumpList[id]);
    },
    getTerms() {
      let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=82";
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            res.data.list.forEach((e, i) => {
              that.$set(that.termsList, i, e.class);
              e.node.forEach((ee, j) => {
                that.$set(that.termsChildList, j, ee.class);
              });
            });
            that.termsDetails = res.data.list[0].node;
          } else {
            Toast({
              message: res.data.statusText,
              position: "center",
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDomesticTerms() {
      let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=1";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success) {
            that.domesticTerms = res.data.list[0].node;
            that.$nextTick(() => {
              let img = document.createElement("img");
              let lists = document.getElementById("lists");
              let newItem = document.createElement("div");
              img.setAttribute("src", that.icon);
              img.style.width = "0.182rem";
              img.style.marginTop = "0.22rem";
              img.style.float = "right";
              newItem.style.padding = "0.55rem";
              newItem.style.lineHeight = "1.06rem";
              newItem.style.fontSize = "14px";
              newItem.style.borderBottom = "1px solid #eee";
              newItem.innerHTML = "DOMESTIC FLIGHT BOOKING TERMS";
              lists.insertBefore(newItem, that.$refs.ref[1]);
              newItem.appendChild(img);
              newItem.onclick = function() {
                that.showTermsList = false;
                that.$router.push("/h5terms/domestic");
              };
            });
          } else {
            Toast({
              message: res.data.statusText,
              position: "center",
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
#h5terms {
  .faq-list {
    li {
      font-size: 14px;
      text-align: left;
      .term-title {
        color: #111;
        line-height: 0.9rem;
        padding: 0.44rem 0.55rem;
        background: #f8f8f8;
        opacity: 0.8;
      }
      .term-detail {
        line-height: 1.06rem;
        padding: 0.55rem 0.55rem;
        border-bottom: 1px solid #eee;
        display:flex;
        justify-content: space-between;
        p{
          flex: 1;
        }
        .faq-icon {
          width:5%;
          text-align: right;
          img {
            width: 0.182rem;
            margin-top: 0.22rem;
          }
        }
      }
      .term-detail:after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
    }
  }
}
</style>
