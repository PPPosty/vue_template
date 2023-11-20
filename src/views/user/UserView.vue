<template>
  <div class="temple">

    <div    style="width: 60vw; margin: 50px auto;" >
      <div class="panel-heading">用户修改</div>
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
            <el-button type="danger" @click="submitForm(ruleForm)">确认修改</el-button>

          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {onMounted, reactive, toRefs} from "vue"
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
      ruleForm: {},
       rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],

         tel: [
           { required: true, message: '请输入电话号', trigger: 'blur' },
         ],
        upass: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
       ]
      }

    })
    onMounted(() => {
      data.user = null;
      data.user = JSON.parse(window.sessionStorage.getItem("user"));
      // 判断是否已经登录
      if (data.user != null) {
        data.ruleForm =  data.user
      }
      else{
        alert("请您登录个人账号！");
        window.location.href = "/user/login";
      }

    });
    const submitForm = (ruleForm) => {
      axios.post('/user/updateUser',ruleForm)
      .then(res => {
        if (res.data.mess === "ok") {
          window.sessionStorage.setItem('user',JSON.stringify(res.data.user))
          alert(JSON.stringify(res.data.user))
          alert('修改成功')
          router.push("/user/main")
        } else {
          alert('修改失败！')
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
