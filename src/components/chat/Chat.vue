<template>
  
</template>

<script>
export default {
  name: 'Chat',
  data(){
    return{
      campaignId:'4',
      nodeflowId: '3',
      ameyoUrl: 'https://happyeasygo.ameyo.net:8443'
    }
  },
  methods:{
    onload(){
      try{
        window.initializeChat(this.campaignId,this.nodeflowId, this.ameyoUrl)
      }catch(err){}
    },
    loadChatJs(){
      const ameyo_emerge_script = document.createElement('script');
      ameyo_emerge_script.src = "https://happyeasygo.ameyo.net:8443/app/ameyochatjs/ameyo-emerge-chat.js";
      ameyo_emerge_script.async = true;
      ameyo_emerge_script.defer = true;

      document.getElementsByTagName('head')[0].appendChild(ameyo_emerge_script);

      const ameyo_script = document.createElement('script');

      ameyo_script.onload = () => {
        this.onload();
      }
      ameyo_script.src = `${this.ameyoUrl}/ameyochatjs/ameyo-emerge-chat.js`

      document.getElementsByTagName('head')[0].appendChild(ameyo_script);
    }
  },
  created(){
    this.loadChatJs();
  },
  activated(){
    this.loadChatJs();
  },
  beforeDestroy(){
    const chatIFrame = document.getElementById('cboxmain');
    if(chatIFrame != null){
      const parentNode = chatIFrame.parentNode
      parentNode.removeChild(chatIFrame);
    }
  },
  deactivated(){
    const chatIFrame = document.getElementById('cboxmain');
    if(chatIFrame != null){
      const parentNode = chatIFrame.parentNode
      parentNode.removeChild(chatIFrame);
    }
  }
}
</script>
