import {randomString} from '../../../util/commonUtil'

export default (level) => {
    level = level == null || level < 0 ? level = 0 : level;
    let result = []

    for (let x = 0; 10 > x; x++) {
        let id = randomString(32)
        let text = id
        let type = "folder"
        if (level > 2) {
            type = "item"
        }
        let additionalParameters = {
            chidlren: [],
            id : id,
            itemSelected: false
        }

        let object = {
            additionalParameters: additionalParameters,
            id: id,
            text: text,
            type: type
        }
        result.push(object)
    }

    let resposne  = {
        code : 0, 
        message : "SUCCESS",
        result: result
    } 
    return resposne
}