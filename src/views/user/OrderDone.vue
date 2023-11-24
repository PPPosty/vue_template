<template>
  <div class="temple" style="text-align: center; padding: 50px 0">
    <svg width="96" height="96" viewBox="0 0 96 96">
      <path
        fill="#07C160"
        fill-rule="evenodd"
        d="M48 8c22.091 0 40 17.909 40 40S70.091 88 48 88 8 70.091 8 48 25.909 8 48 8zm17.691 26.16L43.294 56.557 32.23 45.494 28 49.724l12.475 12.484.16.152a4 4 0 0 0 5.497-.15l23.81-23.8-4.251-4.25z"
      />
    </svg>

    <h2>&nbsp;&nbsp;&nbsp;&nbsp;订单已经提交成功！！！！</h2>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'orderDone',
  setup() {
    // 定义数据
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      aname: 'haha',
      age: 0,
    })
    // 方法，箭头函数
    const handleMsg = () => {
      console.log('route.params.aname', route.params.aname)
      data.aname = route.params.aname
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleMsg,
    }
  },
}
</script>
<style scoped></style>
