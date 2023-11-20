<template>
  <div>
      {{ $store.state.counter }}
      {{ $store.state.uname }}
   getters用法：   {{ $store.getters.getCounter }}
      <button @click="login">按钮</button>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  name: "type",
  setup() {
    const store = useStore()
    //页面初始化方法
    const data = reactive({
      counter:0,
      uname:""
    });
    const login = () => {
          data.counter=store.state.counter;
         console.log(data.counter);
         data.uname=store.state.uname;  
         console.log(data.uname);
         store.commit("changeCouter",10);

    };
  
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

    