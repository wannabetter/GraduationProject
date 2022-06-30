<template>
  <el-carousel height="320px" trigger="click">
    <el-carousel-item v-for="(picture,index) in LightPictures" :key="index">
      <img :src="picture" alt="" style="height: 100%">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "WalkingLantern",
    data(){
      return {
        LightPictures: [require('../assets/images/Img_001.jpg'),
          require('../assets/images/Img_002.jpg'),
          require('../assets/images/Img_003.jpg'),]
      }
    }
  }
</script>

<style scoped>
</style>
