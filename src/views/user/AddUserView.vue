<template>
  <!-- <div class="temple">

    <div    style="width: 60vw; margin: 50px auto;" >
      <div class="panel-heading">用户注册</div>
      <div class="panel-body">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="登录账号：" prop="uname" class="inp">
            <el-input v-model="ruleForm.uname" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="登录密码：" prop="upass" class="inp">
            <el-input v-model="ruleForm.upass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="电话号：" prop="tel" class="inp">
            <el-input v-model="ruleForm.tel" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm(ruleForm)">注册账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div> -->
  <div class="login">
    <div class="login-box">
      <div class="login-form-wrapper">
        <div style="transform: translateZ(0px); opacity: 1">
          <h2>用户注册</h2>
        </div>
        <section class="login-form">
          <div class="form-item">
            <el-input v-model="ruleForm.uname" size="large" placeholder="用户名" :prefix-icon="Avatar"></el-input>
          </div>

          <div class="form-item">
            <el-input
              v-model="ruleForm.upass"
              size="large"
              placeholder="密码"
              show-password
              :prefix-icon="Lock"
            ></el-input>
          </div>

          <div class="form-item">
            <el-input v-model="ruleForm.tel" size="large" placeholder="电话号" :prefix-icon="Iphone"></el-input>
          </div>

          <div class="button-row">
            <el-button type="primary" @click="submitForm(ruleForm)">注册账号</el-button>
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
// import axios from "@/util/request"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'login',
  setup() {
    // 定义数据
    const store = useStore()
    const router = useRouter()
    const data = reactive({
      user: {},
      userSession: {},
      ruleForm: {
        uname: '',
        upass: '',
      },
      rules: {
        uname: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],

        tel: [{ required: true, message: '请输入电话号', trigger: 'blur' }],
        upass: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
      },
    })
    const submitForm = (ruleForm) => {
      axios.post('/user/addUser', ruleForm).then((res) => {
        if (res.data.mess === 'ok') {
          // 往session中存放时：需要用JSON.stringify(res.data.user)
          alert('注册成功')
          router.push('/user/main')
        } else {
          alert('注册失败！')
        }
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
<style scoped lang="less">
.login {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
