<template>
  <div class="Room_list_index">
    <dl>
      <dt>
        <a href="" class="more">
          <img src="../assets/images/more_bg.png" alt="" />
        </a>
        <div style="text-align: left;">
          <img src="../assets/images/room_title.png" alt="" />
        </div>
      </dt>
      <el-carousel type="card">
        <el-carousel-item v-for="(picture,index) in LightPictures" :key="index">
          <img :src="picture" alt="" style="height: 100%">
        </el-carousel-item>
      </el-carousel>
    </dl>
  </div>
</template>

<script>

  export default {
    name: "Room_List",
    data(){
      return{
        LightPictures:[require('../assets/首页走马灯1.webp'),
          require('../assets/首页走马灯2.webp'),
          require('../assets/首页走马灯3.webp'),]
      }
    }
  }

</script>

<style scoped>

  .Room_list_index {
    width: 1060px;
    overflow: hidden;
    height: auto;
    margin: 20px auto auto;
  }

  .Room_list_index dt {
    height: 50px;
  }

  .more {
    font-family: "宋体",serif;
    color: #999;
    margin-right: 5px;
    float: right;
  }

  .more a {
    color: #FFF;
  }

</style>