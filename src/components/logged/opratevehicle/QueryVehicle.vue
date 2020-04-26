<template>
  <div class="quevehicle-bg">
    <div class="inputinfo-que">
      <el-input class="inputs-que" v-model="license" placeholder="请输入车牌号码" clearable></el-input>
      <el-button type="primary" plain style="width: 80px" @click="queVehicleClick">查询</el-button>
    </div>
    <div class="queinfo">
      <ul>
        <li class="queinfo-fir">
          <div class="queinfo-left">车牌号码:</div>
          <div class="queinfo-right">{{queinfo.license}}</div>
        </li>
        <li>
          <div class="queinfo-left">车位有效期：</div>
          <div class="queinfo-right">{{queinfo.exp | dateFormat}}</div>
        </li>
        <li>
          <div class="queinfo-left">车主姓名:</div>
          <div class="queinfo-right">{{queinfo.name}}</div>
        </li>
        <li>
          <div class="queinfo-left">车主手机号:</div>
          <div class="queinfo-right">{{queinfo.tel}}</div>
        </li>
        <li>
          <div class="queinfo-left">车主身份证号:</div>
          <div class="queinfo-right">{{queinfo.idNum}}</div>
        </li>
        <li>
          <div class="queinfo-left">车主住址:</div>
          <div class="queinfo-right">{{queinfo.address}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      license: '',
      queinfo: {}
    };
  },
  methods: {
    queVehicleClick() {
      this.queinfo = {}
      if(this.license == '') {
        this.$message.warning('车牌号码不能为空');
        return;
      }
      this.$axios.get('searchvehicle/' + this.license).then((res) => {
        if(res.status === 200) {
          if(res.data.res_code == 5 || res.data.res_code == 411) {
            this.$message.error(res.data.message);
            return;
          }
          this.queinfo = res.data[0]
          this.$message.success('查询成功');
        }
      })
    }
  }
}
</script>

<style scope>
.quevehicle-bg {
  width: 1200px;
  margin: 0 auto;
}
.inputinfo-que {
  text-align: center;
}
.inputs-que {
  width: 300px;
  margin-right: 20px;
}
.queinfo {
  width: 400px;
  margin: 20px auto 0;
}
.queinfo ul {
  margin: 0;
  padding: 0;
}
.queinfo li {
  list-style: none;
  font-size: 14px;
  color: #606266;
  width: 400px;
  height: 48px;
  line-height: 48px;
  border: 1px solid #EBEEF5;
  border-top: 0;
  display: flex;
  justify-content: left;
}
.queinfo div {
  height: 100%;
}
.queinfo .queinfo-left {
  width: 149px;
  border-right: 1px solid #EBEEF5;
}
.queinfo .queinfo-right {
  width: 230px;
  padding-left: 20px;
  text-align: left;
}
.queinfo .queinfo-fir {
  border: 1px solid #EBEEF5;
}
</style>