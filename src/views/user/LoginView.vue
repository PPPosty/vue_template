<template>
  <div class="temple">

    <div  style="width: 60vw; margin: 50px auto;" >
      <div class="panel-heading">用户登录</div>
      <div class="panel-body">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="用户名：" prop="uname" class="inp">
            <el-input v-model="ruleForm.uname" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码：" prop="upass" class="inp">
            <el-input v-model="ruleForm.upass" type="password" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="submitForm(ruleForm)">确认登录</el-button>

          </el-form-item>
        </el-form>

      </div>

    </div>



  </div>
</template>

<script>
import { reactive, toRefs } from "vue"
import axios from "axios"
// import axios from "@/util/request"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
  name: "login",
  setup() {
    // 定义数据
    const store = useStore()
    const router = useRouter()
    const data = reactive({
       user:{},
      userSession:{},
      ruleForm: {
        uname: "",
        upass: ""
      },
       rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        upass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
       ]
      }

    })
    const submitForm = (ruleForm) => {
      axios.post('/user/login',ruleForm)
      .then(res => {
        if (res.data.mess === "ok") {
          // 往session中存放时：需要用JSON.stringify(res.data.user)
          window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
          alert('登录成功')
          router.go(0);//刷新页面
          router.push("/user/main")
        } else {
          alert('用户名或密码错误！')
        }
      })
    }

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      submitForm
    }
  }
}
</script>
<style scoped></style>
