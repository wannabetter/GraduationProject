<template>
  <div id="BG_img" style="width: 100%;">
    <div style="height: 90px;"></div>
    <el-card style="width: 720px;margin: auto;">
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="总经理" name="first">
          <el-form status-icon :model="first" :rules="rules">
            <el-form-item prop="Account" label="账号">
              <el-input v-model="first.Account"></el-input>
            </el-form-item>
            <el-form-item prop="PassWord" label="密码">
              <el-input v-model="first.PassWord" type="password"></el-input>
            </el-form-item>
            <el-button type="success" @click="G_Manager">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="大堂经理" name="second">
          <el-form status-icon :model="second" :rules="rules">
            <el-form-item prop="Account" label="账号">
              <el-input v-model="second.Account"></el-input>
            </el-form-item>
            <el-form-item prop="PassWord" label="密码">
              <el-input v-model="second.PassWord" type="password"></el-input>
            </el-form-item>
            <el-button type="success" @click="L_Manager">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="服务员" name="third">
          <el-form status-icon :model="third" :rules="rules">
            <el-form-item prop="Account" label="账号">
              <el-input v-model="third.Account"></el-input>
            </el-form-item>
            <el-form-item prop="PassWord" label="密码">
              <el-input v-model="third.PassWord" type="password"></el-input>
            </el-form-item>
            <el-button type="success" @click="Waiter">登录</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div style="height: 90px;"></div>
  </div>
</template>

<script>
  export default {
    name: "Admin",
    data(){
      let CheckPassWord=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入密码'));
        }else if(value.length<6||value.length>11){
          callback(new Error('请保持密码在6-11位之间'))
        }else{
          callback();
        }
      };
      let CheckAccount=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入账号'));
        }else{
          callback();
        }
      };
      return{
        activeName: 'first',
        first:{
          Account: '',
          PassWord:''
        },
        second:{
          Account: '',
          PassWord:''
        },
        third:{
          Account: '',
          PassWord:''
        },
        rules:{
          PassWord: [{validator:CheckPassWord, trigger: 'blur' }],
          Account:[{validator:CheckAccount,trigger:'blur'}],
        }
      };
    },
    methods:{
      G_Manager(){
        this.$http.post('http://localhost:3000/api/G_Manager/Login',
            {Account:this.first.Account, PassWord:this.first.PassWord}).then(res=>{
          switch (res.data){
            case 1:this.$message.success('登录成功');this.$router.push({path:'/BackStage',query:{ID:'G_Manager'}});break;
            case 0:this.$message.error('用户名或密码错误');break;
          }
        })
      },
      L_Manager(){
        this.$http.post('http://localhost:3000/api/L_Manager/Login',
            {Account:this.second.Account, PassWord:this.second.PassWord}).then(res=>{
          switch (res.data){
            case 1:this.$message.success('登录成功');this.$router.push({path:'/BackStage',query:{ID:'L_Manager'}});break;
            case 0:this.$message.error('用户名或密码错误');break;
          }
        })
      },
      Waiter(){
        this.$http.post('http://localhost:3000/api/Waiter/Login',
            {Account:this.third.Account, PassWord:this.third.PassWord}).then(res=>{
          switch (res.data){
            case 1:this.$message.success('登录成功');this.$router.push({path:'/BackStage',query:{ID:'Waiter'}});break;
            case 0:this.$message.error('用户名或密码错误');break;
          }
        })
      }
    }
  }
</script>

<style scoped>

  #BG_img{
    background-image: url("../assets/images/content_bg.png");
  }
  .el-card{
    border-radius: 20px;
    margin-top: 250px;
  }

</style>