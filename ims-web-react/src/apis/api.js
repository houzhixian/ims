import {get, post} from "../ajax/axios";


export const getExample = (data) => get('/test', data)

export const postExample = (data) => post('/test', data)

export const getMenuList = (param) => post('/menu/query', param)