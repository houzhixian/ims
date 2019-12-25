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
        let pwd = randomString(4);
        let d = {
            active: "1",
            adAccount: "yangzhanhong",
            createTime: "2017-10-10 10:00:00",
            createUserId: null,
            currentTime: "2019-10-10 10:00:00",
            ehrAccount: "3006020007",
            email: "xxx@gjzq.com.cn",
            id: null,
            loginTime: null,
            password: pwd,
            passwordUpdateTime: "2019-10-10 10:00:00",
            phone: "135111111111",
            remark: null,
            trueName: "xxx",
            uid: "1189655",
            updateTime: null,
            updateUserId: null,
            userId: "3",
            userName: "xxx"
        }
        data.push(d)
    }
    result['data'] = data
    return result
}
