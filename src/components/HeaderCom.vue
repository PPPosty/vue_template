<template>
	<div class="header" >
    <img src="../assets/a.jpg" style="width:99%;height:268px;"/>
		<div  style="background-color: white;left:0px;top:30px;width:100%;height:50px;line-height:50px;position: absolute;color: black;">
      大连旅游网站	<el-button @click="loginout">退出登录{{userName}}</el-button>
    </div>
	</div>
</template>
<script setup>
import { useRouter } from "vue-router"
const Router = useRouter()
const userName = sessionStorage.getItem("aname")
const loginout = () => {
		sessionStorage.removeItem("aname")
		Router.push("/admin/login");
}
const myDate = new Date()

const Week = ['日', '一', '二', '三', '四', '五', '六']

</script>
<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 60px;
	font-size: 22px;
	background: black;
	color: #fff;
}

.collapse-btn {
	float: left;
	padding: 0 21px;
	cursor: pointer;
	line-height: 70px;
}

.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
	font-size: 20px;
}

.header .mytime {
	float: left;
	width: 300px;
	line-height: 70px;
	font-size: 15px;
}

.header-right {
	float: right;
	padding-right: 50px;
}

.header-user-con {
	display: flex;
	height: 70px;
	align-items:center;
	text-align: right;
}

.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
}

.btn-bell-badge {
	position: absolute;
	right: 0;
	top: -2px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}

.btn-bell .el-icon-bell {
	color: #fff;
}

.user-name {
	margin-left: 10px;
}

.user-avator {
	margin-left: 20px;
	transition: 0.5s;
}

.user-avator:hover {
	transform: rotate(360deg);
}

.user-avator img {
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	margin-left: 5px;
}

.el-dropdown-menu__item {
	text-align: center;
}
</style>
