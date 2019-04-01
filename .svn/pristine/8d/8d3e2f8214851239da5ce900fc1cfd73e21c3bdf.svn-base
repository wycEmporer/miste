import {DomainManager} from '../../config/DomainManager.js'
import {Http} from '../http'

export class Gold{
	constructor(){

	}

	static getGoldPrice(vueComp){
		let url = DomainManager.balanceOfGold();
		return Http.getRequest(vueComp,url);
	}

	static getGoldRunning(vueComp){
		let url = DomainManager.getHappyGold();
		return Http.getRequest(vueComp,url);
	}
	static getGoldRunningNew(vueComp){
		let url = DomainManager.getHappyGoldNew();
		return Http.getRequest(vueComp,url);
	}
}