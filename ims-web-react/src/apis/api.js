import {get, getWithParam, post, postWithFormData} from "../ajax/axios"; 

// test demo

export const getExample = (data) => get('/test', data)

export const postExample = (data) => post('/test', data)


// menu

// 菜单列表
export const getMenuList = (param) => postWithFormData('/menu/query', param)

// 新增菜单
export const menu_doAdd = (param) => getWithParam('/menu/doAdd', param)

// 更新菜单
export const menu_doUpdate = (param) => getWithParam('/menu/doUpdate', param)

// 删除菜单
export const menu_doDelete = (param) => getWithParam('/menu/doDelete', param)


// org

// 组织树获取
export const getOrgTree = (param) => postWithFormData('/org/manage/query/tree', param)


// role

// 角色列表
export const getRoleList = (param) => postWithFormData('/role/query', param)

// 删除角色
export const deleteRole = (roleId) => post('', roleId)

// 权限明细列表
export const permissionList = (param) => postWithFormData('/role/permission/query', param)

// 用户明细列表
export const userList = (param) => postWithFormData('/role/user/query', param)

// 组织明细
export const orgInfo = (param) => getWithParam('/role/org/info', param)

// 组织列表（供选择）
export const orgSelectList = () => get('/role/org/info/select')

// 新建组织
export const createOrg = (param) => postWithFormData('/org/manage/create', param)
