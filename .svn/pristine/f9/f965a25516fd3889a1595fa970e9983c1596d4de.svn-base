<template>
  <div id="g-share-dialog" >
    <div class="g-share-cover" @click="hideShareBox"></div>
    <div class="g-share-box" :class="{'g-share-cover1':shareDialog1}">
      <div class="dialog-title">Share &amp; earn with your friends</div>
      <ul class="dialog-text flex ">
        <li v-for="(item,index) in shareList" :key="item.id" @click="shareToApp(item.id)">
          <a v-if="index == 0" :href="(isIos && index == 0)?item.href2:item.href" target="_blank">
            <img :src="item.icon" alt="">
            <p>{{item.name}}</p>
          </a>
          <a v-else :href="item.href" :id='index == 3?"Copylink":"" ' :data-action="index == 1?item.action:''" target="_blank">
            <img :src="item.icon" alt="">
            <p>{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import Clipboard from 'clipboard';
import { AppBridge } from '../../../models/appbridge/appbridge.js';
export default {
  props:["shareDialog","copyLink","shareText"],
  data(){
    return {
      model:0,
      timer:null,
      flag:true,
      isIos:false,
      shareDialog1:false,
      shareTexts:'',
      shareList:[
        {id:0,name:'SMS',href:'javascript:;',href2:'javascript:;',icon:require('../../../assets/images/grabcashback/icon_sms.png')},
        {id:1,name:'Whatsapp',href:'javascript:;',action:'share/whatsapp/share',icon:require('../../../assets/images/grabcashback/icon_whatsapp.png')},
        {id:2,name:'Facebook',href:'javascript:;',icon:require('../../../assets/images/grabcashback/icon_facebook.png')},
        {id:3,name:'Copy Link',href:'javascript:;',icon:require('../../../assets/images/grabcashback/icon_copylink.png')},
      ]
    }
  },
  watch:{
    shareDialog(val,oldV){
      this.shareDialog1 = val;
    },
    shareText(val){
      if(val){
        this.shareTexts = val;
        this.shareList[0].href = 'sms:?body='+(this.shareTexts);
        this.shareList[0].href2 = 'sms:&body='+encodeURIComponent(this.shareTexts);
        this.shareList[1].href = 'whatsapp://send?text='+encodeURIComponent(this.shareTexts);
        this.shareList[2].href = 'https://www.facebook.com/sharer.php?u='+encodeURIComponent(this.copyLink)+'&t='+encodeURIComponent(document.title);
      }
    }
  },
  methods:{
    shareToApp(who){
      let clipboard, that = this;
      if(who == 3){
        if(this.flag){
          this.flag = false;
          clipboard = new Clipboard('#Copylink',{
            text: function() {
              return that.copyLink;
            }
          });
          clipboard.on('success', function(e) {
            Toast({
              message:"Successfully copied to the Clipboard! ",
              duration:1200
            });
            e.clearSelection();
            clipboard.destroy();
          });
          clipboard.on('error', function(e) {
            Toast({
              message:"Copy failed, please input manually! ",
              duration:1200
            });
            e.clearSelection();
            clipboard.destroy();
          });
          setTimeout(function(){
            that.flag = true;
          },1200);
        }
      }else{
        this.$emit("hideShareBox");
      }
    },
    hideShareBox(){
      this.shareDialog1 = false;
      this.timer = setTimeout(()=>{
        this.$emit("hideShareBox");
      },600)
    },
  },
  async created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if(isiOS){
      this.isIos = true;
    }else{
      this.isIos = false;
    }
    let id = await AppBridge.getNativeUuid(this);
    window.onReceviedUuid = this.onReceviedUuid;
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
}
</script>
<style lang="less" scoped>
#g-share-dialog{
  .g-share-cover{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin:auto;
    background: rgba(0,0,0,0.5);
    z-index: 15;
  }
  .g-share-box{
    position: fixed;
    width:100%;
    height:0;
    background: #fff;
    bottom: 0;
    z-index: 16;
    transition: height 0.6s;
    .dialog-title{
      font-size: 0.769rem;
      color: #111111;
      margin: 1.108rem 0 1.282rem;
      font-weight: bold;
      font-family: "SFCompactText-Medium";
    }
    .dialog-text{
      margin: 0 1.282rem;
      li{
        flex:1;
        a{
          width:100%;
          height:100%;
          cursor: pointer;
        }
        img{
          width:1.282rem;
          height:1.282rem;
          vertical-align: top;
          margin:0 0 0.427rem;
        }
        p{
          font-size:0.598rem;
          color: #111111;
          font-family: "SFCompactText-Regular";
        }
      }
    }
  }
  .g-share-cover1{
    height:6.83rem;
  }
}
</style>
