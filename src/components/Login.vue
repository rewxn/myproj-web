<template>
  <div class="login-bg">
    <div class="login">
      <h3>LOGIN</h3>
      <el-input v-model="account" placeholder="请输入账号" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <router-link to="/home">
        <el-button type="primary" plain @click="loginClick">登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';

export default {
  data() {
    return {
      account: '',
      password: ''
    }
  },
  created() {
    
  },
  methods: {
    loginClick() {
      this.$axios.post('loginjudge',{
        account: this.account,
        password: this.password
      }).then((res) => {
        if(res.status === 200) {
          if(res.data.res_code === 2) {
            window.sessionStorage.setItem("isLogged", true)
            window.sessionStorage.setItem("userName", this.account)
            window.sessionStorage.setItem("isAdmin", res.data.isAdmin)
            window.sessionStorage.setItem("isTopAdmin", res.data.isTopAdmin)
            this.$message.success(res.data.message);
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.message);
          }
        }
      })
    }
  }
}
</script>

<style scope>
.login-bg {
  width: 600px;
  height: 600px;
  background: url('../images/login-bg.png') no-repeat;
  margin: 100px auto;
  padding-top: 100px;
}

.login {
  height: 300px;
  width: 300px;
  line-height: 66px;
  margin: auto;
  padding: 50px 50px;
  text-align: center;
}

.login>h3 {
  margin: 10px;
  font-size: 35px;
  color: #6b6b6b;
}
</style>