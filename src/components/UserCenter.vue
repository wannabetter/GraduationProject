<template>
  <div style="margin:auto;width: 1060px;">
    <div style="height: 20px;"></div>
    <el-card>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="账号">{{$store.state.UserData.Account}}</el-descriptions-item>
        <el-descriptions-item label="密码">{{$store.state.UserData.PassWord}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{$store.state.UserData.Name}}</el-descriptions-item>
        <el-descriptions-item label="电话">{{$store.state.UserData.Phone}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{$store.state.UserData.Sex}}</el-descriptions-item>
        <el-descriptions-item label="会员">{{$store.state.UserData.VIP}}</el-descriptions-item>
      </el-descriptions>
      <el-popconfirm style="float: right;margin-bottom: 10px;margin-left: 5px;" title="确定退出吗？" @confirm="LogOut">
        <el-button type="danger" slot="reference">退出</el-button>
      </el-popconfirm>
      <el-popconfirm v-show="$store.state.UserData.VIP==='No'" style="float: right;margin-bottom: 5px;" title="确定升级吗？" @confirm="UpUser">
        <el-button type="success" slot="reference">升级</el-button>
      </el-popconfirm>
    </el-card>
    <div style="height: 10px;"></div>
    <div v-for="data in $store.state.RoomData" :key="data.RoomID">
      <div style="height: 5px;"></div>
      <el-card>
        <el-descriptions title="当前订单">
          <el-descriptions-item label="房间号">{{data.RoomID}}</el-descriptions-item>
          <el-descriptions-item label="地点">{{data.RoomPlace}}</el-descriptions-item>
          <el-descriptions-item label="入住日期">{{data.RoomCheckIn}}</el-descriptions-item>
          <el-descriptions-item label="离开日期">{{data.RoomCheckOut}}</el-descriptions-item>
          <el-descriptions-item label="价格">{{data.RoomPrice}}</el-descriptions-item>
        </el-descriptions>
        <el-popconfirm style="float: right;margin-bottom: 10px;" title="确定退房吗？" @confirm="OutRoom(data)">
          <el-button type="danger" slot="reference" :disabled="room_flag">退房</el-button>
        </el-popconfirm>
        <el-button style="float: right;margin-right: 5px;" type="warning" :disabled="Consumables" @click="dialogFormVisible =true">库存统计</el-button>
        <el-button style="float: right;margin-right: 5px;" type="success" :disabled="!Money" @click="OpenCamera">入住</el-button>
        <el-button style="float: right;" type="warning" :disabled="Money" @click="PostMoney">押金</el-button>
      </el-card>
      <el-dialog title="统计房间物品使用情况" :visible.sync="dialogFormVisible">
        <div style="margin-bottom: 5px;">
          <span style="margin-right: 20px;">洗发水</span>
          <el-input-number v-model="Com_Shampoo" :min="0" :max="1"></el-input-number>
        </div>
        <div style="margin-bottom: 5px;">
          <span style="margin-right: 20px;">沐浴露</span>
          <el-input-number v-model="Com_ShowerGel" :min="0" :max="1"></el-input-number>
        </div>
        <div style="margin-bottom: 5px;">
          <span style="margin-right: 20px;">饮用水</span>
          <el-input-number v-model="Com_Water" :min="0" :max="2"></el-input-number>
        </div>
        <div style="margin-bottom: 5px;">
          <span style="margin-right: 33px;">牙刷</span>
          <el-input-number v-model="Com_ToothBrush" :min="0" :max="2"></el-input-number>
        </div>
        <div style="margin-bottom: 5px;">
          <span style="margin-right: 33px;">毛巾</span>
          <el-input-number v-model="Com_Towel" :min="0" :max="2"></el-input-number>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;$message.info('统计物品失败')">取消</el-button>
          <el-button type="primary" @click="dialogFormYes(data)">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-dialog title="提示" :before-close="stopNavigator" :visible.sync="dialogVisible">
      <video v-show="!CanvasType" style="margin: auto" width="800" id="video" height="600" ref="videoDom" preload autoplay loop muted></video>
      <canvas v-show="CanvasType" style="margin: auto" width="800" height="600" ref="canvasDOM"></canvas>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="stopNavigator">取消</el-button>
        <el-button type="primary" @click="Snap">{{Text}}</el-button>
        <el-button type="primary" @click="PhotoConfirm">确定</el-button>
      </span>
    </el-dialog>
    <el-divider></el-divider>
    <div v-for="data in Data" :key="data.ID">
      <div style="height: 5px;"></div>
      <el-card>
        <el-descriptions title="历史信息">
          <el-descriptions-item label="房间号">{{data.RoomID}}</el-descriptions-item>
          <el-descriptions-item label="地点">{{data.Place}}</el-descriptions-item>
          <el-descriptions-item label="入住日期">{{data.CheckIn}}</el-descriptions-item>
          <el-descriptions-item label="离开日期">{{data.CheckOut}}</el-descriptions-item>
          <el-descriptions-item label="价格">{{data.Price}}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <div style="height: 10px;"></div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: "UserCenter",
    created() {
      this.$http.post('http://localhost:3000/api/Face/getToken',{}).then((res)=>{
        this.access_token = res.data.access_token
      })
      this.$http.post('http://localhost:3000/api/Order/SelectAccount',{Account:this.$store.state.UserData.Account}).then(res=>{
        if(res.data!==0){
          this.Data=res.data
          for(let i=0;i<this.$store.state.RoomData.length;i++){
            this.Data=this.Data.filter(item=>{
              return item.RoomID!==this.$store.state.RoomData[i].RoomID&&
                  item.CheckIn!==this.$store.state.RoomData[i].CheckIn&&
                  item.CheckOut!==this.$store.state.RoomData[i].CheckOut
            })
          }
        }
        else{
          this.Data=[]
        }
      })
    },
    data(){
      return{
        Money:false,
        dialogFormVisible:false,
        Com_Water:0,
        Com_Towel:0,
        Com_Shampoo:0,
        Com_ToothBrush:0,
        Com_ShowerGel:0,
        Data:[],
        Img_base64:'',
        Text:"拍照",
        dialogVisible:false,
        CanvasType:false,
        access_token:'',
        room_flag:false,
        Consumables:true,
        GoodsRoom:null
      }
    },
    methods:{
      dialogFormYes(data){
        this.dialogFormVisible=false
        this.$http.post('http://localhost:3000/api/Goods/UpdateGoods',
            {RoomID:data.RoomID,Water:2-this.Com_Water,ToothBrush:2-this.Com_ToothBrush,Towel:2-this.Com_Towel,Shampoo:1-this.Com_Shampoo,ShowerGel:1-this.Com_ShowerGel}).then(res=>{
          switch (res.data){
            case 1:{
              this.$message.success("统计物品成功")
              this.Consumables=true;
              break;
            }
            case 0:this.$message.error('统计物品失败');break;
          }
        })
      },
      async PostMoney(){
        this.Money=true
        let Url=await QRCode.toDataURL('前端展示')
        await this.$alert(`<p>押金$200</p><img src=${Url} />`, "请你微信支付", {
          dangerouslyUseHTMLString: true,
          center: true,
          showCancelButton: true,
          cancelButtonText: '支付遇见问题',
          confirmButtonText: '已支付成功',
          showClose: false
        }).then(()=>{
          this.$message.success("押金支付成功")
        }).catch(()=>{
          this.$message.error("押金支付失败")
        })
      },
      async UpUser(){
        let Url=await QRCode.toDataURL('前端展示')
        await this.$alert(`<p>价格$200</p><img src=${Url} />`, "请你微信支付", {
          dangerouslyUseHTMLString: true,
          center: true,
          showCancelButton: true,
          cancelButtonText: '支付遇见问题',
          confirmButtonText: '已支付成功',
          showClose: false
        }).then(()=>{
          this.$http.post('http://localhost:3000/api/User/Update',
              {Account:this.$store.state.UserData.Account, PassWord:this.$store.state.UserData.PassWord}).then(res=>{
            switch (res.data){
              case 1:{
                this.$store.state.UserData.VIP="Yes";
                this.$message.success('升级VIP成功');
                break;
              }
              case 0:this.$message.error('升级VIP失败');break;
            }
          })
        })
      },
      PhotoConfirm(){
        this.Img_base64=this.$refs.canvasDOM.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, "")
        this.$http.post('http://localhost:3000/api/Face/checkFace',{
          access_token: this.access_token,
          Img_base64: this.Img_base64
        }).then((res)=>{
          if(res.data.error_code !== 0){
            if(res.data.error_code === 223120){
              this.$message.warning('活体监测失败,请重新拍摄')
            }
          }else {
            if(res.data.result.user_list[0].score > 80){
              console.log(res.data)
              this.$message.success('人脸识别成功')
              this.dialogVisible=false
              this.Text="拍照"
              this.CanvasType=false
              this.$refs.videoDom.srcObject.getTracks()[0].stop();
            }else{
              this.$message.warning('人脸识别失败,请重新拍摄')
            }
          }
        })
      },
      stopNavigator() {
        this.$refs.videoDom.srcObject.getTracks()[0].stop();
        this.dialogVisible = false
        this.Text="拍照"
        this.CanvasType=false;
      },
      Snap(){
        if(!this.CanvasType){
          let Context=this.$refs.canvasDOM.getContext('2d')
          this.CanvasType=true;
          Context.drawImage(this.$refs.videoDom, 0, 0, this.$refs.videoDom.width, this.$refs.videoDom.height);
          this.Text="重新拍照"
        }
        else{
          this.Text="拍照"
          this.CanvasType=false;
        }
      },
      OpenCamera(){
        this.dialogVisible=true;
        this.room_flag=true;
        this.Consumables=false;
        this.$nextTick(()=>{
          let Video = this.$refs.videoDom
          Video.style.display = 'block';
          if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
          }
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
              let getUserMedia =
                  navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia ||
                  navigator.getUserMedia;
              if (!getUserMedia) {
                return Promise.reject(
                    new Error("getUserMedia is not implemented in this browser")
                );
              }
              return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
              });
            };
          }
          navigator.mediaDevices.getUserMedia({audio:false,video:{
              width: Video.width,
              height: Video.height,
              transform: "scaleX(-1)"
            }}).then(function(stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in Video) {
              Video.srcObject = stream;
            } else {
              Video.src = window.URL.createObjectURL(stream);
            }
            Video.onloadedmetadata = function() {
              Video.play();
            };
          }).catch(err => {console.log(err);});
        })
      },
      OutRoom(data){
        let OldRoom=this.$store.state.OldRoomData.find(item=>item.RoomID===data.RoomID)
        console.log(data)
        this.$http.post('http://localhost:3000/api/Room/ChangeTime',
            {CheckIn:OldRoom.RoomCheckIn.slice(0,10),
              CheckOut:OldRoom.RoomCheckOut.slice(0,10),
              RoomID:OldRoom.RoomID
            })
        this.$http.post('http://localhost:3000/api/Order/Delete',{
          Account:this.$store.state.UserData.Account,
          RoomID:OldRoom.RoomID,
          CheckIn:data.RoomCheckIn,
          CheckOut:data.RoomCheckOut
        }).then(res=>{
          if(res.data===1){
            this.$message.success('退房成功')
          }
        })
        this.$store.dispatch('DeleteRoom',data)
        this.$store.dispatch('DeleteOldRoom',OldRoom)
        this.$http.post("http://localhost:3000/api/Mail/SendMail2",{
          To:this.$store.state.UserData.Phone,
          Name:this.$store.state.UserData.Name,
          RoomPlace:data.RoomPlace,
          RoomCheckIn:data.RoomCheckIn,
          RoomCheckOut:data.RoomCheckOut
        })
      },
      LogOut(){
        this.$store.dispatch('ChangeLoginType',false)
        this.$store.dispatch('GetUser',null)
        this.$store.dispatch('BackRoom',[])
        this.$store.dispatch('BackOldRoom',[])
        this.$message.success('退出成功')
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>