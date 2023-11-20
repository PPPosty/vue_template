<template><br>
  <div style="height: 90vh;">
  <el-row class="tac">
    <el-col :span="24" >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><eleme /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="1-2"><a href="/admin/showUser">管理用户</a></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><eleme /></el-icon>
            <span>类型管理</span>
          </template>
          <el-menu-item index="2-1"><a href="/admin/addType">添加类型</a></el-menu-item>
          <el-menu-item index="2-2"><a href="/admin/showType">管理类型</a></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><eleme /></el-icon>
            <span>景点管理</span>
          </template>
          <el-menu-item index="3-1"><a href="/admin/addSpot">添加景点</a></el-menu-item>
          <el-menu-item index="3-2"><a href="/admin/showSpot">管理景点</a></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><eleme /></el-icon>
            <span>售票管理</span>
          </template>
         <el-menu-item index="4-1"><a href="/admin/showOrder">售票订单</a></el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  name: "type",
  setup() {
    //页面初始化方法
    const data = reactive({
      name: "大红",
    });
    const login = () => {};

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      login,
    };
  },
};
</script>
<style scoped>
</style>

