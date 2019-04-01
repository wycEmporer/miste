import {DomainManager} from '../../config/DomainManager.js'
import {Http} from '../../models/http'

export class Silver {
	constructor(){

	}

	static getSilverPrice(vueComp){
		let url = DomainManager.balanceOfSilver();
		return Http.getRequest(vueComp,url);
	}

	static getSilverRunning(vueComp){
		let url = DomainManager.getHappySilver();
		return Http.getRequest(vueComp,url);
	}

	static getSilverRunningNew(vueComp){
		let url = DomainManager.getHappySilverNew();
		return Http.getRequest(vueComp,url);
	}

	static getGoldAndSilver(vueComp){
	
		let url = DomainManager.searchGoldAndSilver();
		return Http.getRequest(vueComp,url);
	}

}