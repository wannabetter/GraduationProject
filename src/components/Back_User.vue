<template>
  <div>
    <div style="margin-bottom: 5px;margin-top: 5px;">
      <el-input v-model="Search" style="width: 93%;" prefix-icon="el-icon-search" placeholder="请输入用户姓名">
      </el-input>
      <el-button style="float: right;" type="success" @click="dialogFormVisible =true">增加</el-button>
      <el-dialog title="增加新用户" :visible.sync="dialogFormVisible">
        <el-form :model="Register" :rules="rules">
          <el-form-item prop="Account" label="账号">
            <el-input v-model="Register.Account"></el-input>
          </el-form-item>
          <el-form-item prop="Name" label="姓名">
            <el-input v-model="Register.Name"></el-input>
          </el-form-item>
          <el-form-item prop="Phone" label="电话">
            <el-input v-model="Register.Phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="Register.Sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员">
            <el-radio-group v-model="Register.VIP">
              <el-radio label="Yes"></el-radio>
              <el-radio label="No"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="PassWord" label="密码">
            <el-input type="PassWord" v-model="Register.PassWord"></el-input>
          </el-form-item>
          <el-form-item prop="C_PassWord" label="确认密码">
            <el-input type="password" v-model="Register.C_PassWord"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;$message.info('创建用户失败')">取消</el-button>
          <el-button type="primary" @click="dialogFormYes">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-card v-for="data in Data.slice((currentPage-1)*4,currentPage*4)" :key="data.Account" style="margin-bottom: 5px">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="账号">{{data.Account}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{data.Name}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{data.Sex}}</el-descriptions-item>
        <el-descriptions-item label="密码">{{data.PassWord}}</el-descriptions-item>
        <el-descriptions-item label="电话号码">{{data.Phone}}</el-descriptions-item>
        <el-descriptions-item label="会员">{{data.VIP}}</el-descriptions-item>
      </el-descriptions>
      <el-popconfirm style="float: right;margin-bottom: 5px;margin-left: 5px;" title="确定删除吗？" @confirm="DeleteUser(data)">
        <el-button type="danger" slot="reference">删除</el-button>
      </el-popconfirm>
      <el-popconfirm v-show="data.VIP==='No'" style="float: right;margin-bottom: 5px;" title="确定升级吗？" @confirm="UpUser(data)">
        <el-button type="success" slot="reference">升级</el-button>
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
    name: "Back_User",
    data(){
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
        }else if(value.length<6||value.length>11){
          callback(new Error('请保持密码在6-11位之间'))
        }else{
          callback();
        }
      };
      let CheckPhone=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入电话'));
        }else if(value.length!==11){
          callback(new Error('请保持电话号码为11位之间'))
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
        currentPage:1,
        Items:0,
        Search:'',
        Data:[],
        dialogFormVisible:false,
        Register:{
          Account:'',
          PassWord:'',
          C_PassWord:'',
          Name:'',
          Sex:'',
          Phone:'',
          VIP:"No",
        },
        formLabelWidth: '120px',
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
      handleCurrentChange(val) {
        this.currentPage=val
      },
      UpUser(data){
        this.$http.post('http://localhost:3000/api/User/Update',
            {Account:data.Account, PassWord:data.PassWord}).then(res=>{
          switch (res.data){
            case 1:{
              this.$message.success('升级VIP成功');
              data.VIP='Yes'
              break;
            }
            case 0:this.$message.error('升级VIP失败');break;
          }
        })
      },
      DeleteUser(data){
        this.$http.post('http://localhost:3000/api/User/Delete',
            {Account:data.Account, PassWord:data.PassWord}).then(res=>{
          switch (res.data){
            case 1:{
              this.$message.success('删除用户成功');
              this.Data.splice(this.Data.indexOf(data),1);
              break;
            }
            case 0:this.$message.error('删除用户失败');break;
          }
        })
      },
      dialogFormYes(){
        this.dialogFormVisible=false;
        this.$http.post('http://localhost:3000/api/User/Add',
            {Account:this.Register.Account,PassWord:this.Register.PassWord,Name:this.Register.Name,Sex:this.Register.Sex,Phone:this.Register.Phone,VIP:this.Register.VIP}).then(res=>{
          switch(res.data){
            case 1:this.$message.success('创建用户成功');break;
            case 0:this.$message.error('创建用户失败');break;}
        })
      }
    },
    watch:{
      Search:{
        immediate:true,
        handler(newValue){
          this.currentPage=1
          if(newValue===''){
            this.$http.post('http://localhost:3000/api/User/Select').then(res=>{
              if(res.data!==0){
                this.Data=res.data
                this.Items=res.data.length
              }
            })
          }else{
            this.$http.post('http://localhost:3000/api/User/SelectUser',{Name:newValue}).then(res=>{
              if(res.data!==0){
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