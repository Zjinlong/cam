import request from '../../../utils/request';

/** 
 * 获取当前正在运行任务数
 * 次数参数data为固定值 
*/
const getBiaojiRecordCountByStatus = () => {
   
    return request({
        url: '/biaojiRecordCount/byStatus',
        method: 'get',

    });
};

const getBiaojiRecordCountbyCamera = () => {
   
    return request({
        url: '/biaojiRecordCount/overall/byCamera',
        method: 'get',

    });
};

const getBiaojiRecordCountOverallByStatus = query => {
    return request({
        url: '/biaojiRecordCount/overall/byStatus',
        method: 'get',
        data: query
    });
};

const putBiaojiRecordsId =( id,query) => {
    return request({
        url: '/biaojiRecords/'+id,
        method: 'put',
        data: query
    });
};



const getBiaojiRecordsUnhandledNewest100 =query => {
    return request({
        url: '/biaojiRecords/unhandled/newest100',
        method: 'get',
        params: query
    });
};



const getBiaojiRecordsUnhandledTotalCount =query => {
    return request({
        url: '/biaojiRecords/unhandled/totalCount',
        method: 'get',
        params: query
    }); 
};



export {
    getBiaojiRecordsUnhandledTotalCount,
    getBiaojiRecordsUnhandledNewest100,
    putBiaojiRecordsId, 
    getBiaojiRecordCountOverallByStatus,
    getBiaojiRecordCountByStatus,
    getBiaojiRecordCountbyCamera
}