
export const orderType = "orderDetail"

export const OrderDetail = {

	state:{
		orders:null
	},
	mutations:{
		[orderType](state,orders){
			state.orders = orders;
		}
	},
	getters:{
		orderDetail(state){
			return state.orders;
		}
	}
}