import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        role:'',//用户身份
        //模型管理
       dialogFormVisible: false,//新增状态
       dialogFormVisible2: false,//修改状态
       modelAlter:{}, //要修改的数据
       detailsForm:{},//保存映射名数据
       addDefectListStatus:false, //新增缺陷
       addDefectErrorListStatus:false ,//新增隐患
       editDefectListStatus:false, //修改状态
       label:'',//修改的类型 --缺陷--隐患
       deftEdit:{}, //需要修改的缺陷和隐患数据
       deftInfo:{},//缺陷隐患的删除信息
    //    rightdelVisible:false, //缺陷隐患删除弹出框的状态
       //基本信息
      leveOpt:[{name:'1100kV'},{name:'1000kV'},{name:'±800kV'},
                {name:'750kV'},{name:'±660kV'},{name:'500kV'},
                {name:'±400kV'},{name:'330kV'},
                {name:'220kV'},{name:'110kV'},{name:'66kV'},
               {name:'35kV'}], //电压等级
       AddVisible:false, //新增线路杆塔状态
       lineEditAddVisible:false, //线路编辑状态
       towerVisibleUpload:false, //导入信息的状态
       lineTableData:[],//线路信息列表
       editForm:{}, //修改线路的数据
       towerEditVisible:false,//杆塔编辑状态
       towEdit:{}, //修改杆塔的数据
       //用户管理
       userDialogVisible: false, //创建用户
       groupDialogVisible:false, //创建用户组
       //创建用户组
       orgForm: { gname: '', tags: '', childlimit: null, levellimit: null, porgid: null, porGname: '', },
       roleOptions:[],//用户权限身份
        //创建用户
      creatForm: { uname: "",  roleid: '',  gid: '',  password: '',  againpd: '', status: 'normal', label: "", },
       editGroupVsible:false, //修改用户
       editGroupForm:{} ,//修改的用户数据
        unit_data: [],//用户组表单
        porNums:null,
        delDialogVisible:false ,// 删除用户组的
        //删除用户组
        delForm:{ delGro:'',elLabel:"",},
        delGroup:false, //删除用户
        editDialogVisible:false, //用户编辑状态
        //编辑用户
        builtForm: { roleid: "", user$uname: '',role$rolename: '',pdstring: '', againpd: '',},
        uid:'' ,//编辑用户用的uid
        group_childnum:null //用户节点的人数
    },
    mutations:{
        // ModeAdd(state){
        //     state.dialogFormVisible=true
        // }
    },
    getters:{

    }
})
export default store