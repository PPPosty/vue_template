<template>
  <div class="temple">

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
          { required: true, message: '请输入登录账号', trigger: 'blur' },
        ],

         tel: [
           { required: true, message: '请输入电话号', trigger: 'blur' },
         ],
        upass: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
       ]
      }

    })
    const submitForm = (ruleForm) => {
      axios.post('/user/addUser',ruleForm)
      .then(res => {
        if (res.data.mess === "ok") {
          // 往session中存放时：需要用JSON.stringify(res.data.user)
          alert('注册成功')
          router.push("/user/main")
        } else {
          alert('注册失败！')
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
