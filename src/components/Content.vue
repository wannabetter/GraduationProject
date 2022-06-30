<template>
  <div>
    <HotelProfile></HotelProfile>
    <Room_List></Room_List>
  </div>
</template>

<script>
  import HotelProfile from "@/components/HotelProfile";
  import Room_List from "@/components/Room_List";
  export default {
    name: "Content",
    components:{HotelProfile,Room_List}
  }
</script>

<style scoped>
  div{
    background: url("../assets/images/content_bg.png");
  }
</style>