import {get, getWithParam, post, postWithFormData} from "../ajax/axios"; 


export const getExample = (data) => get('/test', data)

export const postExample = (data) => post('/test', data)

// menu

export const getMenuList = (param) => postWithFormData('/menu/query', param)

export const menu_doAdd = (param) => getWithParam('/menu/doAdd', param)

export const menu_doUpdate = (param) => getWithParam('/menu/doUpdate', param)

export const menu_doDelete = (param) => getWithParam('/menu/doDelete', param)


// org

export const getOrgTree = (param) => post('/org/manage/query/tree', param)


// role

export const getRoleList = (param) => postWithFormData('/role/query', param)

export const deleteRole = (roleId) => post('', roleId)

