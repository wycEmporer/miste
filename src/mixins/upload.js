// import {Toast} from 'mint-ui';

export default{
  // props:{
  //   singleFlile: {
  //     type: Boolean,
  //     default: true,
  //   },
  //   fileSize: {
  //     type: Number,
  //     default: 10
  //   }
  // },
  data(){
    return {
      files:null,
    }
  },
  methods:{
    onChange(e){
      const files = e.target.files || e.dataTransfer.files;
      this.files = files;
      // if(singleFlile){
      //   const size = files[0].size / 1024;
      //   if(size > fileSize){
      //     Toast({
      //       message: 'The files should not be larger than 10 mb',
      //       duration: 2000,
      //     })
      //     // files = null;
      //     return;
      //   }
      // }
      this.emitFile();
    },
    emitFile(){
      this.$emit('getFiles', this.files);
    },
  }
}