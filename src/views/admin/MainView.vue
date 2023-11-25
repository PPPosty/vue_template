<template>
  <div class="common-layout">
    <HeaderCom></HeaderCom>
    <el-container>
      <el-container>
        <el-aside><AsideCom /></el-aside>
        <el-main style="background-color: white">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import HeaderCom from '@/components/HeaderCom.vue'
import AsideCom from '@/components/AsideCom.vue'
export default {
  name: 'type',
  components: {
    HeaderCom,
    AsideCom,
  },
  setup() {
    //页面初始化方法
    const data = reactive({
      name: '大红',
    })
    const login = () => {}

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      login,
    }
  },
}
</script>
<style scoped lang="less">
.el-aside {
  background-color: #001529;
  min-height: calc(100vh - 328px);
}
</style>
