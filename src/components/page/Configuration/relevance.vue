<template>
<div class="user-box">
    <el-button type="primary" @click="establish()">添加模型关联</el-button>
    <el-button type="primary" @click="pldel()">批量删除</el-button> 

<el-dialog :title="reltitle" :visible.sync="dialogFormVisible" width="80%" top="5vh" :close-on-click-modal='false' class="dialog"  @close="resetForm('ruleForm')" v-dialogDrag> 
  <div style=" display: flex;justify-content: space-around;marginBottom:10px">
    <div style="width:45%;">
   <p class="reltitle">请选择摄像头</p>
   <el-table
    :data="cams"
     highlight-current-row
     height="400px"
     ref="camTable"
    @current-change="handleCurrent"
    style="width: 100%;">
    
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }},</span>
          </el-form-item>
          <el-form-item label="制造商">
            <span>{{ props.row.manufactor }},</span>
          </el-form-item>
          <el-form-item label="ID">
            <span>{{ props.row.id }},</span>
          </el-form-item>
          <el-form-item label="型号">
            <span>{{ props.row.type }};</span>
          </el-form-item>
          <el-form-item label="Ip">
            <span>{{ props.row.ip }};</span>
          </el-form-item>
          <el-form-item label="端口">
            <span>{{ props.row.port }};</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ props.row.memo }};</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="memo">
    </el-table-column>
  </el-table>
  <div class="relcontent">
    <label>摄像头:</label>
    <!-- <div>{{sxt}} </div> -->
    <input type="text" v-model="sxt" :readonly="true">
  </div>
  </div>
  <div style="width:45%;">
 <p class="reltitle">请选择模型</p>
  <el-table
    :data="mods"
     highlight-current-row
    @current-change="handleCurrentmx"
    ref="modTable"
    height="400"
    style="width: 100%;">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="名称">
            <span>{{ props.row.name }},</span>
          </el-form-item>
          <el-form-item label="制造商">
            <span>{{ props.row.manufactor }},</span>
          </el-form-item>
          <el-form-item label="ID">
            <span>{{ props.row.id }},</span>
          </el-form-item>
          <el-form-item label="型号">
            <span>{{ props.row.type }},</span>
          </el-form-item>
          <el-form-item label="IP">
            <span>{{ props.row.ip }},</span>
          </el-form-item>
          <el-form-item label="端口">
            <span>{{ props.row.port }},</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ props.row.memo }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="memo">
    </el-table-column>
  </el-table>
    <div class="relcontent">
    <label>模型:</label>
    <input type="text" name="" id="" v-model="mx" :readonly="true">
  </div>
  </div>
    </div>
<el-divider content-position="left">摄像头模型关联描述</el-divider>
  <el-form :model="form"  :rules="rules" ref="ruleForm">
         <el-form-item label="描述" :label-width="formLabelWidth" >
      <el-input v-model="form.memo" autocomplete="off" placeholder="请填写描述"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
   <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="confirm()">确 定</el-button>
  </div>
</el-dialog>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="摄像头或模型">
    <el-input v-model="formInline.user" placeholder="请输入摄像头或模型"></el-input>
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
      prop="camId"
      label="摄像头id"
    >
    </el-table-column>
    <el-table-column
      prop="camName"
      label="摄像头名称"
      >
      <!-- id 名称 描述 厂商 型号 状态（正常、故障、已移除） 创建时间 ip 端口 账号 密码。 -->
    </el-table-column>

<!--   <el-table-column
      prop="ip"
      label="摄像头IP"
      ></el-table-column>
          <el-table-column
      prop="port"
      label="摄像头端口"
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
                   -->
               <el-table-column
      prop="modelServiceId"
      label="模型ID"
      >
       </el-table-column>
     <el-table-column
      prop="modelServiceName"
      label="模型名称"
      >
      </el-table-column>
        <el-table-column
      prop="timestamp"
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
      :total="tableDatas.length">
    </el-pagination>
  </div>

</div>

</template>

<script>
import {
    getCameramodelconfig,
    postCameramodelconfig,
    putCameramodelconfig,
    delCameramodelconfig,
    getCamera,
    getModelservice
} from './fetch.js';
import _ from '../../../utils/util.js';

