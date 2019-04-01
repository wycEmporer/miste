
export const loginUserInfo = 'loginUserInfo';
export const isLoginInfo = "isLoginInfo";
export const XUser = {
  state: {
  	user:null,
    isLogin: null,
  },
  getters: {
  	userInfo:state => state.user,
    isLogin: state => state.isLogin
  },
  mutations: {
  	[loginUserInfo] (state,user){
  		state.user = user;
  	},
    [isLoginInfo](state, isLogin){
      state.isLogin = isLogin;
    }
  }
}
