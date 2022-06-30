<template>
  <div class="about_div">
    <div class="about_index dleft">
      <dl>
        <dt>
          <a href="" class="more"><img src="../assets/images/more_bg.png" alt="" /></a>
          <div style="text-align: left">
            <img src="../assets/images/about_title.png" alt="" />
          </div>
        </dt>
        <dd>
          罗浮山玉兰度假酒店是罗浮山景区内的精品生态度假酒店，他坐落于白莲湖旁，内设中餐厅、
          木屋客房、茶艺、棋牌、自助烧烤、会议等服务。在这里，你可以享受到自种无公害食材的
          农家菜，在融于大自然的园林休憩区享受特色罗浮山山水泡茶，在特色木屋客房中聆听大自然的气息。
          玉兰度假酒店是您远离城市喧嚣，是您与家人、朋友出行最佳渡假胜地。
        </dd>
      </dl>
    </div>
    <div class="video_index dright">
      <img src="../assets/images/video_img.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "HotelProfile"
  }
</script>

<style scoped>

  .about_div {
    height: 270px;
    overflow: hidden;
    width: 1060px;
    margin: auto;
  }

  .about_div .about_index {
    width: 560px;
    height: 270px;
    padding-top: 15px;
  }

  .about_div .about_index dt {
    height: 50px;
  }

  .about_div .about_index dd {
    padding: 20px 0;
    line-height: 26px;
    font-size: 14px;
    color: #242424;
    font-family: "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei", 华文细黑, STHeiti, MingLiu,serif;
    text-indent: 2em;
    overflow: hidden;
  }

  .video_index {
    width: 426px;
    height: 242px;
    margin-right: 10px;
    margin-top: 20px;
  }

  .dleft {
    float: left;
  }

  .dright {
    float: right;
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