<template>
  <div class="demandrecord">
    <div class="vehicleinfo">
      <el-input class="input-vehicleinfo-id" placeholder="请输入车牌号码" v-model="license" clearable>
      </el-input>
      <el-checkbox-group v-model="checkrecords" size="medium">
        <el-checkbox-button v-for="option in checkoptions" :label="option" :key="option">{{option}}</el-checkbox-button>
      </el-checkbox-group>
      <el-date-picker
        v-model="recorddate"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-button type="primary" plain @click="demandClick">查询</el-button>
    </div>
    <div class="recordinfo-demand">
      <el-table :data="demandrecord" height="800px" border stripe lazy style="width: 100%">
        <el-table-column prop="license" label="车牌号码" width="300px" align="center">
        </el-table-column>
        <el-table-column prop="record" label="通行情况" width="300px" align="center">
        </el-table-column>
        <el-table-column prop="date" label="通行时间" sortable align="center">
          <template slot-scope="scope">{{scope.row.date| dateFormat}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      license: '',
      record: '',
      datestart: '',
      dateend: '',
      demandrecord: [],
      checkrecords: ['进入'],
      checkoptions: ['进入', '离开'],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        recorddate: '',
        defaltdate: [new Date(0, 0, 0, 0, 0, 0), new Date(9999, 12, 31, 23, 59, 59)]
    }
  },
  methods: {
    demandClick() {
      var inputrecord = ''
      var inputdate = ''
      if(this.checkrecords.length === 0) {
        this.$message.error('请选择车辆进入或离开');
        return;
      } else if(this.checkrecords.length === 1) {
        inputrecord = this.checkrecords[0]
      }
      if(this.recorddate === '' || this.recorddate === null) {
        inputdate = this.defaltdate
      } else {
        inputdate = this.recorddate
      }
      var demandrecords = {
        license: this.license,
        record: inputrecord,
        datestart: inputdate[0],
        dateend: inputdate[1]
      }
      this.$axios.post('demandrecord', demandrecords).then((res) => {
        if(res.status === 200) {
          if(res.data.res_code == 411) {
            this.$message(res.data.message);
            this.demandrecord = []
            return;
          }
          if(res.data.res_code == 5) {
            this.$message.error(res.data.message);
            this.demandrecord = []
            return;
          }
          this.demandrecord = res.data.reverse()
          this.$message.success('查询成功');
        }
      })
    }
  }
}
</script>

<style scope>
.demandrecord {
  width: 1200px;
  margin: 0 auto;
}
.input-vehicleinfo-id {
  width: 300px;
  margin-right: 20px;
}
.vehicleinfo {
text-align: center;
display: flex;
justify-content: space-around;
}
.recordinfo-demand {
  width: 1200px;
  margin: 10px auto 0;
}
</style>