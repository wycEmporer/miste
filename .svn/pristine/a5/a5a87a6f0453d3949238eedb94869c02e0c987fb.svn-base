<template>
  <div id="h5-support">
    <ul class="sup-list">
      <li class="sup-child li-child">
          <p>Service</p><p class="contact-type">{{supportObj.serviceLink}}</p>
      </li>
      <li class="sup-child li-child">
          <p>FeedBack</p><p class="contact-type">{{supportObj.feedBackLink}}</p>
      </li>
      <li class="sup-child li-child">
          <p>Business</p><p class="contact-type">{{supportObj.businessLink}}</p>
      </li>
      <li class="sup-child li-child">
          <p>Telephone</p><p class="contact-type">{{supportObj.phoneLink}}</p>
      </li>
    </ul>
    <ul class="sup-location">
      <li class="li-child">Location</li>
      <li class="li-child loc-child">{{supportObj.companyAddress}}</li>
      <li class="li-child">
        <div class="info-group" style="width: 14.7rem;height:10rem;">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2021984546022!2d77.08473541507973!3d28.50356368246873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1946ebc8f25b%3A0x670c2512a0644c6e!2sHappyEasyGo!5e0!3m2!1szh-CN!2sjp!4v1517211551763" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </li>
    </ul>
    <Chat/>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
import { User } from 'models/user'
import Chat from 'components/chat/Chat';
export default {
  components:{
    Chat,
  },
  data (){
    return {
      supportObj:{
        serviceLink: '',
        feedBackLink:'feedback@happyeasygo.com',
			  businessLink:'sales@happyeasygo.com',
        phoneLink: '',
        companyAddress:'',
      },
    }
  },
  created(){
		User.getWebsiteInfo(this).then(res => {
      if(res.webSiteInfo){
        this.supportObj.serviceLink = res.webSiteInfo.email
        // this.feedBackLink = res.webSiteInfo.email
        // this.businessLink = res.webSiteInfo.email
        this.supportObj.phoneLink = res.webSiteInfo.websitePhone
        this.supportObj.companyAddress = res.webSiteInfo.companyAddress
      }
    })
	},
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
#h5-support{
  background:#eee;
  .li-child{
    font-size:14px;
    color:#111;
    line-height:0.9rem;
    text-align: left;
    padding:0.55rem 0.55rem;
    border-bottom:1px solid #eee;
  }
  .sup-list{
    background: #fff;
    li{
      display: flex;
      justify-content: space-between;
      .contact-type{
        color:#999;
        font-size: 12px;
      }
    }
  }
  .sup-location{
    margin-top:0.667rem;
    background: #fff;
    .loc-child{
      color:#999;
      font-size: 12px;
    }
  }
}
</style>
