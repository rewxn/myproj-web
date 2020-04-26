<template>
  <div class="changepw-bg">
    <div class="changepw-info">
      <el-input placeholder="请输入原密码" v-model="oldpassword" show-password></el-input>
      <el-input placeholder="请输入新密码" v-model="newpassword" show-password></el-input>
      <el-input placeholder="请确认新密码" v-model="newpwensure" show-password></el-input>
      <el-button type="primary" plain style="width: 80px" @click="changePassword">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: window.sessionStorage.getItem('userName'),
      oldpassword: '',
      newpassword: '',
      newpwensure: ''
    }
  },
  methods: {
    changePassword() {
      if(this.oldpassword == '' || this.newpassword == '' || this.newpwensure == '') {
        this.$message.warning('密码不能为空')
        return;
      } else if(this.newpassword != this.newpwensure) {
        this.$message.warning('新密码输入不一致')
        return;
      }
      this.$axios.post('changepassword', {
        account: this.account,
        oldpassword: this.oldpassword,
        newpassword: this.newpwensure
      }).then(res => {
        if(res.status === 200) {
          if(res.data.res_code == 41 || res.data.res_code == 5) {
            this.$message.error(res.data.message);
          } else if(res.data.res_code == 2) {
            this.$message.success(res.data.message);
            window.sessionStorage.clear()
            this.$router.push('/login')
          }
        }
      })
    }
  }
}
</script>

<style scope>
.changepw-bg {
  width: 1200px;
  margin: 0 auto;
}
.changepw-info {
  width: 300px;
  height: 200px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>