<template>
  <div id="BG_img">
    <div style="height: 90px;"></div>
    <div class="container" style="margin: auto;height: 850px;width: 1060px;" :class="Add_Class" id="login-box">
      <div class="form-container sign-up-container">
        <el-form :model="Register" :rules="rules">
          <h1>注册</h1>
          <el-form-item prop="Account" label="账号">
            <el-input v-model="Register.Account"></el-input>
          </el-form-item>
          <el-form-item prop="Name" label="姓名">
            <el-input v-model="Register.Name"></el-input>
          </el-form-item>
          <el-form-item prop="Phone" label="邮箱">
            <el-input v-model="Register.Phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="Register.Sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="照片">
            <input @change="handleFiles" type="file" accept='image/*' ref="Photo">
            <el-button @click="OpenCamera">拍照</el-button>
          </el-form-item>
          <el-form-item prop="PassWord" label="密码">
            <el-input type="PassWord" v-model="Register.PassWord"></el-input>
          </el-form-item>
          <el-form-item prop="C_PassWord" label="确认密码">
            <el-input type="PassWord"  v-model="Register.C_PassWord"></el-input>
          </el-form-item>
          <el-button @click="Add">注册</el-button>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form :model="SignIn" :rules="rules">
          <h1>登录</h1>
          <el-form-item prop="Account" label="账号">
            <el-input v-model="SignIn.Account"></el-input>
          </el-form-item>
          <el-form-item prop="PassWord" label="密码">
            <el-input type="password" v-model="SignIn.PassWord"></el-input>
          </el-form-item>
          <el-button @click="User">登录</el-button>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有账号？</h1>
            <p>请使用您的账号进行登录</p>
            <button class="ghost"  @click="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有账号?</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="ghost" @click="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 90px;"></div>
    <el-dialog title="提示" :before-close="stopNavigator" :visible.sync="dialogVisible">
      <video v-show="!CanvasType" style="margin: auto" width="800" id="video" height="600" ref="videoDom" preload autoplay loop muted></video>
      <canvas v-show="CanvasType" style="margin: auto" width="800" height="600" ref="canvasDOM"></canvas>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stopNavigator">取消</el-button>
        <el-button type="primary" @click="Snap">{{Text}}</el-button>
        <el-button type="primary" @click="PhotoConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "User",
    mounted() {
      this.$http.post('http://localhost:3000/api/Face/getToken',{}).then((res)=>{
        this.access_token = res.data.access_token
      })
    },
    data() {
      let CheckAccount=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入账号'));
        }else{
          callback();
        }
      };
      let CheckPassWord=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入密码'));
        }else if(value.length<6||value.length>15){
          callback(new Error('请保持密码在6-15位之间'))
        }else{
          callback();
        }
      };
      let CheckPhone=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入邮箱'));
        }else if(!value.includes('@')){
          callback(new Error('请输入正确的邮箱'))
        }else{
          callback();
        }
      };
      let ComfirmPassWord=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请再次输入密码'));
        }else if(value!==this.Register.PassWord){
          callback(new Error('两次密码不一致'))
        }else{
          callback();
        }
      };
      let CheckName=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请再次输入密码'));
        }else{
          callback();
        }
      };
      return{
        access_token: '',
        Text:'拍照',
        Add_Class: '',
        AddButton:true,
        CanvasType:false,
        dialogVisible:false,
        Register:{
          Account:'',
          PassWord:'',
          C_PassWord:'',
          Name:'',
          Sex:'',
          Phone:'',
          VIP:"No",
          Img_base64:'',
        },
        SignIn:{
          Account:'',
          PassWord:'',
        },
        rules:{
          PassWord: [{validator:CheckPassWord, trigger: 'blur' }],
          Account:[{validator:CheckAccount,trigger:'blur'}],
          Phone:[{validator:CheckPhone,trigger:'blur'}],
          C_PassWord:[{validator:ComfirmPassWord,trigger:'blur'}],
          Name:[{validator:CheckName,trigger:'blur'}]
        }
      }
    },
    methods:{
      PhotoConfirm(){
        this.dialogVisible=false
        this.Register.Img_base64=this.$refs.canvasDOM.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, "")
        this.Text="拍照"
        this.CanvasType=false
        this.$refs.videoDom.srcObject.getTracks()[0].stop();
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
      handleFiles() {
        let file = this.$refs.Photo.files[0];
        let reader = new FileReader();
        let that=this
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          that.Register.Img_base64=e.target.result.replace(/^data:image\/\w+;base64,/, "")
        }
      },
      signUp(){
        this.Add_Class='right-panel-active'
      },
      signIn(){
        this.Add_Class=''
      },
      User(){
        this.$http.post('http://localhost:3000/api/User/Login',
            {Account:this.SignIn.Account, PassWord:this.SignIn.PassWord}).then(res=>{
              if(res.data===0)this.$message.error('用户名或密码错误');
              else{
                    this.$store.dispatch('ChangeLoginType',true)
                    this.$store.dispatch('GetUser',res.data[0])
                    this.$message.success('登录成功');
                    this.$router.push('/');
              }
        })
      },
      Add(){
        if(this.Register.Account==='') this.$message.error('账号不能为空')
        else if(this.Register.Name==='') this.$message.error('姓名不能为空')
        else if(this.Register.Sex==='') this.$message.error('性别不能为空')
        else if(this.Register.PassWord==='') this.$message.error('密码不能为空')
        else if(this.Register.C_PassWord==='') this.$message.error('重复不能为空')
        else if(this.Register.Phone==='') this.$message.error('电子邮箱不能为空')
        else if(this.Register.Img_base64==='')  this.$message.error('照片不能为空')
        else{
          this.$http.post('http://localhost:3000/api/User/Add',
              {Account:this.Register.Account,PassWord:this.Register.PassWord,Name:this.Register.Name,Sex:this.Register.Sex,Phone:this.Register.Phone,VIP:this.Register.VIP}).then(res=>{
            switch(res.data){
              case 1:this.$message.success('创建用户成功');break;
              case 0:this.$message.error('创建用户失败');break;}
          })
          this.$http.post('http://localhost:3000/api/Face/initFace',{
            access_token: this.access_token,
            Img_base64: this.Register.Img_base64,
            user_id:this.Register.Account
          }).then((res)=>{
            if(res.data.error_code === 0){
              this.$message.success('上传人脸库管理成功')
              this.$router.push('/')
            }else{
              this.$message.warning('人脸已存在,请勿重复添加')
            }
          })
        }
      },
    }
  }

