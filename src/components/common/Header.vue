<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="header-img">
                    <img
                        src=""
                        alt
                        class="header-img"
                        style="width:auto;height:100%"
                    />
                   <p class="titleP">
                     配电站房智能安检系统
                     </p> 
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="title-content" style="float: right;">
     
                    <div class="header-tabs">
                        <el-menu
                            :default-active="activeIndex"
                            router
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#273750"
                            text-color="#fff"
                            active-text-color="#273750"
                           
                        >
                         <!-- style="width:490px" -->
                            <el-menu-item
                                v-for="(item,index) in file"
                                :key="index"
                                :index="item.path"
                                class="menui"
                                :class="{'aa':item.show==true}"
                            >{{item.name}}</el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </el-col>
        <el-col :span="10" >
          <div class="logout">
            <el-popover
  placement="bottom"
  width="100"
  trigger="hover">
  <ul class="user-list">
    <li @click="grxx()">个人信息</li>
    <li @click="xgmm()">修改密码</li>
  </ul>
  <span class="log-user" slot="reference">{{userName}}</span>
</el-popover>
            |
            <span class="log-out" @click="islogin = true">退出</span>
          </div>
        </el-col>
        </el-row>

        <el-dialog
  title="退出"
  :visible.sync="islogin"
  width="30%"
  :before-close="handleClose">
  <span>确定退出登录吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="islogin = false">取 消</el-button>
    <el-button type="primary" @click="confirmlog()">确 定</el-button>
  </span>
</el-dialog>

        <el-dialog :title="title" :visible.sync="dialogpass" width="30%" :close-on-click-modal='false'>
  <el-form :model="dataForm" style="width:80%" :rules="pwdRule" ref="ruleForms">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="dataForm.userName" :readonly='true'></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
      <el-input v-model="dataForm.pass" type='password'></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogpass = false">取 消</el-button>
    <el-button type="primary" @click="confirmpass('ruleForms')">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="个人信息" :visible.sync="dialoguser" width="30%" :close-on-click-modal='false'>
  <el-form :model="dataForm" style="width:80%" :rules="pwdRule" ref="ruleuser">
    <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
      <el-input v-model="dataForm.mobile"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input v-model="dataForm.email" ></el-input>
    </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="realName">
      <el-input v-model="dataForm.realName" ></el-input>
    </el-form-item>
  </el-form>
    <div class="personal-relation">
        <div class="relation-item"> <label>用户名: </label>  <span>{{dataForm.userName}} </span></div>
    </div>
     <div class="personal-relation">
      <div class="relation-item"> <label>邮箱: </label>  <span >{{dataForm.email}}</span></div>      
    </div>
       <div class="personal-relation">
      <div class="relation-item"><label>角色: </label>  <span >{{dataForm.role=='ROLE_ADMIN'?'管理员':'普通用户'}}</span></div> 
    </div>
        <div class="personal-relation">
      <div class="relation-item"><label>账号创建时间: </label>  <span >{{dataForm.createTime}}</span></div> 
    </div>
    <div class="personal-relation">
      <div class="relation-item"><label>本次登录时间: </label>  <span >{{dataForm.lastLoginTime}}</span></div> 
    </div>
        <div class="personal-relation">
      <div class="relation-item"><label>上次登录时间: </label>  <span >{{dataForm.lastLoginTime}}</span></div> 
    </div>
     <div class="personal-relation">
      <div class="relation-item"><label>登录次数: </label>  <span >{{dataForm.loginCount}}</span></div> 
    </div>
       <div class="personal-relation">
      <div class="relation-item"><label>上次修改密码: </label>  <span>{{dataForm.lastPasswordChange}}</span></div>      
    </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialoguser = false">取 消</el-button>
    <el-button type="primary" @click="handesub('ruleuser')">保存</el-button>
  </div>
</el-dialog>

    </div>
</template>
<script>
import bus from '../common/bus';
import cryptoJs from 'crypto-js';
import request from '../../utils/request';
import getCookie from '../../utils/util';
import loca from './../page/JSON';
import { getme, putme } from '../page/loginFetch';
import { isuser, ispass, isemail, isphone } from '../page/User/regex.js';

