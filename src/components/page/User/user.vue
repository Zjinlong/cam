<template>
<div style="position: relative;min-height: 100%;">

<div class="user-box">
    <el-button type="primary" @click="establish()">创建用户</el-button>
    <el-button type="primary" @click="pldel()">批量删除</el-button> 
    

<el-dialog :title="usertitle" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal='false' @close="resetForm('ruleForms')">
  <el-form :model="form" style="width:88%" :rules="rules" ref="ruleForm">
    <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="form.userName" :readonly='issr' placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="password" v-if="isbj == false">
      <el-input v-model="form.password" :type="istype" placeholder="请输入密码"></el-input>
    </el-form-item>
     <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
    <el-select v-model="form.role" placeholder="请选择" >
      <el-option label="管理员" value="ROLE_ADMIN"></el-option>
      <el-option label="普通用户" value="ROLE_USER"></el-option>
    </el-select>
     </el-form-item>
         <el-form-item label="状态" :label-width="formLabelWidth" v-if="isbj == true">
    <el-select v-model="form.status" placeholder="请选择"  >
      <el-option label="正常" :value="0"></el-option>
      <el-option label="停用" :value="1"></el-option>
    </el-select>
     </el-form-item>
         <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile" >
      <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.realName" placeholder="请输入真实姓名"></el-input>
    </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改密码 -->

<el-dialog :title="usertitle" :visible.sync="dialogpass" width="30%" :close-on-click-modal='false'>
  <el-form :model="forms" style="width:88%" :rules="rules" ref="ruleForms">
    <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="forms.userName" :readonly='issr'></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
      <el-input v-model="forms.pass" :type="istype"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForms')">取 消</el-button>
    <el-button type="primary" @click="confirmpass('ruleForms')">确 定</el-button>
  </div>
</el-dialog>


<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="用户名">
    <el-input v-model="formInline.name" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
  <el-table
    :data="tableDatas"
    @selection-change='handleSelectionChange'
    stripe
    style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="50">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
     >
    </el-table-column>
        <el-table-column
      prop="email"
      label="邮箱"
      >
    </el-table-column>
           <el-table-column
      prop="mobile"
      label="手机号"
      >
    </el-table-column>
        <el-table-column
      prop="realName"
      label="姓名"
      >
    </el-table-column>
        <el-table-column
      prop="status"
      label="状态"
      >
    </el-table-column>
             <el-table-column
      prop="loginTime"
      label="登录时间"
      >
    </el-table-column>

       <el-table-column
      prop="loginCount"
      label="登录次数"
      >
    </el-table-column>
        <el-table-column
      prop="lastLoginTime"
      label="最后登录"
      >
    </el-table-column>
        <el-table-column
      prop="lastPasswordChange"
      label="最后修改密码"
      >
    </el-table-column>
     
   
 
    <el-table-column
      prop="createTime"
      label="创建时间"
      >
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="160"
      >
      <template slot-scope="scope">
              <el-button
          @click.native.prevent="putRow(scope.row, scope.$index,tableDatas)"
          type="text"
          size="small">
          编辑
        </el-button>
              <el-button
          @click.native.prevent="putpass(scope.row, scope.$index,tableDatas)"
          type="text"
          style="margin:0 10px"
          size="small">
          修改密码
        </el-button>
        <!-- <el-button
          @click.native.prevent="deleteRow(scope.row,scope.$index, tableData)"
          type="text"
          size="small">
          删除
        </el-button> -->
            <el-popconfirm
  confirmButtonText='确认'
  cancelButtonText='取消'
  @onConfirm="deleteRow(scope.row,scope.$index, tableDatas)"
  icon="el-icon-info"
  iconColor="red"
  title="确定要删除该条数据吗？"
>
  <el-button slot="reference" type="text" size="small" v-if="scope.row.userName != 'admin'">删除</el-button>
</el-popconfirm>


      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total,prev, pager, next, jumper"
      :total="tableDatas.length">
    </el-pagination>
  </div>
</div>
<Footer :top="'absolute'"/>

</div>

</template>

<script>
import { isuser, ispass, isemail, isphone } from './regex.js';
import { getuserlist, postuserlist, delusers, putusers, getusers } from './fetch.js';
import jwt from 'jsonwebtoken';
import Footer from '@/components/common/footer.vue'


