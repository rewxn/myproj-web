<template>
  <div class="headermenu">
    <el-menu style="overflow: hidden;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="homePage">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">查询车辆通行记录</template>
        <router-link to="/home/searchrecord" tag="div">
          <el-menu-item index="2-1">根据车牌号码查询</el-menu-item>
        </router-link>
        <router-link to="/home/demandrecord" tag="div">
          <el-menu-item index="2-2">根据指定条件筛选</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3" v-if="identityID > 0">
        <template slot="title">管理车辆信息</template>
        <router-link to="/home/addvehicle" tag="div">
          <el-menu-item index="3-1">添加车辆和账号</el-menu-item>
        </router-link>
        <router-link to="/home/delvehicle" tag="div">
          <el-menu-item index="3-2">删除车辆和账号</el-menu-item>
        </router-link>
        <router-link to="/home/queryvehicle" tag="div">
          <el-menu-item index="3-3">查询车辆信息</el-menu-item>
        </router-link>
        <router-link to="/home/updatevehicle" tag="div">
          <el-menu-item index="3-4">修改车辆信息</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="4" v-if="identityID > 1">
        <template slot="title">管理管理员</template>
        <router-link to="/home/addadmin" tag="div">
          <el-menu-item index="4-1">添加管理员</el-menu-item>
        </router-link>
        <router-link to="/home/deladmin" tag="div">
          <el-menu-item index="4-2">删除管理员</el-menu-item>
        </router-link>
      </el-submenu>
      <el-menu-item index="5" v-if="identityID > 0" @click="cameraPage">监控画面</el-menu-item>
      <el-submenu index="6" style="float: right;">
        <template slot="title">{{ userName }}({{ identity }})</template>
        <router-link to="/home/changepassword" tag="div">
          <el-menu-item index="6-1">修改密码</el-menu-item>
        </router-link>
        <el-menu-item index="6-2" @click="logout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';

export default {
  data() {
    return {
      activeIndex: '1',
      idAd: window.sessionStorage.getItem("isAdmin"),
      idTopAd: window.sessionStorage.getItem("isTopAdmin"),
      userName: window.sessionStorage.getItem("userName"),
      identity: '',
      identityID: 0
    }
  },
  created() {
    this.identity = (this.idAd === 'true') ? ((this.idTopAd === 'true') ? '最高管理者' : '管理员') : '普通用户';
    this.identityID = (this.idAd === 'true') ? ((this.idTopAd === 'true') ? '2' : '1') : '0';
    this.refreshPage()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    homePage() {
      this.$router.push("/home")
    },
    cameraPage() {
      this.$router.push("/home/camera")
    },
    refreshPage() {
      if(this.activeIndex === '1' && this.$route.path != '/home/info') {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scope>
.headermenu {
  width: 1200px;
  margin: 0 auto;
}

.el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
  min-width: 130px;
}

.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
  float: none;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  color: #909399;
  text-align: center;
}
.el-menu {
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fbfcf7;
}
</style>