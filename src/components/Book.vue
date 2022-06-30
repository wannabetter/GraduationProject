<template>
  <div>
    <div style="height: 45px;"></div>
    <div style="width: 720px;margin: auto;">
      <el-card>
        <el-select v-model="Place" placeholder="请选择地点">
          <el-option v-for="item in Options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-date-picker :picker-options="pickerOptions0" style="margin-right: 10px;margin-left: 10px;" v-model="CheckIn" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择入住日期"></el-date-picker>
        <el-date-picker :picker-options="pickerOptions1" v-model="CheckOut" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择离店日期"></el-date-picker>
      </el-card>
    </div>
    <div style="height: 10px;"></div>
    <div style="width: 85%;margin: auto;display: flex;">
      <room style="margin: auto auto auto 5px;"
            :Data="data"
            :CheckIn="CheckIn"
            :CheckOut="CheckOut"
          v-for="data in Data.slice((currentPage-1)*4,currentPage*4)"
          :key="data.RoomID">
      </room>
    </div>
    <div style="height: 45px;"></div>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="Items"
        :page-size="4">
    </el-pagination>
  </div>
</template>

<script>
  import Room from "@/components/Room";
  export default {
    name: "Book",
    components: {Room},
    created() {
      this.$http.post('http://localhost:3000/api/Room/Select').then(res=>{
        for(let i=0;i<res.data.length;i++){
          let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
          res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
        }
        this.Data=res.data
        this.Items=res.data.length
      })
    },
    data(){
      return{
        IsLogIn: this.$route.query.IsLogIn,
        Data:[],
        map:null,
        pickerOptions0: {
          disabledDate: (time) => {
            if(this.CheckOut){
              return new Date(this.CheckOut)-8.64e7 < time.getTime() || time.getTime() < Date.now()-8.64e7;
            }else{
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if(this.CheckIn){
              return time.getTime() < new Date(this.CheckIn);
            }
            else{
              return time.getTime() < Date.now();
            }
          }
        },
        Options:[{value:'河北',label:'河北'},
          {value:'山西',label:'山西'},
          {value:'辽宁',label:'辽宁'},
          {value:'吉林',label:'吉林'},
          {value:'黑龙江',label:'黑龙江'},
          {value:'江苏',label:'江苏'},
          {value:'浙江',label:'浙江'},
          {value:'安徽',label:'安徽'},
          {value:'福建',label:'福建'},
          {value:'江西',label:'江西'},
          {value:'山东',label:'山东'},
          {value:'河南',label:'河南'},
          {value:'湖北',label:'湖北'},
          {value:'湖南',label:'湖南'},
          {value:'广东',label:'广东'},
          {value:'海南',label:'海南'},
          {value:'四川',label:'四川'},
          {value:'贵州',label:'贵州'},
          {value:'云南',label:'云南'},
          {value:'陕西',label:'陕西'},
          {value:'甘肃',label:'甘肃'},
          {value:'青海',label:'青海'},
          {value:'台湾',label:'台湾'},
          {value:'内蒙古',label:'内蒙古'},
          {value:'广西',label:'广西'},
          {value:'西藏',label:'西藏'},
          {value:'宁夏',label:'宁夏'},
          {value:'新疆',label:'新疆'},
          {value:'北京',label:'北京'},
          {value:'天津',label:'天津'},
          {value:'上海',label:'上海'},
          {value:'重庆',label:'重庆'},
          {value:'香港',label:'香港'},
          {value:'澳门',label:'澳门'}],
        Place:'',
        currentPage:1,
        Items:0,
        CheckIn:null,
        CheckOut:null,
        Item:0
      }
    },
    methods:{
      handleCurrentChange(val) {
        this.currentPage=val
      },
      transformArrayBufferToBase64 (buffer) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        for (let len = bytes.byteLength, i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
    },
    watch:{
      Place:{
        handler(newValue){
          if(this.CheckIn===null){
            this.$http.post('http://localhost:3000/api/Room/SelectPlace',{RoomPlace:newValue}).then(res=>{
              for(let i=0;i<res.data.length;i++){
                let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
                res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
              }
              this.Data=res.data
              this.Items=res.data.length
            })
          }else{
            this.$http.post('http://localhost:3000/api/Room/SelectPlaceAndTime',{RoomPlace:newValue,CheckIn:this.CheckIn}).then(res=>{
              for(let i=0;i<res.data.length;i++){
                let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
                res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
              }
              this.Data=res.data
              this.Items=res.data.length
            })
          }
        }
      },
      CheckIn:{
        handler(newValue){
          if(newValue===null){
            if(this.Place===''){
              this.$http.post('http://localhost:3000/api/Room/Select').then(res=>{
                for(let i=0;i<res.data.length;i++){
                  let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
                  res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
                }
                this.Data=res.data
                this.Items=res.data.length
              })
            }else{
              this.$http.post('http://localhost:3000/api/Room/SelectPlace',{RoomPlace:this.Place}).then(res=>{
                for(let i=0;i<res.data.length;i++){
                  let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
                  res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
                }
                this.Data=res.data
                this.Items=res.data.length
              })
            }
          }else{
            if(this.Place!==''){
              this.$http.post('http://localhost:3000/api/Room/SelectPlaceAndTime',{RoomPlace:this.Place,CheckIn:newValue}).then(res=>{
                for(let i=0;i<res.data.length;i++){
                  let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
                  res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
                }
                this.Data=res.data
                this.Items=res.data.length
              })
            }else{
              this.$http.post('http://localhost:3000/api/Room/SelectTime',{CheckIn:newValue}).then(res=>{
                for(let i=0;i<res.data.length;i++){
                  let dataStr =  this.transformArrayBufferToBase64(res.data[i].RoomPhoto.data)
                  res.data[i].RoomPhoto.data="data:image/png;base64," + dataStr
                }
                this.Data=res.data
                this.Items=res.data.length
              })
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>