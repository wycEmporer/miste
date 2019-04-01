export class Http {
  // static getRequest(vueComp,url){
  // 	return new Promise((resolve,reject)=>{
  // 		vueComp.$http.get(url,{ withCredentials : true }).then((res)=>{
  // 			res.json().then((data)=>{
  // 				resolve(data);
  // 			},(err)=>{
  // 				reject(err);
  // 			})
  // 		}).catch((err)=>{
  // 			reject(err);
  // 		})
  // 	})
  // }

  static getRequest(vueComp, url) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(url, { withCredentials: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static postRequest(vueComp, url, data = {}) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(url, data)
        .then(res => {
          res.json().then(
            data => {
              resolve(data);
            },
            err => {
              reject(err);
            }
          );
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
