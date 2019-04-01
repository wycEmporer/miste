<template>
	<div class="wrapper">
		<head-top class='header'>
			<i slot="left" class="prev iconfont icon-back"></i>
			<div slot="title" class="title">Feedback</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
    
			<div class="content">
				<div class="section1">
					<h3>Have website related feedback or suggestion?</h3>
					<p>
						We value our customer experience on our website and app, if you have any suggestion regarding our website please send us your feedback below.
					</p>
				</div>
				<div class="section2">
					<h3>Name</h3>
					<div class="form-group">

						<input type="text" v-model="feedbackInfo.name" placeholder="Your Name">
					</div>
					<h3>Email</h3>
					<div class="form-group">
						<input type="text" v-model="feedbackInfo.email" placeholder="Your Email">
					</div>
					<h3>Your Feedback</h3>
					<div class="form-group">
						<textarea cols="30" v-model="feedbackInfo.content" rows="6"></textarea>
					</div>
				</div>
				<div class="sub flex content-end">
					<a href="javascript:" @click="pushFeedback">Submit</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from "../../components/head/head.vue";
import { DomainManager } from "../../config/DomainManager.js";
import { User } from "../../models/user";
import { Toast, Indicator } from "mint-ui";

export default {
  components: {
    headTop
  },
  data() {
    return {
      msg: "feedback",
      timer:null,
      feedbackInfo: {
        name: "",
        email: "",
        content: ""
      }
    };
  },
  methods: {
    pushFeedback() {
      var user = this.feedbackInfo;

      if (user.name.trim() === "") {
        Toast({
          message: "please input your name",
          duration: 1500
        });
      } else if (user.email.trim() === "") {
        Toast({
          message: "please input your email",
          duration: 1500
        });
      } else if (this.feedbackInfo.content.trim() === "") {
        Toast({
          message: "the form  can not be empty",
          duration: 1500
        });
      } else {
        let infoString = "";
        for (let v in this.feedbackInfo) {
          infoString += v + "=" + this.feedbackInfo[v] + "&";
        }
        User.pushFeedback(this, infoString)
          .then(res=> {
            if (res.success) {
              Toast({
                message: "thanks for your feedback!",
                duration: 1500
              });
              Object.assign(this.$data, this.$options.data());
              this.timer = setTimeout(()=>{
                this.$router.push('/support');
              }, 1500)
            } else {
              Toast({
                message: res.msg,
                duration: 1500
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>
<style lang='less' scoped>
.header {
  background: #0b9d78;
  .prev {
    width: 0.5rem !important;
  }
  .title {
    line-height: 2.04rem;
    font-size: 0.768rem;
    color: #fff;
  }
  .sp {
    opacity: 0;
  }
}

.content {
  padding: 2.4rem 0.68rem 0;
  h3 {
    font-size: 0.6rem;
    color: #333;
    text-align: left;
    line-height: 1.6rem;
  }
}

.section1 {
  p {
    font-size: 0.52rem;
    color: #999;
    text-align: left;
  }
}

.section2 {
  padding-top: 1rem;
  .form-group {
    border: 1px solid #ddd;
    input {
      width: 100%;
      font-size: 0.6rem;
      padding: 0.4rem 0.4rem;
      text-indent: 0;
      box-sizing: border-box;
    }
    textarea {
      width: 100%;
      font-size: 0.6rem;
      color: #666;
      padding: 0.4rem;
      box-sizing: border-box;
      /*text-indent:1rem;*/
    }
  }
}

.sub {
  padding-top: 1rem;
  a {
    display: block;
    width: 30%;
    padding: 0.4rem 0;
    font-size: 0.6rem;
    color: #fff;
    border-radius: 2px; // margin: 0 0.4rem;
  }
  a:nth-of-type(1) {
    background-color: #ffad3d;
  }
  a:nth-of-type(2) {
    background-color: #0b9d78;
  }
}
</style>