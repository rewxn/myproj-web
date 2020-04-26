<template>
  <div class="addvehicle-bg">
    <div class="inputinfo-add">
      <el-input class="inputs-add" v-model="license" placeholder="请输入车牌号码" clearable></el-input>
      <el-date-picker
        v-model="exp"
        align="right"
        type="date"
        placeholder="选择车位截止日期"
        style="width: 300px"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-input class="inputs-add" v-model="name" placeholder="请输入车主姓名" clearable></el-input>
      <el-input class="inputs-add" v-model="idNum" placeholder="请输入车主身份证号" clearable></el-input>
      <el-input class="inputs-add" v-model="address" placeholder="请输入车主住址" clearable></el-input>
      <el-input class="inputs-add" v-model="tel" placeholder="请输入车主手机号" clearable></el-input>
      <el-input class="inputs-add" placeholder="请设置登录密码" v-model="password" show-password></el-input>
      <el-button type="primary" plain style="width: 80px" @click="addVehicleClick">添加</el-button>
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
      exp: '',
      name: '',
      idNum: '',
      address: '',
      tel: '',
      password: ''
    };
  },
  methods: {
    addVehicleClick() {
      var addinfo = {
        license: this.license,
        exp: this.exp,
        name: this.name,
        idNum: this.idNum,
        address: this.address,
        tel: this.tel,
        password: this.password
      }
      this.$axios.post('addvehicle', addinfo).then((res) => {
        if(res.status === 200) {
          if(res.data.res_code == 411 || res.data.res_code == 41 || res.data.res_code == 5) {
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
.addvehicle-bg {
  width: 1200px;
  margin: 0 auto;
}
.inputinfo-add {
  width: 400px;
  height: 500px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.inputs-add {
  width: 300px;
}
</style>