<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu :default-active="activeMenu" :default-openeds="[activeMenu]" class="el-menu-vertical-demo">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/admin/showUser"><a href="/admin/showUser">管理用户</a></el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>类型管理</span>
            </template>
            <el-menu-item index="/admin/addType"><a href="/admin/addType">添加类型</a></el-menu-item>
            <el-menu-item index="/admin/showType"><a href="/admin/showType">管理类型</a></el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><OfficeBuilding /></el-icon>
              <span>景点管理</span>
            </template>
            <el-menu-item index="/admin/addSpot"><a href="/admin/addSpot">添加景点</a></el-menu-item>
            <el-menu-item index="/admin/showSpot"><a href="/admin/showSpot">管理景点</a></el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5 ">
            <template #title>
              <el-icon><eleme /></el-icon>
              <span>套餐管理</span>
            </template>
            <el-menu-item index="/admin/addCombo"><a href="/admin/addCombo">添加套餐</a></el-menu-item>
            <el-menu-item index="/admin/showCombo"><a href="/admin/showCombo">管理套餐</a></el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><DocumentCopy /></el-icon>
              <span>销售管理</span>
            </template>
            <el-menu-item index="/admin/showOrder"><a href="/admin/showOrder">售票订单</a></el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'type',
  setup() {
    //页面初始化方法
    const data = reactive({
      name: '大红',
    })
    const login = () => {}
    const route = useRoute()
    const activeMenu = computed(() => {
      console.log(route.path || '')
      return route.path || ''
    })

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      login,
      activeMenu,
    }
  },
}
</script>
<style scoped lang="less">
a {
  text-decoration: none;
}
:deep(.el-sub-menu__title) {
  background-color: #001529;
  color: rgba(254, 254, 254, 0.65);
}
:deep(.el-menu-item) {
  background-color: #0f0303;
  // a {
  //   color: ;
  // }
  &.is-active {
    background-color: #409eff;
    a {
      color: #fff;
    }
  }
}

:deep(.el-menu-item) {
  background-color: #0f0303;
  padding: 0 !important;
  a {
    display: block;
    text-align: left;
    padding: 0 20px 0 40px;
    width: 100%;
    box-sizing: border-box;
  }
  &.is-activ {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
