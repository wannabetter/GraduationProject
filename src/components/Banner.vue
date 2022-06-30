<template>
  <div class="Banner">
    <div class="flash_index">
      <walking-lantern></walking-lantern>
    </div>
  </div>
</template>

<script>
  import WalkingLantern from "@/components/WalkingLantern"

  export default {
    name: "Banner",
    components:{WalkingLantern}
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .Banner {
    width: 100%;
    height: 360px;
    background: url("../assets/images/banner_bg.png") no-repeat center;
    overflow: hidden;
  }

  .flash_index {
    width: 1030px;
    height: 320px;
    margin: 22px auto auto;
  }
</style>