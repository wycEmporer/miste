<template>
  <div id="my-careers">
    <head-top class="header">
			<i slot="left" class="iconfont icon-back"></i>
			<span slot="title" class="title">Apply Online</span>
			<i slot="right" class="sp iconfont icon-back" style="opacity:0;"></i>
		</head-top>
    <div class="content">
      <form enctype="multipart/form-data" @submit.prevent="onSubmit" id="fileForm" >
        <div class="form">
          <h3>Customer Car Manager</h3>
          <ul class="form-group">
            <li class="info-name">
              <input type="text" v-focus :class="{errli:form.nameErr}" name="name" placeholder="Name" v-model="applyInfo.name" >
              <p class="errP" v-if="form.nameErr">{{form.nameMsg}}</p>
            </li>
            <li class="info-email">
              <input type="text" :class="{errli:form.emailErr}" name="email" placeholder="Email Address" v-model="applyInfo.email" >
              <p class="errP" v-if="form.emailErr">{{form.emailMsg}}</p>
            </li>
            <li class="info-mobile">
              <input type="number" :class="{errli:form.mobileErr}" name="mobile" placeholder="Mobile Number" v-model="applyInfo.mobile" >
              <p class="errP" v-if="form.mobileErr">{{form.mobileMsg}}</p>
            </li>
            <li class="info-location">
              <input type="text" :class="{errli:form.locationErr}" name="location" placeholder="Current Location" v-model="applyInfo.location" >
              <p class="errP" v-if="form.locationErr">{{form.locationMsg}}</p>
            </li>
            <li class="reason-li" :class="{'info-reason':applyInfo.joinReason.split('').length >= 300}">
              <textarea :class="{errli:form.joinReasonErr}" name="joinReason" v-model="applyInfo.joinReason" rows="5" cols="20" placeholder="Why do you want to join HappyEasy Go?" ></textarea>
              <span>{{wordNumber}}</span>
              <p class="errP" v-if="form.joinReasonErr">{{form.joinReasonMsg}}</p>
            </li>
            <li class="info-link">
              <input type="text" :class="{errli:form.linkedinUrlErr}" name="linkedinUrl" placeholder="LinkedIn URL (Optional)" v-model="applyInfo.linkedinUrl" >
              <p class="errP" v-if="form.linkedinUrlErr" >{{form.linkedinUrlMsg}}</p>
            </li>
            <li class="info-file" >
              <span class="file-span" v-if="fileObj != null" v-show="isSelectFile">{{fileObj.name}}</span>
              <p v-show="!isSelectFile">Attach Resume</p>
              <p v-show="!isSelectFile">(Microsoft Word or PDF file is allowed (5MB))</p>
              <p><input type="file" id="upfile" accept="application/msword,application/pdf" name="upfile" @change="selectFile" ><span>Upload file</span> or drag and drop</p>
            </li>
            <li class="info-btns flex space-between" >
              <button @click="infoJustify" :class="{active:true}">Submit</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
    <div class="career-cover" v-show="showDialog"></div>
    <div class="career-dialog" v-show="showDialog">
      <div class="d-top">
        Apply Online
      </div>
      <div class="d-center">
        Thank you for applying to this job!
      </div>
      <div class="d-bottom">
        <button @click="applySuccess">OK</button>
      </div>
      <img :src="dialogBg" alt="">
    </div>
  </div>
