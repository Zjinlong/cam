<template>
<div class="user-box">
    <el-button type="primary" @click="establish()">添加摄像头</el-button>   
    <el-button type="primary" @click="pldel()">批量删除</el-button>   

 <!-- element弹框 -->
<el-dialog :title="camtitle" :visible.sync="dialogFormVisible"  width="39%" top="5vh" :close-on-click-modal='false' @close="resetForm('ruleForm')" v-dialogDrag>
    <el-form :model="dynamicValidateForm" style="width:90%"  ref="dynamicValidateForm" :label-width="formLabelWidth" class="demo-dynamic"  v-if="!isbj">
           <el-form-item>
      <el-button @click="addDomain">新增摄像机 +</el-button>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'摄像机名称' + (index+1)"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '摄像机名称不能为空', trigger: 'blur'
    }"
    style="width:100%"
  >
    <el-input v-model="domain.value" style="display: inline-block;width:43%"></el-input><el-input v-model.number="domain.channel" style="display: inline-block;width:32%;margin:0 0px 0 10px" placeholder="请输入通道号" ></el-input>  <el-button @click.prevent="removeDomain(domain)" style="float: right;width:20%" v-if="index !=0">删除</el-button> 
  </el-form-item>
</el-form>
<div >

  <el-form :model="form" style="width:90%" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
    <el-form-item  label="摄像头" prop="name" v-if="isbj">
      <el-input v-model="form.name" atocomplete="off" ></el-input>
    </el-form-item>
          <el-form-item label="通道" prop="channel"  v-if="isbj">
      <el-input v-model.number="form.channel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="memo">
      <el-input v-model="form.memo" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="厂商"  prop="manufactor"> 
      <el-input v-model="form.manufactor" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="型号"  prop="type">
      <el-input v-model="form.type" autocomplete="off"></el-input>
    </el-form-item>

         <el-form-item label="状态" prop="status">
    <el-select v-model="form.status" placeholder="请选择"  style="width:100%">
      <el-option label="正常" :value="0"></el-option>
      <el-option label="故障" :value="1"></el-option>
      <el-option label="已移除" :value="2"></el-option>
    </el-select>
     </el-form-item>
        <el-form-item label="截帧时间间隔(秒)" prop="captureInterval">
      <el-input v-model.number="form.captureInterval" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频帧起始时间"  prop="val" >
  <el-time-picker
    is-range
    arrow-control
    v-model="val"
    @change='changeTime'
     style="width:100%"
    range-separator="至"
    start-placeholder="视频帧开始时间"
    end-placeholder="视频帧结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
    </el-form-item>
    <el-form-item label="IP"  prop="ip">
      <el-input v-model="form.ip" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="端口"  prop="port">
      <el-input v-model.number="form.port" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="账号" prop="user">
      <el-input v-model="form.user" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码"  prop="password">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
    </div>
  <div slot="footer" class="dialog-footer">

    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>


