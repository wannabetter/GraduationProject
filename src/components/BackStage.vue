<template>
  <div>
    <div class="Top">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">员工管理</template>
          <el-menu-item v-show="ID>1" index="2-1" @click="ClickL_Manager">大堂经理</el-menu-item>
          <el-menu-item v-show="ID>0" index="2-2" @click="ClickWaiter">服务员</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="ClickUser">会员管理</el-menu-item>
        <el-menu-item index="3" @click="ClickGoods">库存管理</el-menu-item>
      </el-menu>
    </div>
    <div class="BackStageBody">
      <Back_User v-show="Show_attribute==='User'"></Back_User>
      <BackL_Manager v-show="Show_attribute==='L_Manager'"></BackL_Manager>
      <Back_Waiter v-show="Show_attribute==='Waiter'"></Back_Waiter>
      <Back_Goods v-show="Show_attribute==='Goods'"></Back_Goods>
    </div>
    <div style="height: 45px"></div>
  </div>
</template>

<script>

  import Back_User from "@/components/Back_User";
  import BackL_Manager from "@/components/BackL_Manager";
  import Back_Waiter from "@/components/Back_Waiter";
  import Back_Goods from "@/components/Back_Goods";

  export default {
    name: "BackStage",
    components:{Back_User,BackL_Manager,Back_Waiter,Back_Goods},
    data() {
      return {
        activeIndex: '1',
        Show_attribute:'',
        ID:0
      }
    },
    mounted() {
      if(this.$route.query.ID==='G_Manager') this.ID=2
      else if(this.$route.query.ID==='L_Manager') this.ID=1
      else this.ID=0
    },
    methods:{
      ClickUser(){
        this.Show_attribute='User';
      },
      ClickL_Manager(){
        this.Show_attribute='L_Manager';
      },
      ClickWaiter(){
        this.Show_attribute='Waiter';
      },
      ClickGoods(){
        this.Show_attribute="Goods";
      }
    }
  }
</script>

<style scoped>

  .Top{
    width: 1060px;
    margin: auto;
  }

  .BackStageBody{
    width: 1060px;
    margin: auto;
  }

</style>