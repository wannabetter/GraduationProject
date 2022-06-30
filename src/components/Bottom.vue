<template>
  <div class="footer">
    <div style="float: right">
      <img style="width: 40px;" src="../assets/images/bottom_logo.png" alt="" />
    </div>
    <div class="copy">Copyright &copy; 2014 www.CQ.UniversityOfTechnology.com All Rights Reserved.
      <span><img src="../assets/images/tel_png.png" alt="">订房热线：13364027570</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Bottom"
  }
</script>

<style scoped>

  .footer {
    height: auto;
    width: 1060px;
    margin: auto;
    overflow: hidden;
    padding-top: 20px;
    background: url("../assets/images/header_bg.jpg") no-repeat;
    padding-bottom: 20px;
  }

  .copy {
    height: 40px;
    font-size: 14px;
    text-align: left;
  }

  .copy img {
    margin-bottom: -10px;
  }

  .copy span {
    padding-left: 10px;
  }

</style>