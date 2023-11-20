<template>
  <div  style="width: 90vw; margin: auto;">

      <el-table
          :data="cartList"
          @selection-change="handleSelectionChange"
          table-layout="auto"
          :header-cell-style="{  textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="全选" width="80" />
        <el-table-column  label="ID" width="80"  prop="cid"  />
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="景点名称" prop="sname" />
        <el-table-column label="数量" prop="num" />
      </el-table>
      <div style="margin-top: 40px">
        <div style="text-align: right; margin: 10px 40px">
          总价：{{ totalPrice }}元
          <el-button
              type="danger"
              @click="handleOrder"
              style="padding: 8px 25px" >提交订单</el-button
          >
        </div>
      </div>
    </div>

</template>
<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
// import querystring from "querystring";
// import axios from "@/util/request"
export default {
  name: "orderConfirm",
  setup() {
    // 定义数据
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const data = reactive({
      cartList: [{}],
      user: {},
      totalPrice: 0,
      addressList: [],
      def: 1,
      address: "",
      // order: {
      //   aid: 0,
      //   totalPrice:0,
      //   cartList: [{}],
      // },
      order: {},
    });
    onMounted(() => {
      data.user = JSON.parse(window.sessionStorage.getItem("user"));
      data.cartList=JSON.parse(store.state.cartList);
      data.totalPrice = route.query.totalPrice;

    });


    // 提交订单
    const handleOrder = () => {

      data.order={

        totalPrice:data.totalPrice,
        cartList:data.cartList
      }
      axios
          .post("/shop/orderDone", data.order)
          .then((res) => {
            router.push("/shop/orderDone");
          })
          .catch((err) => {
            console.log(err);
          });
    };

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),

      handleOrder,
    };
  },
};
</script>
<style scoped>
.address {
  border-radius: 4px;
  border: 3px double #191750;
  height: 200px;
}
.address-div {
  text-align: left;
  padding-left: 30px;
  font-size: 30px;
}
.address-div li {
  padding: 10px 0;
  font-size: 30px;
}
.address-div ul {
  list-style: none;
}
.address-div span {
  margin: auto 10px;
}
</style>



