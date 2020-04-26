<template>
  <div class="recordinfo">
    <el-table :data="record" height="860px" border stripe lazy style="width: 100%">
      <el-table-column prop="license" label="车牌号码" width="300px" align="center">
      </el-table-column>
      <el-table-column prop="record" label="通行情况" width="300px" align="center">
      </el-table-column>
      <el-table-column prop="date" label="通行时间" sortable align="center">
        <template slot-scope="scope">{{scope.row.date| dateFormat}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: []
    }
  },
  created() {
    this.getRecord()
  },
  methods: {
    getRecord() {
      this.$axios.get('getrecord').then((res) => {
        if(res.status === 200) {
          if(res.data.res_code == 411) {
            this.$message(res.data.message);
            return;
          }
          if(res.data.res_code == 5) {
            this.$message.error(res.data.message);
            return;
          }
          this.record = res.data.reverse()
        }
      })
    }
  }
}
</script>

<style scope>
.recordinfo {
  width: 1200px;
  margin: 0 auto;
}
</style>