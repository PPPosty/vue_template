<template>
  <div  style="width: 80vw; margin: 40px auto">
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
  <a href="/user/main">首页</a>
</template>
<script>
import { reactive, toRefs } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "type",
  setup() {
    const router=useRouter();
    const store = useStore();
    //页面初始化方法
    const data = reactive({
      admin: {
        aname: "",
        apass: "",
      },
      rules: {
        aname: [
          {
            required: true,
            message: "名称不能为空！",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "名字长度为1-10 位！",
            trigger: "blur",
          },
        ],
        apass: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "名字长度为1-10 位！",
            trigger: "blur",
          },
        ],


      },
    });
    const submitForm = (formData) => {
       axios.post("/admin/login", formData)
       .then(res=>{
          if(res.data.mess==="ok"){
           alert("登录成功！")
           window.sessionStorage.setItem('admin',JSON.stringify(res.data.admin))
           store.commit("changeAdminLogin",res.data.admin);
          //  data.admin = JSON.parse(window.sessionStorage.getItem("admin"));
          //  data.admin1=res.data.admin;
           router.push("/admin/main")
          }else{
            alert("账号或密码有误！")
          }
        // console.log("mess",res.data.mess);
        // console.log("admin",data.admin1);
       }).catch(err=>{
            console.log(err);
       });

    };

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      submitForm,
    };
  },
};
</script>
<style scoped>
</style>

