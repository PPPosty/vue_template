<template>
  <div class="temple" style="text-align:center ; padding: 50px auto;">
    <h2>订单已经提交成功！！！！</h2>

  </div>
</template>
<script>
import { reactive, toRefs } from "vue"
import { useRoute,useRouter } from "vue-router"
import axios from "axios"
export default {
  name: "orderDone",
  setup() {
    // 定义数据
    const router=useRouter()
    const route=useRoute()
    const data = reactive({
       aname:"haha",
       age:0
    })
    // 方法，箭头函数
    const handleMsg=()=>{
      console.log("route.params.aname",route.params.aname);
      data.aname=route.params.aname;
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleMsg
    }
  }
}
</script>
<style scoped>

</style>