<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="摄像头">
    <el-input v-model="formInline.user" placeholder="请输入摄像头名称"></el-input>
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
      prop="id"
      label="ID"
    >
    </el-table-column>
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
      prop="type"
      label="型号"
      >
      </el-table-column>
       <el-table-column
      prop="status"
      label="状态"
      >
      </el-table-column>
  <el-table-column
      prop="channel"
      label="通道"
      >
      </el-table-column>
      
     <el-table-column
      prop="captureInterval"
      label="截帧时间间隔(秒)"
      ></el-table-column>

           <el-table-column
      prop="startTime"
      label="开始截帧时间"
      ></el-table-column>

     <el-table-column
      prop="endTime"
      label="结束截帧时间"
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
      prop="user"
      label="账号"
      ></el-table-column>
      <el-table-column
      prop="password"
      label="密码"
      >

    </el-table-column>
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

      label="操作"
      >
      <template slot-scope="scope">
              <el-button
          @click.native.prevent="putRow(scope.row, scope.$index,tableDatas)"
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
import { getCamera, delCamera, putCamera, postCamera } from './fetch.js';
import { isValidIp, isValidPort } from './regex.js';
import _ from '../../../utils/util.js';
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('截帧间隔不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 5) {
                        callback(new Error('截帧间隔不能小于5秒'));
                    } else {
                        callback();
                    }
                }
            }, 100);
        };
        var checkchannel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('截帧间隔不能为空'));
            }

            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
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
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
                ],
                user: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                    { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
                ],
                manufactor: [{ required: true, message: '制造商不能为空', trigger: 'blur' }],
                port: [{ required: true, message: '端口不能为空', trigger: 'blur' }, { validator: checkPort, trigger: 'blur' }],
                type: [{ required: true, message: '型号不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
                memo: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
                captureInterval: [
                    { validator: checkAge, trigger: 'blur' },
                    { required: true, message: '截帧间隔不能为空', trigger: 'blur' }
                ],
                channel: [{ validator: checkchannel, trigger: 'blur' }, { required: true, message: '通道号不能为空', trigger: 'blur' }]
            },
            val: '',
            dynamicValidateForm: {
                domains: [
                    {
                        value: '',
                        channel: ''
                    }
                ],
                email: ''
            },
            currentPage: 1,
            pageSize: 10,
            isbj: false,
            dialogFormVisible: false,
            formLabelWidth: '130px',
            camtitle: '添加摄像头',
            positionX: 0,
            positionY: 0,
            captureInterval: '',
            form: {
                domains: [
                    {
                        value: ''
                    }
                ],
                timeStamp: '2016-05-03',
                id: '111',
                name: 'user',
                status: '正常',
                password: '123456',
                ip: '123',
                user: '15836337880',
                manufactor: '',
                memo: '',
                port: '',
                type: '',
                captureInterval: '',
                startTime: ''
            },
            formInline: {
                user: '',
                region: ''
            },
            tableDatas: [],
            multipleSelection: [],
            pageNum: 1,
            dataTotel: 0,
            tableData: [
                {
                    timeStamp: '2016-05-03',
                    id: '111',
                    name: 'user',
                    status: '正常',
                    password: '123456',
                    ip: '123',
                    user: '15836337880',
                    manufactor: 'B组',
                    memo: '六楼',
                    port: '8052',
                    type: 'zbc11580',
                    captureInterval: '60',
                    startHour: '19',
                    startMinute: '21',
                    startSecond: '32',
                    endHour: '20',
                    endMinute: '05',
                    endSecond: '38'
                }
            ]
        };
    },
    created() {
        this.camlist();

        // this.tableDatas = this.tableData.slice(0, this.pageSize);
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async camlist() {
            let res = await getCamera();
            this.dataTotel = res.length;
            this.tableData = res;
            this.tableDatas = res.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
            for (let item of this.tableDatas) {
                if (item.status == 0) {
                    item.status = '正常';
                } else if ((item.status = 1)) {
                    item.status = '故障';
                } else if ((item.status = 2)) {
                    item.status = '已移除';
                } else {
                    item.status = item.status;
                }
                if (Number(item.timeStamp)) {
                    item.timeStamp = _.formatTime(Number(item.timeStamp), 'Y/M/D');
                }
                item.startTime = `${item.startHour}:${item.startMinute}:${item.startSecond}`;
                item.endTime = `${item.endHour}:${item.endMinute}:${item.endSecond}`;
            }
        },

        changeTime(d) {
            this.form.val = '456';
            // console.log(d[0].getHours());
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#000';
            } else {
                return '';
            }
        },
        handleSizeChange(val) {
            console.log(val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.tableDatas = this.tableData.slice((val - 1) * this.pageSize, val * this.pageSize);
        },
        //   删除用户
        async deleteRow(id, index, rows) {
            let res = await delCamera(id.id);
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            rows.splice(index, 1);
            this.camlist();
        },
        async pldel() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请勾选需要删除的摄像头',
                    type: 'error'
                });
            } else {
                for (let i of this.multipleSelection) {
                    await delCamera(i.id);
                }
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.camlist();
            }
        },
        resetForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        //   编辑用户
        putRow(id, index, rows) {
            this.camtitle = '编辑摄像头';
            this.dialogFormVisible = true;
            this.isbj = true;
            this.val = [
                new Date(2020, 9, 22, this.tableDatas[index].startHour, this.tableDatas[index].endMinute),
                new Date(2020, 9, 22, this.tableDatas[index].endHour, this.tableDatas[index].endMinute)
            ];
            this.form = this.tableDatas[index];
            if (this.form.status == '正常') {
                this.form.status = 0;
            } else if (this.form.status == '故障') {
                this.form.status = 1;
            } else if (this.form.status == '已移除') {
                this.form.status = 2;
            }
        },
        //   添加用户
        establish() {
            this.camtitle = '添加摄像头';
            this.form = {};
            this.form.domains = [];
            this.form.domains.push({ value: '' });
            this.dynamicValidateForm.domains.splice(1);
            this.dynamicValidateForm.domains[0].value = '';
            this.dynamicValidateForm.domains[0].channel = '';
            this.val = '';
            //   this.form.startTime = [new Date(2020, 9, 22, 10, 5), new Date(2020, 9, 22, 11, 23)]
            this.dialogFormVisible = true;
            this.isbj = false;
        },

        //   确认添加或修改
        async confirm(formName) {
            // 判断是添加还是编辑
            if (this.isbj) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.val) {
                            this.request(this.form.name, this.form.channel);
                        } else {
                            this.$message({
                                message: '请选择视频帧起始时间',
                                type: 'error'
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                this.$refs['dynamicValidateForm'].validate(valid => {
                    if (valid) {
                        this.$refs[formName].validate(valid => {
                            if (valid) {
                                if (this.val) {
                                    for (let item of this.dynamicValidateForm.domains) {
                                        if (item.channel == '') {
                                            this.$message({
                                                message: '请填写通道号',
                                                type: 'error'
                                            });
                                            return;
                                        }
                                    }
                                    for (let item of this.dynamicValidateForm.domains) {
                                        this.request(item.value, item.channel);
                                    }
                                } else {
                                    this.$message({
                                        message: '请选择视频帧起始时间',
                                        type: 'error'
                                    });
                                }
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        // 增加摄像头输入框
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                channel: '',
                key: Date.now()
            });
        },
        // 删除摄像头输入框
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        async request(val, channel) {
            let data = {};
            data.name = val;
            data.ip = this.form.ip;
            data.manufactor = this.form.manufactor;
            data.memo = this.form.memo;
            data.password = this.form.password;
            data.port = Number(this.form.port);
            data.status = this.form.status;
            data.timeStamp = new Date().getTime();
            data.type = this.form.type;
            data.user = this.form.user;
            data.channel = channel;
            data.captureInterval = Number(this.form.captureInterval);
            data.endHour = this.val[1].getHours();
            data.endMinute = this.val[1].getMinutes();
            data.endSecond = this.val[1].getSeconds();
            data.startHour = this.val[0].getHours();
            data.startMinute = this.val[0].getMinutes();
            data.startSecond = this.val[0].getSeconds();
            let res;
            let msg = '';
            if (this.isbj) {
                res = await putCamera(this.form.id, data);
                msg = '修改成功';
            } else {
                res = await postCamera(data);
                msg = '添加成功';
            }
            this.dialogFormVisible = false;
            this.camlist();

            this.$message({
                message: msg,
                type: 'success'
            });
        },
        confirms() {},
        //   搜索
        onSubmit() {
            console.log('submit!');
        }
    }
};
</script>

<style scoped>
.user-box {
    padding: 10px 10px;
}
.demo-form-inline {
    float: right;
}
.block {
    width: 500px;
    margin: 50px auto;
}
</style>
