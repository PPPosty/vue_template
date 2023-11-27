<template>
  <!-- <div  style="width: 80vw; margin: 40px auto">
    <img src="../../assets/logins.jpg" style="width:800px;"/>

    <div class="panel-body">
      <el-form
        ref="ruleFormRef"
        :model="admin"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="管理员账号：" prop="aname">
          <el-input v-model="admin.aname" autocomplete="off" />
        </el-form-item>

        <el-form-item label="管理员密码：" prop="apass">
          <el-input v-model="admin.apass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm(admin)">管理员登录</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
  -->
  <div class="select-none">
    <img class="wave" src="@/assets/images/bg.png" />
  </div>
  <div class="login-container">
    <div class="img">
      <img src="@/assets/images/work.svg" alt="" />
    </div>
    <div class="login-box">
      <div class="login-form-wrapper">
        <div style="transform: translateZ(0px); opacity: 1">
          <h2>旅游网后台登录</h2>

          <a href="/user/main">前往首页</a>
        </div>
        <section class="login-form">
          <div class="form-item">
            <el-input v-model="admin.aname" size="large" placeholder="管理员账号" :prefix-icon="Avatar"></el-input>
          </div>

          <div class="form-item">
            <el-input v-model="admin.apass" size="large" placeholder="管理员密码" :prefix-icon="Lock"></el-input>
          </div>

          <div class="button-row">
            <el-button type="primary" @click="submitForm(admin)">管理员登录</el-button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Avatar, Lock, Iphone } from '@element-plus/icons-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'type',
  setup() {
    const router = useRouter()
    const store = useStore()
    //页面初始化方法
    const data = reactive({
      admin: {
        aname: '',
        apass: '',
      },
      rules: {
        aname: [
          {
            required: true,
            message: '名称不能为空！',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: '名字长度为1-10 位！',
            trigger: 'blur',
          },
        ],
        apass: [
          {
            required: true,
            message: '密码不能为空！',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: '名字长度为1-10 位！',
            trigger: 'blur',
          },
        ],
      },
    })
    const submitForm = (formData) => {
      axios
        .post('/admin/login', formData)
        .then((res) => {
          if (res.data.mess === 'ok') {
            alert('登录成功！')
            window.sessionStorage.setItem('admin', JSON.stringify(res.data.admin))
            store.commit('changeAdminLogin', res.data.admin)
            //  data.admin = JSON.parse(window.sessionStorage.getItem("admin"));
            //  data.admin1=res.data.admin;
            router.push('/admin/main')
          } else {
            alert('账号或密码有误！')
          }
          // console.log("mess",res.data.mess);
          // console.log("admin",data.admin1);
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      submitForm,
      Avatar,
      Lock,
      Iphone,
    }
  },
}
</script>
<style lang="less" scoped>
.wave {
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  z-index: -1;
  max-width: 100%;
  display: block;
}

.login-container {
  display: flex;
  justify-content: center;
  gap: 16%;
  height: 100vh;
  .img {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    img {
      width: 500px;
      height: 500px;
      user-select: none;
    }
  }
  .login-box {
    align-items: center;
    display: flex;
    text-align: center;
    .login-form-wrapper {
      width: 360px;
      img {
        width: 65px;
      }
      h2 {
        color: #555;
        // font: 700 200% Consolas, Monaco, monospace;
        margin: 15px 0;
        text-transform: uppercase;
      }
    }
  }
}

.login-form {
  .form-item {
    padding: 10px 0;
  }

  .hascode {
    display: flex;
    .el-button {
      margin-left: 16px;
    }
  }
  .button-row {
    margin-top: 14px;
    text-align: center;
    .el-button {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .login-container {
    gap: 0;
  }
}
</style>
