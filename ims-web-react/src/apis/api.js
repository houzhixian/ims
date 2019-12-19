import {get, getWithParam, post, postWithFormData} from "../ajax/axios"; 


export const getExample = (data) => get('/test', data)

export const postExample = (data) => post('/test', data)

export const getMenuList = (param) => postWithFormData('/menu/query', param)

export const menu_doAdd = (param) => getWithParam('/menu/doAdd', param)

export const menu_doUpdate = (param, c_success, c_error) => getWithParam('/menu/doUpdate', param, c_success, c_error)

export const menu_doDelete = (param, c_success, c_error) => getWithParam('/menu/doDelete', param, c_success, c_error)