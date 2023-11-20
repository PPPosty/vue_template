import { createStore } from 'vuex'

export default createStore({
  state: {
    counter:-1,
    uname:"杨幂",
    sname:'景点名称',
    cartList:[],
    tempBook:{},
       //用户是否登录
   isUserLogin:window.sessionStorage.getItem('user') == null ? '0' : window.sessionStorage.getItem('user'),
   //管理员
   isAdminLogin:window.sessionStorage.getItem('admin') == null ? '0' : window.sessionStorage.getItem('admin'),

  },
  getters: {
    getCounter(state){
      if(state.counter>0){
        return state.counter
      }else{
        return "counter数据异常"
      }
    }
  },
  mutations: {
    changeCouter(state,num){
      state.counter=state.counter+num;
    },
    changeAdminLogin(state,admin){
      state.isAdminLogin=admin;
    },
    changeUserLogin(state,user){
      state.isUserLogin=user;
    },
    setCartList(state,cartList){

      state.cartList=cartList;
    },
    setTempBook(state,tempBook){
      state.tempBook=tempBook;
    },
    setSname(state,sname){
      state.sname=sname;
    }
  },
  actions: {

  },
  modules: {

  }
})
