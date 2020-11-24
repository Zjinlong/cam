<template>
<div class="user-box">
    <el-button type="primary" @click="establish()">添加网关</el-button>

<el-dialog title="添加网关" :visible.sync="dialogFormVisible" width="25%" top="5vh" @close="resetForm('ruleForm')" v-dialogDrag>
  <!-- <el-form :model="form" style="width:400px">
    <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="厂商" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="型号" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
         <el-form-item label="状态" :label-width="formLabelWidth">
    <el-select v-model="form.group" placeholder="请选择"  style="width:100%">
      <el-option label="正常" value="shanghai"></el-option>
      <el-option label="故障" value="beijing"></el-option>
      <el-option label="已移除" value="asd"></el-option>
    </el-select>
     </el-form-item>
    <el-form-item label="创建时间" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="IP" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="端口" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
  </el-form> -->
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'域名' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>    <el-button @click="addDomain">新增域名</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>

    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="confirm()">确 定</el-button>
  </div>
</el-dialog>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="网关">
    <el-input v-model="formInline.user" placeholder="请输入网关名称"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
  <el-table
    :data="tableDatas"
    :header-cell-style="getRowClass"
    stripe
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="150">
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
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除
        </el-button>


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
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            isbj: false,
            dialogFormVisible: false,
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
            pageNum: 1,
            dataTotel: 0,
            tableDatas: [],
            tableData: [
                {
                    timeStamp: '2016-05-03',
                    id: '111',
                    name: 'user',
                    status: '故障',
                    password: '123456',
                    ip: '123',
                    user: '15836337880',
                    manufactor: '海尔',
                    memo: '大门',
                    port: '8066',
                    type: 'zbc11580'
                },
                {
                    timeStamp: '2016-05-04',
                    id: '112',
                    name: 'admin',
                    status: '正常',
                    password: '123635',
                    ip: '125',
                    user: '15873633752',
                    manufactor: '海斯',
                    memo: '窗户',
                    port: '7102',
                    type: 'zbc1114'
                },
                {
                    timeStamp: '2016-05-03',
                    id: '113',
                    name: 'user',
                    status: '正常',
                    password: '123456',
                    ip: '125',
                    user: '15836337880',
                    manufactor: '海尔1',
                    memo: '过道',
                    port: '8063',
                    type: 'zbc11580'
                },
                {
                    timeStamp: '2016-05-03',
                    id: '111',
                    name: 'user',
                    status: '正常',
                    password: '123456',
                    ip: '123',
                    user: '15836337880',
                    manufactor: '海尔',
                    memo: '小门',
                    port: '8066',
                    type: 'zbc11580'
                },
                {
                    timeStamp: '2016-05-03',
                    id: '111',
                    name: 'user',
                    status: '正常',
                    password: '123456',
                    ip: '123',
                    user: '15836337880',
                    manufactor: '大苏打',
                    memo: '阿斯顿',
                    port: '8066',
                    type: 'zbc11580'
                },
                {
                    timeStamp: '2016-05-03',
                    id: '111',
                    name: 'user',
                    status: '正常',
                    password: '123456',
                    ip: '123',
                    user: '15836337880',
                    manufactor: 'A组',
                    memo: '大门',
                    port: '8066',
                    type: 'zbc11580'
                },
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
                    ports: '8052',
                    type: 'zbc11580'
                },
                {
                    timeStamp: '2016-05-03',
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
            ],
            dynamicValidateForm: {
                domains: [
                    {
                        value: ''
                    }
                ],
                email: ''
            }
        };
    },
    created() {
        this.tableDatas = this.tableData.slice(0, this.pageSize);
    },
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:rgb(238, 238, 238)';
            } else {
                return '';
            }
        },
        handleSizeChange(val) {
            console.log(val);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        addDomain() {
            console.log(this.dynamicValidateForm.domains);
            this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
            });
        },
        resetForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(val) {
            this.tableDatas = this.tableData.slice((val - 1) * this.pageSize, val * this.pageSize);
        },
        //   删除用户
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //   编辑用户
        putRow(id, index, rows) {
            this.dialogFormVisible = true;
            this.isbj = true;
            this.form = this.tableData[index];
        },
        //   添加用户
        establish() {
            this.dialogFormVisible = true;
            this.isbj = false;
        },
        //   确认添加或修改
        confirm() {},
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
</style>
