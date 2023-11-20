<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      background-color="black"
      text-color="#fff"
      active-text-color="#ffd04b"
       >
      <el-menu-item index="0">
        <a >大连旅游网站</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/user/main">首页</a>
      </el-menu-item>

      <el-menu-item index="1"  v-show="hasLogin">
        <span>用户{{user.uname }}：</span>
        <a @click="loginout">安全退出</a>
      </el-menu-item>

      <el-menu-item index="2" v-show="!hasLogin">
        <a href="/user/addUserView">注册</a>
      </el-menu-item>
      <el-menu-item index="3" v-show="!hasLogin">
        <a href="/user/login">登录</a>
      </el-menu-item>

      <div class="flex-grow" />
      <el-menu-item index="4">
        <a href="/shop/cart">

          购物车</a>
      </el-menu-item>
      <el-menu-item index="5">
        <a href="/shop/orderView">消费订单</a>
      </el-menu-item>
       <el-menu-item index="6-1"><a href="/user/userView">账号管理</a></el-menu-item>

        <el-menu-item index="8">
       <a href="/admin/login">进入后台</a>
      </el-menu-item>
    </el-menu>

  </div>
  <!-- *******************************************************************88 -->
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
   name: "headView",
  setup() {
     // 定义数据
    const router = useRouter();

    const data = reactive({
          user: {},
      hasLogin: false,
      pics: [
        "yd_210319_content_FL_pctop_1500x200.jpg",
        "yd_210326_content_Spring_pctop_1500x200.jpg",
        "yd_210330_ku_Apr_pctop_1500x200.jpg",
      ],
      typeList:[],

    });
    // 初始化
    onMounted(() => {
      if (window.sessionStorage.getItem("user") != null) {
        data.hasLogin = true;
        data.user=JSON.parse(window.sessionStorage.getItem("user"));
      }
      //获得类型*********************88
      axios.get("/admin/getTypeList").then((res) => {
          data.typeList = res.data.typeList;
        });
    });
    const loginout = () => {
      sessionStorage.removeItem("uname")
      sessionStorage.removeItem("user")
      alert("退出成功");
      router.go(0);//刷新页面

    }

       // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      loginout

    };
  },
};
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>

