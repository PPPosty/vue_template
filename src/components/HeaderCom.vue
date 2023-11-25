<template>
  <div class="header">
    <div class="title">大连旅游网站 - 后台</div>
    <div class="right">
      <svg viewBox="0 0 1024 1024" width="24">
        <path
          fill="#2c3e50"
          d="M511.626 1.896C229.572 1.896 0.927 230.541 0.927 512.595c0 282.055 228.645 510.699 510.699 510.699s510.698-228.645 510.698-510.699S793.68 1.896 511.626 1.896z m0 69.641c243.606 0 441.058 197.474 441.058 441.058 0 87.347-25.392 168.762-69.194 237.271-73.419-77.609-170.944-132.204-280.597-151.829 70.004-33.755 118.404-105.164 118.404-188.066 0-115.388-93.535-208.922-208.923-208.922S303.452 294.583 303.452 409.97c0 82.902 48.399 154.311 118.403 188.066-110.093 19.704-207.96 74.661-281.479 152.77-44.177-68.704-69.808-150.465-69.808-238.211 0-243.584 197.496-441.058 441.058-441.058z"
        ></path>
      </svg>
      {{ userName }}
      <div class="logout" @click="loginout">退出登录</div>
    </div>
    <!-- <img src="../assets/a.jpg" style="width:99%;height:268px;"/> -->
  </div>
  <img src="https://dimg04.c-ctrip.com/images/0zg4x120009bcpxsr1A15.jpg" style="width: 100%; height: 268px" />
</template>

<script setup>
import { useRouter } from 'vue-router'
const Router = useRouter()
const userInfo = JSON.parse(sessionStorage.getItem('admin'))
const userName = userInfo?.aname ?? ''

const loginout = () => {
  sessionStorage.removeItem('admin')
  Router.push('/admin/login')
}
</script>

<style scoped lang="less">
img {
  object-fit: cover;
}
.header {
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-weight: 700;
  font-size: 19px;
}
.right {
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  .logout {
    margin-left: 11px;
    cursor: pointer;
  }
}
</style>