export default {
    data() {
    // 自定义验证
        const validatePass = (rule, value, callback) => {
            const reg = new RegExp('^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}');
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!ispass(value)) {
                callback(new Error('密码长度不少于8位，包含英文大小写、特殊字符、数字'));
            } else {
                callback();
            }
        };
        const checkemail = (rule, value, callback) => {
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
        const checkphone = (rule, value, callback) => {
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
  //    
        return {
            name: '',
            islogin: false,
            activeIndex: '/analysis',
            role: localStorage.getItem('role'),
            dialogFormVisible: false,
            dialogpass: false,
            dialoguser: false,
            formLabelWidth: '100px',
            title: '修改密码',
            form: {
                username: {},
                password: {},
                pdstring: '',
                againpd: '',
                oldpassword: ''
            },
            pwdRule: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                email: [{ validator: checkemail, trigger: 'blur' }],
                mobile: [{ validator: checkphone, trigger: 'blur' }]
            },
            dataForm: {},
            file: [
                {
                    name: '摄像头预警',
                    path: '/home',
                    show: true
                },
                {
                    name: '表记读数',
                    path: '/waterMeter',
                    show: false
                },
                {
                    name: '配置管理',
                    path: '/configuration',
                    show: false
                },
                {
                    name: '用户管理',
                    path: '/user',
                    show: false
                }
            ]
        };
        role: '';
    },
    computed: {
        userName() {
            const username = localStorage.getItem('username');
            return username ? username : this.name;
        }
    },
    created() {
        this.role = JSON.parse(window.localStorage.getItem('role'));
        this.handleSelect(this.$route.path);
        if (this.role.auth[0].authority == 'ROLE_ADMIN') {
            return;
        } else {
            this.file.splice(2, 2);
        }
    },
    methods: {
        // 选择不同的tab菜单
        handleSelect(key, keyPath) {
            this.activeIndex = key;
            this.file.forEach((item, index) => {
                if (item.path == key) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            });
        },

        async handesub(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let bj = {};
                    bj.createTime = new Date().getTime();
                    let u = this.dataForm.userName;
                    bj.email = this.dataForm.email;
                    bj.id = this.dataForm.id;
                    bj.mobile = this.dataForm.mobile;
                    // bj.password = '';
                    bj.realName = this.dataForm.realName;
                    bj.role = this.dataForm.role;
                    bj.userName = this.dataForm.userName;
                    if (this.dataForm.role == 'ROLE_USER') {
                        bj.roleId = 2;
                    } else {
                        bj.roleId = 1;
                    }

                    let res = await putme(u, bj);
                    this.dialoguser = false;
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    await this.users();
                } else {
                    return false;
                }
            });
        },

        confirmlog() {
            this.$router.push('/');
            localStorage.removeItem('username');
        },
        // 设置用户信息
        handelSetUserInfo() {
            this.dialogFormVisible = true;
        },
        // 取消弹框
        cancel(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },

        xgmm() {
            this.dialogpass = true;
        },
        grxx() {
            this.dialoguser = true;
            this.users();
        },
        // 修改代码提交
        async confirmpass(formName) {
            this.$refs[formName].validate(async valid => {
                let data = {};
                let u = this.dataForm.userName;
                data.id = this.dataForm.id;
                data.password = this.dataForm.pass;
                data.userName = this.dataForm.userName;
                if (valid) {
                    let res = await putme(u, data);
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    await this.users();
                    this.dialogpass = false;
                } else {
                    return false;
                }
            });
        },

        async users() {
            let res = await getme();
            this.dataForm = res;
            localStorage.setItem('dataFrom', JSON.stringify(res));
            this.forms = JSON.parse(localStorage.getItem('dataFrom'));
        },
        // 退出账号
        handleExit(command) {
            localStorage.removeItem('username');
            this.$router.push('/login');
        }
    },
    mounted() {
        this.users();
    },
    watch: {
        // 'file': {
        //   handler: function () {
        //     loca.save('file', this.file)
        //   },
        //   deep: true
        // }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    font-size: 22px;
    background: #273750;
}

.header-img {
    width: auto;
    height: 100%;
    /* width: 100px;
    height: 95px; */
}

.header-title {
    margin: 0 auto;
    color: #03716c;
    font-weight: 500;
    font-family: 'Microsoft Yahei';
    font-size: 26px;
    text-align: center;
    height: 49px;
}
.title-content {
    height: 89px;
    /* overflow: hidden; */
}
.header-tabs {
    margin: 50px 0%;
    height: 41px;
    overflow: hidden;
}
.menui {
    /* color: #03716c !important; */
}
.aa {
    background-color: #000 !important;
    color: white !important;
}
/* .el-menu-item.is-active {
    color: white !important;
} */
.el-menu--horizontal > .el-menu-item {
    height: 42px !important;
    line-height: 42px !important;
}
.header-user {
    padding: 15px 50px 0 0;
    font-size: 16px;
    color: #03716c;
    text-align: right;
}

.user-text {
    padding: 10px;
    cursor: pointer;
}
.logout {
    margin: 55px 0 0 75%;
    color: #fff;
    font-size: 18px;
}
.log-user:hover,
.log-out:hover {
    color: #409eff;
    cursor: pointer;
}
.user-list {
    text-align: center;
}
.user-list li {
    height: 30px;
    line-height: 30px;
}
.user-list li:hover {
    background: #eee;
    cursor: pointer;
}

.personal-relation {
    font-size: 16px;
    padding: 0px 20px 0px 0px;
    /* margin-right: 20px; */
    width: 100%;
}

.relation-item {
    padding: 12px 0;
}
.relation-item label {
    display: inline-block;
    width: 90px;
    text-align: right;
    font-size: 14px;
}
.relation-item span {
    display: inline-block;
    width: 60%;
    text-align: left;
    padding-left: 20px;
    font-size: 14px;
}
.titleP {
    color: #fff;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 26px;
}
</style>
