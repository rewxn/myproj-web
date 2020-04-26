<template>
  <el-container>
    <el-header>
      <HeaderMenu></HeaderMenu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import HeaderMenu from './logged/HeaderMenu.vue'

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    HeaderMenu
  }
}
</script>

<style scope>

.el-container>.el-header {
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-main {
  text-align: center;
  border-top: solid 1px #e6e6e6;
}
</style>
