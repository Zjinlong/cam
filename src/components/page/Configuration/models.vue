<template>
<div class="user-box">
    <!-- <el-button type="primary" @click="establish()">添加模型</el-button> -->
               <el-popover
  placement="bottom"
  width="50"
  trigger="click">
  <ul class="user-list">
    <li @click="establish('http')">http协议模型</li>
    <li @click="establish('local')">本地协议模型</li>
  </ul>
  <span class="mod-user" slot="reference">添加模型</span>
</el-popover>
<el-button type="primary" @click="pldel()">批量删除</el-button>   
<el-dialog :title="modtitle" :visible.sync="dialogFormVisible" width="25%" top="5vh" :close-on-click-modal='false'  @close="resetForm('ruleForm')" v-dialogDrag>
  <el-form :model="form" style="width:84%" :rules="rules" ref="ruleForm">
    <el-form-item label="名称" :label-width="formLabelWidth" prop='name'>
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth" prop='memo'>
      <el-input v-model="form.memo" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="厂商" :label-width="formLabelWidth" prop='manufactor'>
      <el-input v-model="form.manufactor" autocomplete="off" ></el-input>
    </el-form-item>
    <!-- <el-form-item label="型号" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item> -->
         <el-form-item label="状态" :label-width="formLabelWidth" prop='status'>
    <el-select v-model="form.status" placeholder="请选择"  style="width:100%">
      <el-option label="正常" :value="0"></el-option>
      <el-option label="故障" :value="1"></el-option>
      <el-option label="已移除" :value="2"></el-option>
    </el-select>
     </el-form-item>

  <el-form-item label="本地目录" :label-width="formLabelWidth" prop='idNameMappingString' v-if="types=='local'">
      <el-input v-model="form.txtResBaseDir" autocomplete="off"  placeholder="例:D:vedioSystem_related	xt_res" ></el-input>
    </el-form-item>
    <el-form-item label="模型名字映射" :label-width="formLabelWidth" prop='idNameMappingString'>
      <el-input v-model="form.idNameMappingString" autocomplete="off"  placeholder="例: 0,未戴安全帽;1，闯;2，抽烟" ></el-input>
    </el-form-item>
      <el-form-item label="IP" :label-width="formLabelWidth" prop='ip' v-if="types=='http'">
      <el-input v-model="form.ip" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="端口" :label-width="formLabelWidth" prop='port' v-if="types=='http'">
      <el-input v-model="form.port" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
     <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="模型">
    <el-input v-model="formInline.user" placeholder="请输入模型名称"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
<el-table
    :data="tableDatas"
    :header-cell-style="getRowClass"
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
      width="150">
    </el-table-column>
          <!-- <el-table-column
      prop="gatewayId"
      label="所在网关ID"
      >
      </el-table-column> -->
    <el-table-column
      prop="name"
      label="名称"
      >
      <!-- id 名称 描述 厂商 型号 状态（正常、故障、已移除） 创建时间 ip 端口 账号 密码。 -->
    </el-table-column>

     <el-table-column
      prop="manufactor"
      label="制造商"
      >
      </el-table-column>

       <el-table-column
      prop="status"
      label="状态"
      >
      </el-table-column>
          <el-table-column
      prop="typeName"
      label="类型"
      ></el-table-column>
          <el-table-column
      prop="idNameMappingString"
      label="模型名字映射"
      ></el-table-column>
            <el-table-column
      prop="txtResBaseDir"
      label="本地目录"
      ></el-table-column>


      <el-table-column
      prop="ip"
      label="IP"
      ></el-table-column>
          <el-table-column
      prop="port"
      label="端口"
      ></el-table-column>

           <el-table-column
      prop="timeStamp"
      label="创建时间"
      >
      </el-table-column>
              <el-table-column
      prop="memo"
      label="描述"
      >
      </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
              <el-button
          @click.native.prevent="putRow(scope.row, scope.$index,tableData)"
          type="text"
          size="small">
          编辑
        </el-button>
    
       <el-popconfirm
  confirmButtonText='确认'
  cancelButtonText='取消'
  @onConfirm="deleteRow(scope.row,scope.$index, tableDatas)"
  icon="el-icon-info"
  iconColor="red"
  title="确定要删除该条数据吗？"
>
  <el-button slot="reference" type="text" size="small">删除</el-button>
</el-popconfirm>

      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="dataTotel">
    </el-pagination>
  </div>

</div>

</template>

<script>
import { getModelservice, postModelservice, putModelservice, delModelservice } from './fetch.js';
import { isValidIp, isValidPort } from './regex.js';
import _ from '../../../utils/util.js';

