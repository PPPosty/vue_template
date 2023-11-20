<template>
  <div>
    <div  style="width: 90vw; margin: auto;">

      {{}}
      <div >
        <el-table
          :data="OrderList"
          @selection-change="handleSelectionChange"
          table-layout="auto"
          :header-cell-style="{

            textAlign: 'center',
          }"
          :cell-style="{ textAlign: 'center' }"
        >

          <el-table-column type="index" label="序号" width="80" />
          <el-table-column label="订单号" prop="onumber" />
          <el-table-column label="日期" prop="odate" />
          <el-table-column label="总价" prop="count"/>
          <el-table-column>
            <template #header><span>操作</span> </template>
            <template #default="scope">
              <el-popconfirm
                title="确定要删除吗？"
                @confirm="handleDelete(scope.$index, scope.row.oid)">
                <template #reference>
                  <el-button  type="danger">删除</el-button>
                </template>
              </el-popconfirm>
              <el-button @click="getOrderDetail(scope.$index, scope.row.oid)"  type="danger">详情</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div
          style="
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            flex-grow: 1;
          "
        >

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headView from "@/components/HeaderView.vue";
import { reactive, toRefs, onMounted, computed, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex"
export default {
  name: "Order",
  components: {
    headView,
  },
  setup() {
    // 定义数据
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({
      OrderList: [],
      user: {},
      totalPrice: 0,
      totalNum: 0,
      OrderChoise: [],
      OrderData:[]
    });

    // 初始化
    onMounted(() => {
      data.user = null;
      data.user = JSON.parse(window.sessionStorage.getItem("user"));
      // 判断是否已经登录
      if (data.user != null) {
        axios
          .get("/shop/getOrder?uid=" + data.user.uid)
          .then((res) => {

            data.OrderList = res.data.OrderList;

          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        alert("请你先登录！");
        window.location.href = "/user/login";

      }
    });

    //  删除订单
    const handleDelete = (index, oid) => {

      data.OrderList.splice(index, 1);
      axios
        .get("/shop/deleteOrderByOid?oid=" + oid)
        .then((res) => {
          console.log("res", res.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const getOrderDetail = (index, oid) => {
      // 查看详情

      router.push("/shop/orderDetailView?oid="+oid);
    };

    // 多选

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleDelete,
      getOrderDetail
    };
  },
};
</script>
<style scoped>
</style>



