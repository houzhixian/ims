import { randomString } from "../../../util/commonUtil"


export default () => {

    let result = {
        code: 0,
        message: null,
        result: null
    }

    let data = []
    for (let x = 0; 10 > x; x++) {
        let pid = randomString(8);
        let d = {
            name: '组织名称',
            value: pid
        }
        data.push(d)
    }
    result['result'] = data
    return result
}
