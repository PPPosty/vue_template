<template>
  <div class="container-fruid">
    <head-view></head-view>
    <img src="../../assets/a.jpg" style="width:99%;height:268px;"/>
    <router-view></router-view>

  </div>

</template>
<script>
import headView from "@/components/HeaderView.vue";
export default {
  name: "userHome",
  components: {
    headView,
  },
};
</script>


