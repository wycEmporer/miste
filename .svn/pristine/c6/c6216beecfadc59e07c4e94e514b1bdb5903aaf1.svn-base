import * as mutationNames from './MutationName.js'

export const XFlightOrder = {
  state: {
  	order: null
  },
  getters: {
  	flightOrder: state => state.order
  },
  mutations: {
  	[mutationNames.setupOrder] (state, order) {
  		state.order = order
  	},
    [mutationNames.setBaggageInfo] (state, baggageInfo) {
      state.order.baggageInfo = baggageInfo
    }
  }
}
