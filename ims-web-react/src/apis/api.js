import {get, getWithParam, post} from "../ajax/axios"; 


export const getExample = (data) => get('/test', data)

export const postExample = (data) => post('/test', data)

export const getMenuList = (param) => post('/menu/query', param)

export const menu_doAdd = (param, c_success, c_error) => getWithParam('/menu/doAdd', param, c_success, c_error)

export const menu_doUpdate = (param, c_success, c_error) => getWithParam('/menu/doUpdate', param, c_success, c_error)