export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            isbj: false,
            sxt: '',
            mx: '',
            dialogcam: false,
            dialogFormVisible: false,
            formLabelWidth: '80px',
            reltitle: '添加摄像头模型关联',
            rules: {
                type: [{ required: true, message: '型号不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
                memo: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
            },
            cams: [
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
            ],
            mods: [
                {
                    timeStamp: '2016-05-03',
                    gatewayId: '514564',
                    id: '222',
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
                    id: '333',
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
            ],
            camOne: '',
            modOne: '',
            form: {
                memo: ''
            },
            formInline: {
                user: '',
                region: ''
            },
            bjArray: [],
            tableDatas: [],
            multipleSelection:[],
            dataTotel: 0,
            pageNum: 1,
            tableData: [
                {
                    id: 1,
                    camId: '111',
                    camName: '123456',
                    modelServiceId: '222',
                    modelServiceName: 'adas',
                    timestamp: 55858426,
                    memo: 'asdas'
                },
                {
                    id: 2,
                    camId: '111',
                    camName: '123456',
                    modelServiceId: '333',
                    modelServiceName: 'adas',
                    timestamp: 55858426,
                    memo: 'asdas'
                }
            ]
        };
    },
    created() {
        this.relelist();
    },
    methods: {
        handleCurrent(val) {
            this.sxt = val.name;
            this.camOne = val.id;
        },
        handleCurrentmx(val) {
            this.mx = val.name;
            this.modOne = val.id;
        },
        async relelist() {
            let res = await getCameramodelconfig();
            this.dataTotel = res.length;
            this.tableData = res;
            this.tableDatas = res.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
            this.cams = await getCamera();
            this.mods = await getModelservice();
            for (let item of this.tableDatas) {
                if (Number(item.timestamp)) {
                    item.timestamp = _.formatTime(Number(item.timestamp), 'Y/M/D');
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
        handleCurrentChange(val) {
            this.pageNum = val;
            this.tableDatas = this.tableData.slice((val - 1) * this.pageSize, val * this.pageSize);
        },
        resetForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        //   删除用户
        async deleteRow(id, index, rows) {
            let res = await delCameramodelconfig(id.id);
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            rows.splice(index, 1);
                this.relelist();
            
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
                    await delCameramodelconfig(i.id);
                }
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.relelist();
            }
        },
        //   编辑用户
        async putRow(id, index, rows) {
            this.reltitle = '编辑摄像头模型关联';
            this.dialogFormVisible = true;
            this.isbj = true;
            this.form = this.tableDatas[index];
            this.sxt = this.form.camName;
            this.mx = this.form.modelServiceName;
            this.modOne = this.form.modelServiceId;
            this.camOne = this.form.camId;
            setTimeout(() => {
                for (let c in this.cams) {
                    if (this.cams[c].id == this.camOne) {
                        this.$refs.camTable.setCurrentRow(this.cams[c]);
                    } else {
                    }
                }
                for (let d in this.mods) {
                    if (this.mods[d].id == this.modOne) {
                        this.$refs.modTable.setCurrentRow(this.mods[d]);
                    } else {
                    }
                }
            }, 20);
        },
        //   添加用户
        async establish() {
            
            this.reltitle = '添加摄像头模型关联';
            this.sxt = '';
            this.mx = '';
            this.form.memo = '';
            this.dialogFormVisible = true;
            this.isbj = false;
            this.$refs.camTable.setCurrentRow();
            this.$refs.modTable.setCurrentRow();
        },
        addModel() {
            this.dialogcam = true;
        },
        //   确认添加或修改
        async confirm() {
            if (this.sxt == '') {
                this.$message({
                    message: '请选择摄像头',
                    type: 'error'
                });
            } else if (this.mx == '') {
                this.$message({
                    message: '请选择模型',
                    type: 'error'
                });
            } else if (this.form.memo == '') {
                this.$message({
                    message: '请输入描述',
                    type: 'error'
                });
            } else {
                let data = {};
                for (let c of this.cams) {
                    if (this.camOne == c.id) {
                        this.form.c = c;
                    }
                }
                for (let d of this.mods) {
                    if (this.modOne == d.id) {
                        this.form.d = d;
                    }
                }

                data.camId = this.form.c.id;
                data.camName = this.form.c.name;
                data.modelServiceId = this.form.d.id;
                data.modelServiceName = this.form.d.name;
                data.memo = this.form.memo;
                data.timestamp = new Date().getTime();
                let res;
                let msg = '';
                if (this.isbj) {
                    res = await putCameramodelconfig(this.form.id, data);
                    msg = '修改成功';
                } else {
                    res = await postCameramodelconfig(data);
                    msg = '添加成功';
                }
                this.dialogFormVisible = false;
                this.relelist();
                this.$message({
                    message: msg,
                    type: 'success'
                });
            }
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

.reltitle {
    margin: 10px 0;
    font-size: 20px;
    text-align: center;
}
.demo-form-inline {
    float: right;
}
.block {
    width: 500px;
    margin: 50px auto;
}
.relcontent {
    display: flex;
    width: 100%;
    height: 30px;
    margin-top: 20px;
}
.relcontent input {
    border: 1px solid #eee;
    width: 90%;
    border-radius: 2px;
    padding-left: 10px;
}
.relcontent label {
    padding-top: 5px;
    margin-right: 5px;
    display: inline-block;
    width: 50px;
}
</style>
 
 <style>
.dialog .el-table tr:hover {
    cursor: pointer;
}
</style>