</template>
<script>
import { Toast, Indicator, Spinner } from 'mint-ui';
import { Reg } from '../../models/utils';
import headTop from "../../components/head/head.vue";
import { DomainManager } from '../../config/DomainManager';
export default {
  components:{
    headTop,
  },
  data(){
    return {
      arr:[],
      fileObj:null,
      showDialog:false,
      isSelectFile:false,
      dialogBg:require('../../assets/images/joinus/join-character.png'),
      applyInfo:{
        name:"",
        email:"",
        mobile:"",
        location:"",
        joinReason:"",
        linkedinUrl:"",
        positionId:null,
        departmentId:null,
      },
      form:{
        nameMsg:"Please enter a valid name",nameErr:false,
        emailMsg:"Please enter a valid Email Address",emailErr:false,
        mobileMsg:"Please enter a valid Mobile Number",mobileErr:false,
        locationMsg:"Please enter your current location",locationErr:false,
        joinReasonMsg:"Please write down your reason",joinReasonErr:false,
        linkedinUrlMsg:"",linkedinUrlErr:false,
        fileMsg:"Microsoft Word or PDF file is allowed (<5MB)",
        fileNull:"Please Upload your attach resume",
        submitFail:"Something's wrong, Please try it again",
        submitting:"Uploading...Please wait",
      },
    }
  },
  computed:{
    wordNumber(){
      let number = this.applyInfo.joinReason.split("").length;
      return (300 - number);
    }
  },
  watch:{
    applyInfo:{
      handler:function(val,oldV){
        if(this.applyInfo.joinReason.split('').length >= 300){
          this.applyInfo.joinReason = this.applyInfo.joinReason.substr(0,300);
        }
        if(this.applyInfo.name != ""){
          this.form.nameErr = false;
        } 
        if(this.applyInfo.email != ""){
          this.form.emailErr = false;
        } 
        if(this.applyInfo.mobile != ""){
          this.form.mobileErr = false;
        } 
        if(this.applyInfo.location != ""){
          this.form.locationErr = false;
        }
        if(this.applyInfo.joinReason != ""){
          this.form.joinReasonErr = false;
        }
      },
      deep:true
    }
  },
  methods:{
    selectFile(){
      let size;
      this.fileObj = document.getElementById("upfile").files[0];
      if(this.fileObj){
        this.arr.push(this.fileObj);
        size = (this.fileObj.size / (1024 * 1024)).toFixed(2);
        let idx = this.fileObj.name.lastIndexOf(".");
        if (idx != -1){   
          let ext = this.fileObj.name.substr(idx+1).toUpperCase();   
          ext = ext.toLowerCase( ); 
          if (ext != 'pdf' && ext != 'doc' && ext !='docx'){
            Toast("You can upload.pdf,.doc,.docx files only.")
            if(this.arr.length >= 1){
              this.fileObj = this.arr[0];
            }else{
              this.isSelectFile = false;
            }
          }else{
            if(size >= 5){
              Toast("Please select files within 5M")
              if(this.arr.length >= 1){
                this.fileObj = this.arr[0];
              }else{
                this.isSelectFile = false;
              }
            }else{
              this.arr[0] = this.fileObj;
              this.isSelectFile = true;
            }
          }
        }
      }else{
        if(this.arr.length >= 1){
          this.fileObj = this.arr[0];
        }else{
          this.isSelectFile = false;
        }
      }
    },
    infoJustify(){
      if(this.applyInfo.name == "" || !Reg.name.test(this.applyInfo.name)){
        this.form.nameErr = true;
      }else if(this.applyInfo.email == "" || !Reg.email.test(this.applyInfo.email)){
        this.form.nameErr = false;
        this.form.emailErr = true;
      }else if(this.applyInfo.mobile == ""){
        this.form.nameErr = false;
        this.form.emailErr = false;
        this.form.mobileErr = true;
      }else if(this.applyInfo.location == ""){
        this.form.nameErr = false;
        this.form.emailErr = false;
        this.form.mobileErr = false;
        this.form.locationErr = true;
      }else if(this.applyInfo.joinReason == ""){
        this.form.nameErr = false;
        this.form.emailErr = false;
        this.form.mobileErr = false;
        this.form.locationErr = false;
        this.form.joinReasonErr = true;
      }else if(this.fileObj == null){
        this.form.nameErr = false;
        this.form.emailErr = false;
        this.form.mobileErr = false;
        this.form.locationErr = false;
        this.form.joinReasonErr = false;
        Toast({
          message:"Please select the file",
          duration:1500
        });
      }else{
        this.form.nameErr = false;
        this.form.emailErr = false;
        this.form.mobileErr = false;
        this.form.locationErr = false;
        this.form.joinReasonErr = false;
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        this.fileUpload();
      }
    },
    fileUpload(){
      let fileForm = document.getElementById("fileForm");
      let url = DomainManager.saveCareer();
      let params = this.$route.query;
      let formData = new FormData(fileForm);
      formData.append("positionId",params.id);
      formData.append("departmentId",params.departmentId);
      this.$axios({
        url:url,
        method:"post",
        data:formData,
        headers:{"Content-Type":"multipart/form-data"},
      }).then(res => {
        if(res.succ){
          Indicator.close();
          this.arr = [];
          this.fileObj = null;
          this.showDialog = true;
          this.isSelectFile = false;
          this.applyInfo.name = "";
          this.applyInfo.email = "";
          this.applyInfo.mobile = "";
          this.applyInfo.location = "";
          this.applyInfo.joinReason = "";
          this.applyInfo.linkedinUrl = "";
        }else{
          Indicator.close();
          Toast(res.msg);
        }
      }).catch(err =>{
        Indicator.close();
        console.log(err)
      });
    },
    applySuccess(){
      this.showDialog = false;
      this.$router.push({path:'/careersdetail',query:{id:this.$route.query.id}});
    },
    onSubmit(){
      return false;
    }
  },
  directives:{
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="less" scoped>
#my-careers{
  position: relative;
  .content{
    padding: 2.04rem 0.64rem 0;
    text-align: left;
    h3{
      font-size:0.769rem;
      padding: 0.64rem 0;
    }
    .form-group{
      li{
        width:100%;
        color:#999;
        margin-bottom:0.95rem;
        position: relative;
        input,textarea{
          width:93.5%;
          padding:0.4rem 3%;
          vertical-align: top;
          font-size: 0.6rem;
          border:1px solid #ddd;
          border-radius:3px;
        }
        *::placeholder{
          color:#999; 
        }
      }
      .reason-li{
        textarea{font-family: inherit;}
        span{
          font-size:0.6rem;
          position: absolute;
          bottom: 0.2rem;
          right: 2%;
        }
      }
      .info-reason{
        textarea{resize: none;}
      }
      .info-file{
        border:1px dashed #eee;
        font-size: 0.6rem;
        text-align: center;
        padding:0.6rem 0;
        height:2rem;
        margin-bottom:0.8rem;
        .file-span{
          color:#999;
          background:#fff;
          padding:0.2rem 0.5rem;
          margin-bottom:0.3rem;
          border:1px solid #ddd;
          border-radius:3px;
          box-shadow:0 2px 5px #999;
        }
        p{
          position: relative;
          line-height:0.85rem;
          color:#999;
          span{
            color:#0b9d78;
          }
          input{
            position: absolute;
            width:2.8rem;
            opacity: 0;
            display:inline-block;
            padding:0;
            border:0;
          }
        }
      }
      .info-btns{
        margin-bottom: 0;
        button{
          cursor: pointer;
          width:9rem;
          padding:0.2rem 0;
          font-size: 0.726rem;
          color:#999;
          background: #eee;
          border-radius:3px;
          margin:auto;
        }
        .active{
          color:#fff;
          background: #ffa000;
        }
      }
      .errli{
        border:1px solid #d32f2f;
      }
      .errP{
        position: absolute;
        font-size:0.5rem;
        color:#d32f2f;
        left: 0;
        bottom: -0.75rem;
        padding-left:3%;
      }
    }
  }
  .career-cover{
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index:10;
  }
  .career-dialog{
    width:12rem;
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    margin:auto;
    z-index:11;
    background:rgba(255, 255, 255, 1);
    padding:0.8rem 1rem 0.8rem 0.64rem;
    border-radius:5px;
    overflow: hidden;
    .d-top{
      font-size: 0.512rem;
      color:#666;
      display:flex;
      align-items: center;
      font-weight: bold;
    }
    .d-top::after{
      display:block;
      content:"";
      flex:1;
      margin-left:0.8rem;
      border-top:1px solid #999;
    }
    .d-center{
      padding:1.8rem 0 1.6rem;
      color:#0b9d78;
      font-size: 0.68rem;
      font-weight: bold;
    }
    .d-bottom{
      position: relative;
      height:0.8rem;
      margin-bottom:0.6rem;
      button{
        position: absolute;
        width:8.5rem;
        padding:0.3rem 0;
        font-size: 0.726rem;
        color:#fff;
        background: #ffa000;
        border-radius:3px;
        left: 0;
        right: 0;
        margin:auto;
        z-index:9;
      }
    }
    img{
      opacity: 0.2;
      position:absolute;
      width:6rem;
      top: 2rem;
      right: -0.4rem;
      z-index:8;
    }
  }
}
</style>
