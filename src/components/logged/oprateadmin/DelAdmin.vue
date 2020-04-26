<template>
  <div class="deladmin-bg">
    <div class="admininfo-del">
      <el-input v-model="adminaccount" placeholder="请输入要删除的管理员账号" clearable></el-input>
      <el-button type="primary" plain style="width: 80px" @click="delAdminClick">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminaccount: ''
    }
  },
  methods: {
    delAdminClick() {
      if(this.adminaccount == '') {
        this.$message.warning('请输入账号')
      }
      this.$axios.get('deladmin/' + this.adminaccount).then(res => {
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
.deladmin-bg {
  width: 1200px;
  margin: 0 auto;
}
.admininfo-del {
  width: 300px;
  height: 100px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>