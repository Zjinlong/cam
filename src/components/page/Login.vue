<template>
    <div class="login-wrap">
        <div class="ms-login">
            <!-- <div class="ms-title">欢迎登录输电线路缺陷识别系统</div> -->
            <!-- <div class="ms-title">直升机巡视图片查缺系统</div> -->
            <div class="ms-title">配电站房智能安检系统</div>
            <el-form
                :model="loginForm"
                :rules="rules"
                ref="login"
                label-width="0px"
                class="ms-content"
              >
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="loginForm.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
// import cryptoJs from 'crypto-js';
// import getCookie from '../../utils/util';
// import loca from './JSON'
import  jwt  from  'jsonwebtoken'
import { postSignin } from './loginFetch';
// import { isuser, ispass, isemail, isphone } from './regex.js';


export default {
  data: function () {
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
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      role: "",//角色
      url: '',
      userid: '',
      algotable: []
    };
  },
  created: function () {
    const self = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        self.submitForm();
      }
    };

    if (window.localStorage['info']) {
      let userData = JSON.parse(window.localStorage['info']);
      this.loginForm.username = userData.username;
      this.loginForm.password = userData.password;
    }

    // var vm = this;
    // vm.userid = getCookie('userid');
    // var ip = ''
    // var propt = ""
    // $getJSON()
  },
  methods: {
    async getRoleAndToIndex() {
      const res = await dispatchGetRole();
      if (res.status === 'ok') {

        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.rolename);
        localStorage.setItem('organizationid', res.organizationid);
           localStorage.setItem('role2', JSON.stringify(res.rolename))
        // console.log(this.$store.state.role)
        // TODO 此处代码为记住密码预留
        localStorage.setItem('info', JSON.stringify(this.loginForm));

        this.loginForm = {}; //登录成功置为空值
        this.$message.success('登录成功');
        this.$router.push({ path: '/home' });
      }
    },
    submitForm() {
 
      //    return      
      // console.log(this.$refs.login)
      this.$refs.login.validate(async valid => {
        const data = {
           'password': this.loginForm.password ,
          'username': this.loginForm.username,
          // password: cryptoJs.MD5(this.loginForm.password + 'h2qWujeJb').toString(),
         
          // _xsrf: getCookie('_xsrf') || '2|720b05d4|181decfbd7989ea5855d280ec7a74611|1584895611'
        };
        if (valid) {
          const res = await postSignin(data);
          localStorage.setItem('_xsrf',res)
          let  jwt = require('jsonwebtoken');
          let str =   jwt.decode(res)


         localStorage.setItem('username', str.sub);
         localStorage.setItem('role',JSON.stringify(str));
         this.$router.push({ path: '/home' })
        } else {
          this.$message.error('请输入账号和密码');
        }
      });
    }
  },
  watch: {
    // '$store.state.role': {
    //   handler: function () {
    //     loca.save('role', this.$store.state.role)
    //   },
    //   deep: true
    // },
  }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/back.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    /* border-bottom: 1px solid #ddd; */
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
    /* background-color: rgb(2, 114, 108);
    border-color: rgb(2, 114, 108); */
    font-size: 16px;
}
</style>
