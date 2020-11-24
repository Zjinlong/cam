import request from '../../../utils/request';

/** 
摄像头
*/
const getCamera = () => {
   
    return request({
        url: '/admin/camera/list',
        method: 'get',

    });
};

const delCamera = query => {
   
    return request({
        url: '/admin/camera/'+query,
        method: 'delete',
    });
};

const putCamera =( id,query) => {
    return request({
        url: '/admin/camera/'+id,
        method: 'put',
        data: query
    });
};

const postCamera = query => {
    return request({
        url: '/admin/camera/',
        method: 'post',
        data: query
    });
};

/** 
模型
*/

const getModelservice = () => {
   
    return request({
        url: '/admin/modelservice/list',
        method: 'get',

    });
};

const delModelservice = query => {
   
    return request({
        url: '/admin/modelservice/'+query,
        method: 'delete',
    });
};

const putModelservice =( id,query) => {
    return request({
        url: '/admin/modelservice/'+id,
        method: 'put',
        data: query
    });
};

const postModelservice = query => {
    return request({
        url: '/admin/modelservice/',
        method: 'post',
        data: query
    });
};

/** 
摄像头模型关联
*/

const getCameramodelconfig = () => {
   
    return request({
        url: '/admin/cameramodelconfig/list',
        method: 'get',

    });
};

const delCameramodelconfig = query => {
   
    return request({
        url: '/admin/cameramodelconfig/'+query,
        method: 'delete',
    });
};

const putCameramodelconfig =( id,query) => {
    return request({
        url: '/admin/cameramodelconfig/'+id,
        method: 'put',
        data: query
    });
};

const postCameramodelconfig = query => {
    return request({
        url: '/admin/cameramodelconfig/',
        method: 'post',
        data: query
    });
};


export {
    getCamera,
    delCamera,
    putCamera,
    postCamera,
    getModelservice,
    postModelservice,
    putModelservice,
    delModelservice,
    getCameramodelconfig,
    postCameramodelconfig,
    putCameramodelconfig,
    delCameramodelconfig,
}