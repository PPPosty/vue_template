import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'


const routes = [
  //管理员
  {
    path: '/admin/login',
    component: () => import('../views/admin/LoginView.vue')
  },
  {
    path: '/admin/main',
    component: () => import('../views/admin/MainView.vue'),
    redirect: "/admin/showSpot",
    children: [
      {
        path: '/admin/addSpot',
        meta: { act: "admin" },
        component: () => import('../views/admin/SpotAddView.vue')
      },
      {
        path: '/admin/showSpot',
        meta: { act: "admin" },
        component: () => import('../views/admin/SpotManageView.vue')
      },
      {
        path: '/admin/showUser',
        meta: { act: "admin" },
        component: () => import('../views/admin/UserManageView.vue')
      },
      {
        path: '/admin/updateSpot',
        meta: { act: "admin" },
        component: () => import('../views/admin/SpotUpdateView.vue')
      },
      {
        path: '/admin/addType',
        meta: { act: "admin" },
        component: () => import('../views/admin/TypeAddView.vue')
      },
      {
        path: '/admin/showType',
        meta: { act: "admin" },
        component: () => import('../views/admin/TypeManageView.vue')
      },
      {
        path: '/admin/updateType',
        meta: { act: "admin" },
        component: () => import('../views/admin/TypeUpdateView.vue')
      },
      {
        path: '/admin/showOrder',
        meta: { act: "admin" },
        component: () => import('../views/admin/OrderManagerView.vue')
      },
      {
        path: '/admin/showOrderDetail',
        meta: { act: "admin" },
        component: () => import('../views/admin/OrderDetailManageView.vue')
      },
    ]
  },
  //前台用户
  {
    path: '/',
    component: () => import('../views/user/HomeView.vue'),
    redirect: "/user/main",
    children: [
      {
        path: '/user/main',
        component: () => import('../views/user/MainView.vue')
      },
      {
        path: '/user/ShowSpot',
        component: () => import('../views/user/ShowSpotView.vue')
      },
      {
        path: '/user/SpotDetails',
        component: () => import('../views/user/SpotDetailView.vue')
      },
      {
        path: '/user/addUserView',
        component: () => import('../views/user/AddUserView.vue')
      },
      {
        path: '/user/userView',
        component: () => import('../views/user/UserView.vue')
      },

      {
        path: '/user/login',
        component: () => import('../views/user/LoginView.vue')
      },
      {
        path: '/shop/Cart',
        meta:{act:"shop"},
        component: () => import('../views/user/CartView.vue')
      },

      {
        path: '/shop/orderConfirm',
        meta:{act:"shop"},
        component: () => import('../views/user/OrderConfirmView.vue')
      },
      {
        path: '/shop/orderDone',
        meta:{act:"shop"},
        component: () => import('../views/user/OrderDone.vue')
      },
      {
        path: '/shop/orderView',
        meta:{act:"shop"},
        component: () => import('../views/user/OrderView.vue')
      },
      {
        path: '/shop/orderDetailView',
        meta:{act:"shop"},
        component: () => import('../views/user/OrderDetailView.vue')
      },


    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/storeDemo',
    component: () => import('../views/demo/StoreView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to,from,next)=>{
//   /**
//    * to:目标请求地址
//    * from："/"
//    * next:只有执行next()，页面才能实现跳转
//    */
//   console.log("to",to);
//   if(to.meta.act=="admin"){
//     console.log("需要登录");
//   }
//   if(store.state.isAdminLogin==0){
//     console.log("未登录")
//      if(to.path=="/admin/login" || to.path=="/"){
//       console.log("未登录1")
//       next()
//      }else{
//       alert("请你先登录！")
//       next("/")
//      }
//   }else{
//     console.log("已登录");
//     next();
//   }

// })



export default router