</script>

<style scoped>

  #BG_img{
    background: url("../assets/images/content_bg.png");
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat',sans-serif;
    background-image: linear-gradient(120deg,#3498db,#8e44ad);;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: -20px 0 50px;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    text-align: center;
  }

  .social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  .social-container a:hover {
    background-color: #eee;
  }

  .txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 3px;
    height: 35px;
  }

  .txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    transition: .5s;
  }
  .txtb span::after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    width: 0;
    height: 2px;
    background-image: linear-gradient(120deg,#3498db,#8e44ad);
    transition: .5s;
  }

  .focus + span::before {
    top: -5px;
  }

  .focus + span::after {
    width: 100%;
  }

  button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  button:active {
    transform: scale(.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background: transparent;
    border-color: #fff;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
  }

  .form-container button {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: .5s;
  }

  .form-container button:hover {
    background-position: right;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }
  .sign-in-container form a {
    position: relative;
    left: 100px;
  }
  .sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
  }
  .sign-up-container button {
    margin-top: 20px;
  }
  .overlay-container {
    position:absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
  }
  .overlay {
    background-image: linear-gradient(120deg,#3498db,#8e44ad);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
  }
  .overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
  }
  .overlay-right {
    right: 0;
    transform: translateY(0);

  }

  .overlay-left {
    transform: translateY(-20%);
  }

  .container.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  .container.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }
  .container.container.right-panel-active .overlay {
    transform: translateX(50%);
  }
  .container.container.right-panel-active .overlay-left {
    transform: translateY(0);
  }
  .container.container.right-panel-active .overlay-right {
    transform: translateY(20%);
  }
</style>