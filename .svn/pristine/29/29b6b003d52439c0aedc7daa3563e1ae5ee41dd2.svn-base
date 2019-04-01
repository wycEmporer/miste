<template>
	<div class="wrapper">
		<head-top>
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Domestic Flight Booking Terms
			</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="content" v-for="(item,index) in terms" :key="index"> 
        <div v-for="(obj1,i1) in item.node" :key="i1">
            <h2 v-html="obj1.class">{{obj1.class}}</h2>
            <div v-for="(obj21,i21) in obj1.content" :key="i21">
                <p v-html="obj21.content">{{obj21.content}}</p>
            </div>
        </div>
        <p v-for="i in item.content" :key="i.cid" v-html="i.content">{{i.content}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { Toast, Indicator } from "mint-ui";
import { DomainManager } from "../../config/DomainManager.js";
export default {
  data() {
    return {
      terms: []
    };
  },
  components: {
    headTop
  },
  methods: {
    getDomesticTerms() {
      Indicator.open({
				spinnerType: 'fading-circle'
			});
      let that = this;
      let url = DomainManager.getFlightFAQS() + "?" + "cId=1";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success) {
            Indicator.close();
            that.terms = res.data.list;
          } else {
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getDomesticTerms();
  }
};
</script>
<style lang="less" scoped>
.header {
  background: #0b9d78;
  .title {
    line-height: 2.04rem;
    font-size: 0.768rem;
    color: #fff;
  }
  .sp {
    opacity: 0;
  }
}

a {
  color: #0db790;
}

.container {
  height: auto;
}

.container .content {
  padding: 2.4rem 0.68rem;
  h2 {
    font-size: 0.6rem;
    color: #000;
    text-align: left;
    padding: 0.6rem 0 0;
  }
  p {
    font-size: 0.52rem;
    color: #666;
    text-align: left;
    padding: 0.2rem 0;
    // letter-spacing:0.05rem;
    line-height: 0.68rem;
  }
  h1 {
    span {
      font-size: 0.52rem !important;
    }
  }
}
</style>