<template>
<div class="position: relative;">

<div class="user-box" >
  <p class="bjds">表计读数(未处理 <span style="color:red;fontSize:22px">{{bjval}}</span>)</p>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%;">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="80">
    </el-table-column>
       <el-table-column
      prop="camName"
      label="摄像头名称"
      >
      
    </el-table-column>
    <el-table-column
      prop="biaojiImgUrl"
      label="表计图片"
      >
           <template slot-scope="scope">
          <el-image style="width: 100px; height: 50px" :src="scope.row.biaojiImgUrl" :preview-src-list="[scope.row.biaojiImgUrl]" :lazy='true'>
          </el-image>
        </template>
    </el-table-column>
    <el-table-column
      prop="value"
      label="表计读数"
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
          @click.native.prevent="putRow(scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
 
      </template>
    </el-table-column>
  </el-table>

   <div class="pop-up" v-if="ispop">
        <Masks :dispose='dispose' @cancel='cancel' @affirm='affirm'/>
    </div>
</div>
    <Footer :top="''"/>

</div>

</template>

<script>
import Masks from '../Home/masks.vue';
import Footer from '@/components/common/footer.vue';
import {
    getBiaojiRecordsUnhandledTotalCount,
    getBiaojiRecordsUnhandledNewest100,
    putBiaojiRecordsId,
    getBiaojiRecordCountOverallByStatus,
    getBiaojiRecordCountByStatus,
    getBiaojiRecordCountbyCamera
} from './fetch.js';

export default {
    components: { Masks, Footer },
    data() {
        return {
            currentPage: 5,
            ispop: false,
            isbj: false,
            dialogFormVisible: false,
            formLabelWidth: '100px',
            dispose: '',
            bjval: 0,
            timer: '',
            form: {
                name: '',
                password: '',
                group: ''
            },
            formInline: {
                user: '',
                region: ''
            },

            tableData: [
                // {
                //     timeStamp: '2016-05-03',
                //     id: '111',
                //     camName: 'user',
                //     memo: 'A组',
                //     value: '123456',
                //     biaojiImgUrl: 'https://www.lwavn.club/picture/cover/2f6473a4bb7b40cb97da72d4519f72fa?v=1594625769776'
                // },
            ]
        };
    },
    created() {
        let _this = this;
        _this.getnews();
  
        _this.timer = setInterval(function() {
            _this.getnews();
        }, 10000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        async getnews() {
            let res = await getBiaojiRecordsUnhandledNewest100();
            let bjval = await getBiaojiRecordsUnhandledTotalCount();
            this.bjval = bjval;
            this.tableData = res;
        },

        //   删除用户
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //   编辑用户
        putRow(rows) {
            this.dispose = rows;
            this.ispop = true;
        },
        cancel() {
            this.ispop = false;
            // this.$message({
            //               message: '取消编辑',
            //               type: 'success'
            //           });
        },
        async affirm(data) {
            let res = await putBiaojiRecordsId(data.id, data);

            this.$message({
                message: '编辑成功',
                type: 'success'
            });

            this.ispop = false;
        },

        //   添加用户
        establish() {
            this.form = {};

            this.isbj = false;
        },
        //   确认添加或修改
        confirm() {
            if (this.isbj) {
                this.dialogFormVisible = false;
            } else {
                this.dialogFormVisible = false;
            }
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
    padding: 30px 40px;
    min-height: 1000px;
    margin-bottom: 40px;
    z-index: 9;
}
.demo-form-inline {
    float: right;
}
.block {
    width: 500px;
    margin: 50px auto;
}
.bjds {
    /* float: right; */
    height: 50px;
    line-height: 30px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    color: #409eff;
}
</style>
