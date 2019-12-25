import { randomString } from "../../../util/commonUtil"

export default () => {

    let result = {
        code: 0,
        iTotalDisplayRecords: 1,
        iTotalRecords: 1,
        message: null,
        result: null
    }

    let data = [
        {
            pid: "1",
            name: "组织名称",
            remark: "备注",
            createTime: "创建时间"
        }
    ]
    
    result['data'] = data
    return result
}
