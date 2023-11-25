<template>
  <div>
    <el-table
      :data="UserList"
      style="width: 100%"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" width="60" label="序号" :index="indexMethod((currPage - 1) * 5 + 1)">
      </el-table-column>
      <el-table-column prop="uname" label="登录账号" width="120" />
      <el-table-column prop="uname" label="登录密码" width="120" />

      <el-table-column prop="tel" label="电话号" width="120" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button size="small" type="danger">注销账号</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <span v-if="currPage > 1"
        ><button @click="getPre" class="btn btn-primary" round style="margin-right: 16px">上一页</button></span
      >
      <span v-if="hasNext == 'yes'"><button @click="getNext" class="btn btn-primary" round>下一页</button></span>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import axios from 'axios'
import { onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'type',
  setup() {
    //页面初始化方法
    const store = useStore()
    const route = useRoute()
    const data = reactive({
      UserList: [],
      currPage: 1,
      hasNext: '',
      UserMulti: [],
    })

    // 初始化获得用户信息
    onMounted(() => {
      if (route.query.currPage != null) {
        console.log('A')
        data.currPage = route.query.currPage
      } else {
        console.log('B')
      }
      axios.get('/user/getUserByPage?currPage=' + data.currPage).then((res) => {
        data.UserList = res.data.UserList
        data.hasNext = res.data.hasNext
      })
    })
    //上一页
    const getPre = () => {
      data.currPage = data.currPage - 1
      axios.get('/user/getUserByPage?currPage=' + data.currPage).then((res) => {
        data.UserList = res.data.UserList
        data.hasNext = res.data.hasNext
      })
    }
    //下一页
    const getNext = () => {
      data.currPage = data.currPage + 1
      axios.get('/user/getUserByPage?currPage=' + data.currPage).then((res) => {
        data.UserList = res.data.UserList
        data.hasNext = res.data.hasNext
      })
    }
    //设置序号
    const indexMethod = (index) => {
      return index
    }
    //  实现删除
    const handleDelete = (index, row) => {
      console.log('删除', index, row)
      axios.get('/user/deleteUserByID?uid=' + row.uid).then((res) => {
        if (res.data === 'ok') {
          alert('删除成功！')
          //********刷新页面********************************* */
          axios.get('/user/getUserByPage?currPage=' + data.currPage).then((res) => {
            data.UserList = res.data.UserList
            data.hasNext = res.data.hasNext
          })
          //************************************************** */
        } else {
          alert('删除失败！')
        }
      })
    }
    // 实现多选
    const handleSelectionChange = (val) => {
      console.log('多选', val)
      data.UserMulti = val
    }

    //  实现批量删除
    const handMultiDelete = () => {
      axios.post('/admin/deleteUserMulti', data.UserMulti).then((res) => {
        if (res.data === 'ok') {
          alert('删除成功！')
          //********刷新页面********************************* */
          axios.get('/user/getUserByPage?currPage=' + data.currPage).then((res) => {
            data.UserList = res.data.UserList
            data.hasNext = res.data.hasNext
          })
          //************************************************** */
        } else {
          alert('删除失败！')
        }
      })
    }

    const login = () => {}

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      login,
      getNext,
      getPre,
      indexMethod,
      handleDelete,
      handleSelectionChange,
      handMultiDelete,
    }
  },
}
</script>
<style scoped></style>
