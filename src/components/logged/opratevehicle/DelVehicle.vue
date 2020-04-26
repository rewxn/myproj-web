<template>
  <div class="delvehicle-bg">
    <div class="inputinfo-del">
      <el-input class="inputs-del" v-model="license" placeholder="请输入车牌号码" clearable></el-input>
      <el-button type="primary" plain style="width: 80px" @click="delVehicleClick">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      license: ''
    };
  },
  methods: {
    delVehicleClick() {
      this.$axios.get('delvehicle/' + this.license).then((res) => {
        if(res.status === 200) {
          if(res.data.res_code == 5 || res.data.res_code == 411) {
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
.delvehicle-bg {
  width: 1200px;
  margin: 0 auto;
}
.inputinfo-del {
  width: 400px;
  height: 100px;
  margin: 200px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.inputs-del {
  width: 300px;
}
</style>