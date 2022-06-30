<template>
  <div class="header">
      <div class="w1060 header_content">
        <div class="logo dleft">
          <a href=""><img style="width:280px;margin-top: 50px;" src="../assets/images/logo.png" alt=""/></a>
        </div>
        <div class="header_right dright">
          <div class="top_nav"><img src="../assets/images/phone_02.png" alt=""/>订房热线：13364027570</div>
          <ul class="nav2">
            <li>
              <router-link id="index" to="/">网站首页
                <div>Home</div>
              </router-link><i></i>
            </li>
            <li>
              <router-link id="about" to="/Book">酒店预订
                <div>Book</div>
              </router-link>
              <i></i>
            </li>
            <li v-show="$store.state.LogInType===false">
              <router-link id="join" to="/User">用户登录
                <div>User</div>
              </router-link>
              <i></i>
            </li>
            <li v-show="$store.state.LogInType===false">
              <router-link id="contact" to="/Admin">管理员登录
                <div>Admin</div>
              </router-link>
            </li>
            <li v-show="$store.state.LogInType===true">
              <router-link id="center" to="/UserCenter">用户中心
                <div>center</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>

  .header {
    width: 100%;
    height: 119px;
    background: #FFF;
  }

  .header .logo {
    width: 280px;
  }

  .header .header_right {
    width: 780px;
    height: 119px;
    background: url("../assets/images/header_bg.jpg") no-repeat;
  }

  .top_nav {
    height: 48px;
    margin: 0 auto;
    text-align: right;
    width: 780px;
    line-height: 48px;
    font-size: 14px;
    color:#cbad72;
  }

  .top_nav img {
    margin-bottom: -8px;
  }

  .nav2{
    list-style:none;
    float:right;
    font-size:12px;
    width:770px;
    display:block;
    height:52px;
    padding-top:17px;
    padding-left: 10px;
  }

  .nav2 div{
    font-size:10px;
    font-weight:100;
    font-family:Arial, Helvetica, sans-serif;
    color:#cbad72;
  }

  .nav2 li{
    float:left;
    text-align:center;
    width:110px;
    font-weight: bold;
    font-size: 14px;
  }

  .nav2 a{
    float:left;
    width:90px;
    margin:0 auto;
    color:#784206;
    padding-bottom:6px;
    text-decoration:none;
  }

  .nav2 a:hover,.nav2 .cur{
    color:#cbad72;
    border-bottom:2px solid #784206;
  }

  .nav2 i{
    display:block;
    float:right;
    width:9px;
    height:23px;
  }

  body {
    margin: 0;
    padding: 0;
    background: #FFFFFF repeat-x center top;
    font-size: 12px;
    font-family: "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei", 华文细黑, STHeiti, MingLiu,serif;
  }

  ul, li, dl, dt, dd {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .w1060 {
    width: 1060px;
    margin: auto;
    overflow: hidden;
  }

  .dleft {
    float: left;
  }

  .dright {
    float: right;
  }

  a {
    text-decoration: none;
    color: #0f4000;
  }

  a:hover {
    color: red;
  }

  .more a {
    color: #FFF;
  }

</style>