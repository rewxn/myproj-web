<template>
  <div class="updvehicle-bg">
    <div class="inputinfo-upd">
      <el-input class="inputs-upd" v-model="license" placeholder="请输入车牌号码" clearable></el-input>
      <el-button type="primary" plain style="width: 80px" @click="queVehicleClick">查询</el-button>
    </div>
    <div class="updinfo">
      <ul>
        <li class="updinfo-fir">
          <div class="updinfo-left">车牌号码:</div>
          <div class="updinfo-right">
            <el-input v-model="updinfo.license" :disabled="true" placeholder="请先查询" clearable></el-input>
          </div>
        </li>
        <li>
          <div class="updinfo-left">车位有效期：</div>
          <div class="updinfo-right">
            <el-date-picker
              v-model="updinfo.exp"
              align="right"
              type="date"
              placeholder="请先查询"
              style="width: 240px"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </li>
        <li>
          <div class="updinfo-left">车主姓名:</div>
          <div class="updinfo-right">
            <el-input v-model="updinfo.name" placeholder="请先查询" clearable></el-input>
          </div>
        </li>
        <li>
          <div class="updinfo-left">车主手机号:</div>
          <div class="updinfo-right">
            <el-input v-model="updinfo.tel" :disabled="true" placeholder="请先查询" clearable></el-input>
          </div>
        </li>
        <li>
          <div class="updinfo-left">车主身份证号:</div>
          <div class="updinfo-right">
            <el-input v-model="updinfo.idNum" placeholder="请先查询" clearable></el-input>
          </div>
        </li>
        <li>
          <div class="updinfo-left">车主住址:</div>
          <div class="updinfo-right">
            <el-input v-model="updinfo.address" placeholder="请先查询" clearable></el-input>
          </div>
        </li>
      </ul>
      <el-button type="primary" plain style="width: 80px; margin-top: 10px" @click="updVehicleClick">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [{
          text: '一个月',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }, {
          text: '三个月',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30 * 3);
            picker.$emit('pick', date);
          }
        }, {
          text: '半年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30 * 6);
            picker.$emit('pick', date);
          }
        }, {
          text: '一年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', date);
          }
        }, {
          text: '三年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 3);
            picker.$emit('pick', date);
          }
        }, {
          text: '五年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 5);
            picker.$emit('pick', date);
          }
        }, {
          text: '十年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 10);
            picker.$emit('pick', date);
          }
        }]
      },
      license: '',
      updinfo: {}
    };
  },
  methods: {
    queVehicleClick() {
      this.updinfo = {}
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
          this.updinfo = res.data[0]
          this.$message.success('查询成功');
        }
      })
    },
    updVehicleClick() {
      if(this.license == '') {
        this.$message.warning('请先查询');
        return;
      }
      this.$axios.post('updatevehicle', this.updinfo).then(res => {
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
.updvehicle-bg {
  width: 1200px;
  margin: 0 auto;
}
.inputinfo-upd {
  text-align: center;
}
.inputs-upd {
  width: 300px;
  margin-right: 20px;
}
.updinfo {
  width: 400px;
  margin: 20px auto 0;
}
.updinfo ul {
  margin: 0;
  padding: 0;
}
.updinfo li {
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
.updinfo div {
  height: 100%;
}
.updinfo .updinfo-left {
  width: 149px;
  border-right: 1px solid #EBEEF5;
}
.updinfo .updinfo-right {
  width: 240px;
  padding: 0 5px;
  text-align: left;
}
.updinfo .updinfo-fir {
  border: 1px solid #EBEEF5;
}
</style>