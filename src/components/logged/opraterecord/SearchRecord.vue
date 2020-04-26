<template>
  <div class="searchrecord">
    <div class="vehicleid">
      <el-input class="input-vehicleid" placeholder="请输入车牌号码" v-model="inputid" clearable>
      </el-input>
      <el-button type="primary" plain @click="searchClick">查询</el-button>
    </div>
    <div class="recordinfo-search">
      <el-table :data="searchrecord" height="800px" border stripe lazy style="width: 100%">
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
      inputid: '',
      searchrecord: []
    }
  },
  methods: {
    searchClick() {
      if(this.inputid == '') {
        this.$message.error('车牌号码不能为空');
        this.searchrecord = []
        return;
      }
      this.$axios.get('searchrecord/' + this.inputid).then((res) => {
        if(res.status === 200) {
          if(res.data.res_code == 411) {
            this.$message(res.data.message);
            this.searchrecord = []
            return;
          }
          if(res.data.res_code == 5) {
            this.$message.error(res.data.message);
            this.searchrecord = []
            return;
          }
          this.searchrecord = res.data.reverse()
          this.$message.success('查询成功');
        }
      })
    }
  }
}
</script>

<style scope>
.searchrecord {
  width: 1200px;
  margin: 0 auto;
}
.input-vehicleid {
  width: 300px;
  margin-right: 20px;
}
.vehicleid {
text-align: center;
}
.recordinfo-search {
  width: 1200px;
  margin: 10px auto 0;
}
</style>