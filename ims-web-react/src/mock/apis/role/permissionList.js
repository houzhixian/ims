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
            createTime: 1514736000000,
            opUserId: 1,
            permission: "RW",
            permissionId: 300,
            permissionName: "客户信息-开发",
            permissionType: 1,
            status: 1,
            systemId: 10
        }
        data.push(d)
    }
    result['data'] = data
    return result
}
