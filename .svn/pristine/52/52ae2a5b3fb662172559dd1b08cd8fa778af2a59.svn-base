export class RefundUtil {

	static getRefundPrice(vueComp,url){
		return new Promise((resolve,reject)=>{
			vueComp.$http.jsonp(url).then((res)=>{
				resolve(res);
			},(error)=>{
				reject(error);
			})
		})
	}

	static applyForRefund(vueComp,url){
		return new Promise((resolve,reject)=>{
			vueComp.$http.post(url).then((res)=>{
				resolve(res)
			},(error)=>{
				reject(error);
			})
		})
	}

	static changeForTrip(vueComp,url,data){
		return new Promise((resolve,reject)=>{
			vueComp.$http.post(url,data).then((res)=>{
				resolve(res);
			},(err)=>{
				reject(err);
			})
		})
	}
}