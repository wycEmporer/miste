import {XFlightOrder} from './models/flightorder/XFlightOrder.js'
import {XUser} from './models/user/XUser.js'
import {XFlight} from './models/flight/XFlight.js'
import {OrderDetail} from './models/orderDetail/OrderDetail.js'
import {Discount} from './models/discount/discount.js'
import Vuex from 'vuex'
import Vue from 'vue'
import * as mutaionNames from './models/flightorder/MutationName.js'

//config vuex 
Vue.use(Vuex)

export const store = new Vuex.Store({
	modules:{
		flightOrder: XFlightOrder,
		user: XUser,
		flihgt:XFlight,
		orderDetail: OrderDetail,
		discount:Discount
	}
})

export {mutaionNames}