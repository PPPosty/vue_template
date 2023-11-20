<template>
  <div>
  <h1>{{ name }}</h1>
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

    