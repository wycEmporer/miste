<template>
  <div id="FAQs">
    <div v-if="showChild">
      <p>Types&nbsp;of&nbsp;problems</p>
      <ul class="faq-list">
        <li class="faq-child" v-for="(item,index) in faqList" :key="index" @click="jumpQuestion(index)">
          {{item}}
          <div class="faq-icon"><img :src="require('../../../assets/images/H5/lg-arrow.png')" alt=""></div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { Toast, Indicator} from "mint-ui";
import { DomainManager } from "../../../config/DomainManager.js";
export default {
  data() {
    return {
      showChild: true,
      showList: [],
      faqList: [],
      childList: [
        "/h5FAQS/registersign",
        "/h5FAQS/flights",
        "/h5FAQS/payment",
        "/h5FAQS/troubles"
      ]
    };
  },
  created() {
    this.getFaqs();
  },
  beforeRouteEnter: (to, from, next) => {
    next(ve => {
      if (to.path == "/h5FAQS" || to.path == "/h5FAQS/") {
        ve.showChild = true;
      } else {
        ve.showChild = false;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path == "/h5FAQS" || to.path == "/h5FAQS/") {
      this.showChild = true;
    } else {
      this.showChild = false;
    }
    next();
  },
  methods: {
    jumpQuestion(id) {
      this.showChild = false;
      this.$router.push(this.childList[id]);
    },
    getFaqs() {
      Indicator.open({
				spinnerType: 'fading-circle'
			});
      let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=9";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success) {
            Indicator.close();
            res.data.list[0].node.forEach((e, i) => {
              that.$set(that.faqList, i, e.class);
            });
            that.showList = res.data.list[0].node;
          } else {
            Toast({
              message: res.statusText,
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
#FAQs {
  p {
    font-size: 14px;
    color: #111;
    padding: 0.45rem 0.55rem;
    background: #eee;
    text-align: left;
    opacity: 0.8;
    line-height: 0.75rem;
  }
  .faq-list {
    li {
      font-size: 14px;
      color: #111;
      line-height: 0.9rem;
      text-align: left;
      padding: 0.55rem 0.55rem;
      border-bottom: 1px solid #eee;
      .faq-icon {
        float: right;
        img {
          width: 0.182rem;
          margin-top: 0.22rem;
        }
      }
    }
    li:after {
      clear: both;
      content: "";
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
    }
  }
}
</style>
