import { randomString } from "../../../util/commonUtil"

export default (page_start, page_length) => {

    let result = {
        code: 0,
        iTotalDisplayRecords: (page_length == null ? 10 : page_length) * (page_start++),
        iTotalRecords: (page_length == null ? 10 : page_length) * (page_start++),
        message: null,
        result: null
    }

    let data = []
    for (let x = 0; page_length > x; x++) {
        let roleId = randomString(4);
        let d = {
            allIds: null,
            createTime: 1514736000000,
            orgId: 3,
            permissionIds: [319, 330, 1111631, 1111405],
            remark: "驱蚊器",
            roleId: roleId,
            roleName: "测试角色名称",
            roleType: null,
            status: 1,
            updateTime: 1514736000000,
            userIds: [3]
        }
        data.push(d)
    }
    result['data'] = data
    return result
}
