import request from '../../../utils/request';

/** 
 * 获取当前正在运行任务数
 * 次数参数data为固定值 
*/
const getByCamera = () => {
   
    return request({
        url: '/alertRecordCount/overall/byCamera',
        method: 'get',

    });
};

const getTotalCount = () => {
   
    return request({
        url: '/alertRecords/unhandled/totalCount',
        method: 'get',

    });
};

const getOverallByStatus = query => {
    return request({
        url: '/alertRecordCount/overall/byStatus',
        method: 'get',
        data: query
    });
};

const getNewest100 = query => {
    return request({
        url: '/alertRecords/unhandled/newest100',
        method: 'get',
        data: query
    });
};

const putId =( id,query) => {
    return request({
        url: '/alertRecords/'+id,
        method: 'put',
        data: query
    });
};

const getByType =query => {

    return request({
        url: '/alertRecordCount/byType',
        method: 'get',
        params: query
    });
};

const getByStatus =query => {
    return request({
        url: '/alertRecordCount/byStatus',
        method: 'get',
        params: query
    });
};




export {
    getByCamera,
    getOverallByStatus,
    getByStatus,
    getNewest100,
    getByType,
    putId,
    getTotalCount

}