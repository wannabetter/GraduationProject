<template>
  <el-card>
    <el-image :src="Data.RoomPhoto.data"></el-image>
    <el-descriptions>
      <el-descriptions-item label="地址">{{Data.RoomPlace}}</el-descriptions-item>
      <el-descriptions-item label="价格">{{Data.RoomPrice}}</el-descriptions-item>
      <el-descriptions-item label="类型">{{Data.RoomType}}</el-descriptions-item>
    </el-descriptions>
    <el-button type="success" @click="BtnEvent">预订</el-button>
  </el-card>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: "Room",
    props:["Data","CheckIn",'CheckOut'],
    data(){
      return{
        dialogVisible: false,
      }
    },
    computed:{
      VIP_Price:{
        get(){
          let temp=this.Data.RoomPrice*0.8;
          return temp.toFixed(1)
        }
      },
      Day:{
        get(){
          let day = new Date(this.CheckOut).getTime() - new Date(this.CheckIn).getTime();
          return Math.floor(day / 86400000) ;
        }
      }
    },
    methods:{
      async BtnEvent(){
        if(this.$store.state.LogInType===false){
          await this.$router.push('/User')
        }
        else if(this.CheckIn===null||this.CheckOut==null){
          await this.$alert('请选择正确的入住日期或离店日期',{
            showClose:false,
            center:true
          })
        }else{
          let Url=await QRCode.toDataURL('前端展示')
          await this.$alert(`<p>价格${this.Data.RoomPrice*this.Day} 会员价${this.VIP_Price*this.Day}</p><img src=${Url} />`, "请你微信支付", {
            dangerouslyUseHTMLString: true,
            center: true,
            showCancelButton: true,
            cancelButtonText: '支付遇见问题',
            confirmButtonText: '已支付成功',
            showClose: false
          }).then(()=>{
            this.$store.dispatch('GetOldRoom',this.Data)
            this.$store.dispatch('GetRoom', {
              RoomCheckIn: this.CheckIn.slice(0,10),
              RoomCheckOut: this.CheckOut.slice(0,10),
              RoomID:this.Data.RoomID,
              RoomPlace: this.Data.RoomPlace,
              RoomPrice:this.$store.state.UserData.VIP?this.VIP_Price*this.Day:this.Data.RoomPrice*this.Day,
              RoomType:this.Data.RoomType
            })
            this.$http.post('http://localhost:3000/api/Order/Add',{
              Account:this.$store.state.UserData.Account, RoomID:this.Data.RoomID, CheckIn:this.CheckIn, CheckOut:this.CheckOut,
              Place:this.Data.RoomPlace,Price:this.$store.state.UserData.VIP?this.VIP_Price*this.Day:this.Data.RoomPrice*this.Day})
            this.$http.post('http://localhost:3000/api/Room/ChangeTime', {CheckIn:this.CheckIn,CheckOut:this.CheckOut,RoomID:this.Data.RoomID})
            this.$http.post('http://localhost:3000/api/Mail/SendMail',
                {Name:this.$store.state.UserData.Name,
                  RoomKey:this.Data.RoomKey,
                  To:this.$store.state.UserData.Phone,
                  RoomPlace:this.Data.RoomPlace,
                  RoomCheckIn:this.CheckIn.slice(0,10),
                  RoomCheckOut:this.CheckOut.slice(0,10)
                })
            this.$message.success('欢迎您继续订购')
            this.$router.push('/UserCenter')
          }).catch(()=>{
            this.$message.info('支付遇到问题')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>