import * as types from '../../types/types.js'
export const Discount = {
	state:{
		coupon:null,
		silver:null,
		gold:null
	},
	getters:{
		coupon:state=>state.coupon,
		silver:state=>state.silver,
		gold:state=>state.gold
	},
	mutations:{
		[types.GET_COUPON](state,coupon){
			state.coupon = coupon;
		},
		[types.GET_SILVER](state,silver){
			state.silver = silver;
		},
		[types.GET_GOLD](state,gold){
			state.gold = gold;
		}
	}
}