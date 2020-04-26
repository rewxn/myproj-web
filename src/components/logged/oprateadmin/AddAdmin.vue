<template>
  <div class="addadmin-bg">
    <div class="admininfo-add">
      <el-input v-model="adminaccount" placeholder="请输入新的管理员账号" clearable></el-input>
      <el-input placeholder="请设置密码" v-model="adminpassword" show-password></el-input>
      <el-button type="primary" plain style="width: 80px" @click="addAdminClick">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminaccount: '',
      adminpassword: ''
    }
  },
  methods: {
    addAdminClick() {
      if(this.adminaccount == '' || this.adminpassword == '') {
        this.$message.warning('账号密码均不能为空')
      }
      this.$axios.post('addadmin', {
        account: this.adminaccount,
        password: this.adminpassword
      }).then(res => {
        if(res.status === 200) {
          if(res.data.res_code == 41 || res.data.res_code == 5) {
            this.$message.error(res.data.message);
          } else if(res.data.res_code == 2) {
            this.$message.success(res.data.message);
          }
        }
      })
    }
  }
}
</script>

<style scope>
.addadmin-bg {
  width: 1200px;
  margin: 0 auto;
}
.admininfo-add {
  width: 300px;
  height: 150px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>