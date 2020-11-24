import request from '../../utils/request';

/** 
 * 获取当前正在运行任务数
 * 次数参数data为固定值 
*/

const postSignin = (query) => {
   
    return request({
        url: '/signin',
        method: 'post',
        data:query
    });
};

const getUserlist = query => {
   
    return request({
        url: '/users/userlist/',
        method: 'get',
    });
};

const postUserlist =( id,query) => {
    return request({
        url: '/users/userlist/',
        method: 'post',
        data: query
    });
};

const getme = query => {
    return request({
        url: '/users/me',
        method: 'get',
        data: query,
    
    });
};

const putme = ( id,query) => {
    return request({
        url: '/users/me',
        method: 'put',
        data: query,
   
    });
};

export {
    postUserlist,
    getUserlist,
    postSignin,
    getme,
    putme
}