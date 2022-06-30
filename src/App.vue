<template>
  <div id="app">
    <Navigation></Navigation>
    <Banner></Banner>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation";
  import Banner from "@/components/Banner";
  import Bottom from "@/components/Bottom";

  export default {
    name: 'App',
    components:{Navigation,Banner,Bottom}
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
