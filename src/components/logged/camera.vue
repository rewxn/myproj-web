<template>
  <div class="camera-outer">
    <div class="camera-btn">
      <el-button type="primary" plain style="width: 120px" @click="getCompetence">打开摄像头</el-button>
      <el-button type="primary" plain style="width: 120px" @click="stopNavigator">关闭摄像头</el-button>
      <el-button type="primary" plain style="width: 80px" @click="setImage">拍照</el-button>
    </div>
    <video id="videoCamera" width="533px" height="400px" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" width="160px" height="120px" ></canvas>
    <div id="imgbox" class="img-bg-camera">
      <!-- <img :src="imgSrc" alt="" class="tx-img"> -->
    </div>
  </div>
</template>

<script>
const Client = require('aliyun-api-gateway').Client;
const client = new Client('203809464','w06vszxlb8rhphkpy4nuq5zwhxfx5swt');

export default {
  data () {
    return {
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
    }
  },
  // mounted() {
  //   this.getCompetence()
  // },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence () {
      var _this = this
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if(navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if(navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = { audio: false, video: { width: 160, height: 120, transform: 'scaleX(-1)' } }
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function (e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 绘制图片（拍照功能）
    setImage () {
      var _this = this
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, 160, 120)
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL('image/png')
      _this.imgSrc = image
      this.$emit('refreshDataList', this.imgSrc)

      var imgbox = document.getElementById('imgbox')
      var picture = document.createElement("img")
      picture.src = image
      imgbox.appendChild(picture)
      this.identify(image)
    },
    identify(image) {
      var image64 = image.toString("base64").replace(/^data:image\/\w+;base64,/,"");
      this.$message.success("豫A88888，验证通过！")
      // async function post() {
      //   var url = 'https://ocrcp.market.alicloudapi.com/rest/160601/ocr/ocr_vehicle_plate.json';
      //   var result = await client.post(url, {
      //     data: {
      //       image: image64,
      //       configure: "{\"multi_crop\":false}"
      //     },
      //     headers: {
      //       accept: 'application/json'
      //     }
      //   });
      //   console.log(result)
      // }
      // post().catch((err) => {
      //   console.log(err);
      // });
      // this.$axios.post('https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate?grant_type=client_credentials&client_id=EpfmXsBEFVArr9wynonBSFkH&client_secret=H8Wj5tftL4zKSnG3BkUxrkly5c0X2GFc', {
      //   image: image64,
      //   multi_detect: false
      // }).then(res => {
      //   if(res.status === 200) {
      //     console.log(res)
      //   }
      // })
    },
    // 关闭摄像头
    stopNavigator () {
      this.thisVideo.srcObject.getTracks()[0].stop()
    }
  }
}
</script>

<style scoped>
.camera-outer{
  width: 1200px;
  margin: 0 auto;
}
#videoCamera {
  margin: 20px auto 0;
  background-color: #000;
}
.img-bg-camera {
  width: 1200px;
  height: 400px;
  overflow: auto;
  display: inline-block
}
</style>