export default {
    data() {
        var checkIp = (rule, value, callback) => {
            if (!isValidIp(value)) {
                return callback(new Error('请输入合法的IP'));
            } else {
                callback();
            }
        };
        var checkPort = (rule, value, callback) => {
            if (!isValidPort(value)) {
                return callback(new Error('请输入有效的端口'));
            } else {
                callback();
            }
        };
        return {
            rules: {
                ip: [{ required: true, message: 'ip不能为空', trigger: 'blur' }, { validator: checkIp, trigger: 'blur' }],
                status: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
                // gatewayId: [{ required: true, message: '网关ID不能为空', trigger: 'blur' }],
                manufactor: [{ required: true, message: '制造商不能为空', trigger: 'blur' }],
                port: [{ required: true, message: '端口不能为空', trigger: 'blur' }, { validator: checkPort, trigger: 'blur' }],
                type: [{ required: true, message: '型号不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
                memo: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
            },
            currentPage: 1,
            pageSize: 10,
            isbj: false,
            modtitle: '添加模型',
            dialogFormVisible: false,
            types: 'http',
            formLabelWidth: '100px',
            form: {
                name: '',
                password: '',
                group: ''
            },
            formInline: {
                user: '',
                region: ''
            },
            bjArray: [],
            multipleSelection: [],
            dataTotel: 0,
            pageNum: 1,
            tableDatas: [],
            tableData: [
                {
                    timeStamp: '2016-05-03',
                    gatewayId: '514564',
                    id: '111',
                    name: 'user',
                    status: '正常',
                    password: '123456',
                    ip: '123',
                    user: '15836337880',
                    manufactor: 'B组',
                    memo: '六楼',
                    ports: '8052',
                    type: 'zbc11580'
                },
                {
                    timeStamp: '2016-05-03',
                    gatewayId: '514564',
                    id: '111',
                    name: 'user',
                    status: '故障',
                    password: '123456',
                    ip: '155',
                    user: '15836337880',
                    manufactor: '司马',
                    memo: '三楼',
                    port: '6700',
                    type: 'zbc11580'
                }
            ]
        };
    },
    created() {
        // this.tableDatas = this.tableData.slice(0, this.pageSize);
        this.modlist();
    },
    methods: {
        async modlist() {
            let res = await getModelservice();
            this.dataTotel = res.length;
            this.tableData = res;
            this.tableDatas = res.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
            for (let item of this.tableDatas) {
                if (item.status == 0) {
                    item.status = '正常';
                } else if (item.status == 1) {
                    item.status = '故障';
                } else if (item.status == 2) {
                    item.status = '已移除';
                } else {
                    item.status = item.status;
                }
                if (Number(item.timeStamp)) {
                    item.timeStamp = _.formatTime(Number(item.timeStamp), 'Y/M/D');
                }
            }
        },

        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:rgb(238, 238, 238)';
            } else {
                return '';
            }
        },
        handleSizeChange(val) {},
        // 分页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.tableDatas = this.tableData.slice((val - 1) * this.pageSize, val * this.pageSize);
        },
        //   删除用户
        async deleteRow(id, index, rows) {
            let res = await delModelservice(id.id);
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            rows.splice(index, 1);
            this.modlist();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 批量删除
        async pldel() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请勾选需要删除的摄像头',
                    type: 'error'
                });
            } else {
                for (let i of this.multipleSelection) {
                    await delModelservice(i.id);
                }
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.modlist();
            }
        },
        //   编辑用户
        putRow(id, index, rows) {
            this.modtitle = '编辑模型';
            this.dialogFormVisible = true;
            this.isbj = true;
            this.form = this.tableDatas[index];
            if (this.form.type == 0) {
                this.types = 'http';
            } else if (this.form.type == 2) {
                this.types = 'loal';
            }

            if (this.form.status == '正常') {
                this.form.status = 0;
            } else if (this.form.status == '故障') {
                this.form.status = 1;
            } else if (this.form.status == '已移除') {
                this.form.status = 2;
            }
        },
        //   添加用户
        establish(t) {
            this.types = t;
            this.modtitle = '添加模型';
            this.dialogFormVisible = true;
            this.isbj = false;
            this.form = {};
        },
        // 关闭弹窗
        resetForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        //   确认添加或修改
        async confirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.request();
                } else {
                    return false;
                }
            });
        },
        async request() {
            let data = {};
            data.name = this.form.name;
            data.manufactor = this.form.manufactor;
            data.memo = this.form.memo;
            data.status = this.form.status;
            data.timeStamp = new Date().getTime();
            data.gatewayId = 1;
            data.urlPrefix = 'string';
            data.urlSurfix = 'string';
            data.idNameMappingString = this.form.idNameMappingString;
            data.port = Number(this.form.port);
            data.ip = this.form.ip;
            data.type = this.types == 'http' ? 0 : 2;
            data.typeName = this.types;
            data.txtResBaseDir = this.form.txtResBaseDir;
            data.captureInterval = 10;
            data.endHour = 23;
            data.endMinute = 59;
            data.endSecond = 59;
            data.gatewayId = 0;
            data.startHour = 0;
            data.startMinute = 0;
            data.startSecond = 0;

            // data.type = this.form.type;
            let res;
            let msg = '';
            if (this.isbj) {
                res = await putModelservice(this.form.id, data);
                msg = '修改成功';
            } else {
                res = await postModelservice(data);
                msg = '添加成功';
            }
            this.dialogFormVisible = false;
            this.modlist();

            this.$message({
                message: msg,
                type: 'success'
            });
        },
        //   搜索
        onSubmit() {
            console.log('submit!');
        }
    }
};
</script>

<style scoped>
.user-box {
    padding: 10px;
}
.demo-form-inline {
    float: right;
}
.block {
    width: 500px;
    margin: 50px auto;
}
.mod-user {
    display: inline-block;
    width: 80px;
    height: 32px;
    margin-right: 10px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    color: #fff;
    background: #409eff;
    border-radius: 4px;
    cursor: pointer;
}
.user-list {
    text-align: center;
}
.user-list li {
    height: 25px;
    line-height: 25px;
}
.user-list li:hover {
    background: #ddd;
    cursor: pointer;
    color: #fff;
}
</style>
