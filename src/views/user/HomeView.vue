<template>
  <div class="container-fruid">
    <div :key="$route.fullPath">
      <head-view></head-view>
      <img src="https://dimg04.c-ctrip.com/images/0zg4x120009bcpxsr1A15.jpg" style="width: 100%; height: 300px" />
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import headView from '@/components/HeaderView.vue'
export default {
  name: 'userHome',
  components: {
    headView,
  },
}
</script>
