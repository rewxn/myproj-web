import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Logged from '../components/Logged.vue'
import RecordInfo from '../components/logged/RecordInfo.vue'
import AddAdmin from '../components/logged/oprateadmin/AddAdmin.vue'
import DelAdmin from '../components/logged/oprateadmin/DelAdmin.vue'
import DemandRecord from '../components/logged/opraterecord/DemandRecord.vue'
import SearchRecord from '../components/logged/opraterecord/SearchRecord.vue'
import AddVehicle from '../components/logged/opratevehicle/AddVehicle.vue'
import DelVehicle from '../components/logged/opratevehicle/DelVehicle.vue'
import QueryVehicle from '../components/logged/opratevehicle/QueryVehicle.vue'
import UpdateVehicle from '../components/logged/opratevehicle/UpdateVehicle.vue'
import ChangePassword from '../components/logged/ChangePassword.vue'
import Camera from '../components/logged/camera.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Logged, children: [
      { path: '/home/', redirect: '/home/info' },
      { path: '/home/info', component: RecordInfo },
      { path: '/home/addadmin', component: AddAdmin },
      { path: '/home/deladmin', component: DelAdmin },
      { path: '/home/demandrecord', component: DemandRecord },
      { path: '/home/searchrecord', component: SearchRecord },
      { path: '/home/addvehicle', component: AddVehicle },
      { path: '/home/delvehicle', component: DelVehicle },
      { path: '/home/queryvehicle', component: QueryVehicle },
      { path: '/home/updatevehicle', component: UpdateVehicle },
      { path: '/home/changepassword', component: ChangePassword },
      { path: '/home/camera', component: Camera }
    ] }
  ]
})