export default {
        components:{Footer},

    created() {
        this.userlist();
    },

    methods: {
        async userlist() {
            let res = await getuserlist();

            this.dataTotel = res.length;
            this.tableData = res;
            this.tableDatas = res.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
            for (let i of this.tableDatas) {
                if (i.status == 0) {
                    i.status = '正常';
                } else if (i.status == 1) {
                    i.status = '已停用';
                }
                  if (i.role == 'ROLE_ADMIN') {
                    i.role = '管理员';
                } else  {
                    i.role = '普通用户';
                }
            }
        },
        handleSizeChange(val) {
       
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.tableDatas = this.tableData.slice((val - 1) * this.pageSize, val * this.pageSize);
        },
           resetForm(formName) {
            this.dialogpass = false
        this.$refs[formName].resetFields();
      },
        //   删除用户
        async deleteRow(id, index, rows) {
            let res = await delusers(id.userName);
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            rows.splice(index, 1);
             this.userlist();
        },
         handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async pldel() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请勾选需要删除的摄像头',
                    type: 'error'
                });
            } else {
                for (let i of this.multipleSelection) {
                    if(i.userName == 'admin'){
                    }else{
                    await delusers(i.userName);
                    }
                }
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.userlist();
            }
        },
        //   编辑用户
        putRow(id, index, rows) {
            this.usertitle = '编辑用户';
            this.dialogFormVisible = true;
            this.issr = true;
            this.isbj = true;
            this.form = this.tableDatas[index];
            this.form.password = '';
            this.u = this.tableDatas[index].userName;
        },
        //   添加用户
        establish() {
            this.usertitle = '添加用户';
            this.form = {};
            this.dialogFormVisible = true;
            this.isbj = false;
            this.issr = false;
        },
        putpass(id, index, rows) {
            this.usertitle = '修改密码';
            this.issr = true;

            this.forms = this.tableDatas[index];
            this.dialogpass = true;
        },
        //   确认添加或修改
        confirm(formName) {
            this.$refs[formName].validate(valid => {
                let data = {};
                data = this.form;
                data.createTime = new Date().getTime();
               
                if (this.form.role == 'ROLE_USER') {
                    data.roleId = 2;
                } else {
                    data.roleId = 1;
                }
                if (valid) {
                    this.request(data);
                } else {
                    return false;
                }
            });
        },
        async confirmpass(formName) {
            this.$refs[formName].validate(async valid => {
                let data = {};
                let u = this.forms.userName;
                data.id = this.forms.id;
                data.password = this.forms.pass;
                data.userName = this.forms.userName;
                if (valid) {
                    let res = await putusers(u, data);
                     this.$message({
                message: '修改成功',
                type: 'success'
            });
                    this.dialogpass = false;
                    await this.userlist();
                } else {
                    return false;
                }
            });
        },
        async request(data) {
            if (this.isbj) {
                let bj = {};
                bj.createTime = new Date().getTime();
                let u = this.form.userName;
                bj.id = this.form.id;
                bj.email = this.form.email;
                bj.mobile = this.form.mobile;
                // bj.password = this.form.password;
                bj.realName = this.form.realName;
                bj.role = this.form.role;
            
                if(this.form.status == '正常'){
                    bj.status = 0;
                }else if(this.form.status == '已停用'){
                    bj.status = 1;
                }else{
                    bj.status = this.form.status;                    
                }
               
                bj.userName = this.form.userName;
                if (this.form.role == 'ROLE_USER') {
                    bj.roleId = 2;
                } else {
                    bj.roleId = 1;
                }

                this.dialogFormVisible = false;
                let res = await putusers(this.u, bj);
                 this.$message({
                message: '修改成功',
                type: 'success'
            }); 
            } else {
                 data.status = 0;
                let res = await postuserlist(data);
                this.dialogFormVisible = false;
            }
            await this.userlist();
        },
        //   搜索
        async onSubmit() {
            let res = await getusers(this.formInline.name);
            let d = [];
            d.push(res);
            this.tableDatas = d;
        }
    },
    data() {
        var checkuser = (rule, value, callback) => {
            if (!isuser(value)) {
                return callback(new Error('账号由3~18位英文字母或数组下划线组成'));
            } else {
                callback();
            }
        };
        var checkemail = (rule, value, callback) => {
            if (!isemail(value)) {               
                if (value) {
                     return callback(new Error('请输入正确的邮箱'));
                } else {
                      callback();
                }
            } else {
                callback();
            }
        };
        var checkphone = (rule, value, callback) => {
            if (!isphone(value)) {
                if (value) {                 
                       return callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        var checkpass = (rule, value, callback) => {
            if (!ispass(value)) {
                if (value) {
                     return callback(new Error('请输入6-16位字符,必须包含数字，字母以及特殊字符(!@#$%^&*)'));
                } else {
                    callback();
                   
                }
            } else {
                callback();
            }
        };
        return {
            rules: {
                group: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
                pass: [{ validator: checkpass, trigger: 'blur' }],
                userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }, { validator: checkuser, trigger: 'blur' }],
                email: [{ validator: checkemail, trigger: 'blur' }],
                mobile:[{ validator: checkphone, trigger: 'blur' }]
            },
            multipleSelection:[],
            usertitle: '添加用户',
            currentPage: 5,
            isbj: false,    
            dialogFormVisible: false,
            issr: false,
            formLabelWidth: '100px',
            dialogpass: false,
            u: '',
            form: {
                user: '',
                password: '',
                group: '',
                email:'',
                mobile:'',
            },
            forms: {
                user: '',
                password: ''
            },
            formInline: {
                name: ''
            },
            istype: 'text',
            currentPage: 1,
            pageSize: 10,
            tableDatas: [],
            dataTotel: 0,
            pageNum: 1,
            tableData: [
                {
                    date: '2016-05-03',
                    id: '115',
                    user: 'username   ',
                    group: '普通用户',
                    password: '123456'
                }
            ]
        };
    }
};
</script>

<style scoped>
.user-box {
    padding: 30px 40px;
    min-height: 100%;
}
.demo-form-inline {
    float: right;
}
.block {
    width: 500px;
    margin: 50px auto;
}
</style>
