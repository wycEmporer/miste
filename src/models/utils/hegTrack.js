
export function hegTrack(vueComp, obj){
  obj = obj || {};
  vueComp.$axios({
    url:'/heg_logs/saveTrackLogs.do',
    method: 'post',
    data: JSON.stringify(obj),
    responseType: 'json',
    headers:{
      'Content-Type': 'application/json',
      'x-Device': 'mobile'
    }
  }).then(res =>{
    
  }).catch(err => {
  })
}

