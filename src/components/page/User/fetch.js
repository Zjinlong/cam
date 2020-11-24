import request from '../../../utils/request';

/** 
摄像头
*/
const getuserlist = () => {
   
    return request({
        url: '/users/userlist/',
        method: 'get',
   
    });
};

const getusers = name => {
   
    return request({
        url: '/users/'+name,
        method: 'get',

    });
};

const delusers = query => {
   
    return request({
        url: '/users/'+query,
        method: 'delete',
  
    });
};

const putusers =( id,query) => {
    return request({
        url: '/users/'+id,
        method: 'put',
        data: query,

    });
};

const postuserlist = query => {
    return request({
     
        url: '/users/userlist/',
        method: 'post',
        data: query
    });
};

const renderTime = (date) => {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
  }

export {
    getuserlist,
    postuserlist,
    delusers,
    putusers,
    getusers
}