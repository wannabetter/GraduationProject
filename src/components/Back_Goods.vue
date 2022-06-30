<template>
  <div>
    <div style="margin-bottom: 5px;margin-top: 5px;">
      <el-input v-model="Search" prefix-icon="el-icon-search" placeholder="请输入用户姓名"></el-input>
    </div>
    <el-card v-for="data in Data.slice((currentPage-1)*4,currentPage*4)" :key="data.Account" style="margin-bottom: 5px">
      <el-descriptions title="库存信息">
        <el-descriptions-item label="房间">{{data.RoomID}}</el-descriptions-item>
        <el-descriptions-item label="矿泉水">{{data.Water}}</el-descriptions-item>
        <el-descriptions-item label="毛巾">{{data.Towel}}</el-descriptions-item>
        <el-descriptions-item label="洗发水">{{data.Shampoo}}</el-descriptions-item>
        <el-descriptions-item label="沐浴露">{{data.ShowerGel}}</el-descriptions-item>
        <el-descriptions-item label="牙刷套装">{{data.ToothBrush}}</el-descriptions-item>
      </el-descriptions>
      <el-popconfirm style="float: right;margin-bottom: 5px;margin-left: 5px;" title="确定删除吗？" @confirm="DeleteGoods(data)">
        <el-button type="danger" slot="reference">删除</el-button>
      </el-popconfirm>
      <el-popconfirm v-show="GetShow(data)" style="float: right;margin-bottom: 5px;" title="确定恢复吗？" @confirm="UpGoods(data)">
        <el-button type="success" slot="reference">恢复</el-button>
      </el-popconfirm>
    </el-card>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="Items"  :page-size="4">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Back_Goods",
    data(){
      return{
        Search:"",
        currentPage:1,
        Items:0,
        Data:[],
      }
    },
    methods:{
      handleCurrentChange(val) {
        this.currentPage=val
      },
      GetShow(data){
        return !(data.Water === "2" && data.Towel === "2" && data.Shampoo === "1" && data.ShowerGel === "1" && data.ToothBrush === "2");
      },
      DeleteGoods(data){
        this.$http.post('http://localhost:3000/api/Goods/DeleteRoomID',
            {RoomID:data.RoomID}).then(res=>{
          switch (res.data){
            case 1:{
              this.$message.success('删除房间成功');
              this.Data.splice(this.Data.indexOf(data),1);
              break;
            }
            case 0:this.$message.error('删除房间失败');break;
          }
        })
      },
      UpGoods(data){
        this.$http.post('http://localhost:3000/api/Goods/UpdateRoomID',
            {RoomID:data.RoomID}).then(res=>{
          switch (res.data){
            case 1:{
              this.Data[this.Data.indexOf(data)].Water="2"
              this.Data[this.Data.indexOf(data)].Towel="2"
              this.Data[this.Data.indexOf(data)].ToothBrush="2"
              this.Data[this.Data.indexOf(data)].Shampoo="1"
              this.Data[this.Data.indexOf(data)].ShowerGel="1"
              this.$message.success('恢复库存成功');
              break;
            }
            case 0:this.$message.error('恢复库存失败');break;
          }
        })
      }
    },
    watch:{
      Search:{
        immediate:true,
        handler(newValue){
          this.currentPage=1
          this.Data=[]
          if(newValue===''){
            this.$http.post('http://localhost:3000/api/Goods/Select').then(res=>{
              if(res.data!==0){
                this.Data=res.data
                this.Items=res.data.length
              }
            })
          }else{
            this.$http.post('http://localhost:3000/api/Goods/SelectRoomID',{RoomID:newValue}).then(res=>{
              if(res.data!==0){
                console.log(res.data)
                this.Data=res.data
                this.Items=res.data.length
              }
              else{
                this.Data=[]
                this.Items=0
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>