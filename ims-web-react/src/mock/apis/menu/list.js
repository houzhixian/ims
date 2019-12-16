export default (page_start, page_length) => {

    let result = {
        code: 0,
        iTotalDisplayRecords: (page_length == null ? 10 : page_length) * (page_start + 1),
        iTotalRecords: (page_length == null ? 10 : page_length) * (page_start + 1),
        message: null,
        result: null
    }

    let data = []
    for (let x = 0; page_length > x; x++) {
        let d = {
            menuId: page_start + x,
            menuName: page_start + x,
            menuStyle: " ",
            menuType: Math.random() * 100 + 1,
            permissionId: page_start + x,
            remark: "",
            status: 1,
            systemId: 2,
            url: "https://www.asbuadis.com#sadsakoda?sajd=qwmfk&sjda=dsanfjsakod&jdsiafjiasj=12kejidwejidjaifnasdnbfj"
        }
        data.push(d)
    }
    result['data'] = data
    return result
}
