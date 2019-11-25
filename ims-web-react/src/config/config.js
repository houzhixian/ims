export const serverIp = "http://localhost";
// export const path = '/mock';
export const timeout = '15000'; // 接口超时限制(ms)
export const mockURL = 'http://localhost';
export const mockPort = 3001
export const baseURL = "http://localhost";


// 开发环境默认配置
let _serverIp = serverIp;
let _port = '1111';
let _baseURL = baseURL;

if (process.env.NODE_ENV === 'testing') { // 测试环境
    // _port = '1111';
    // _baseURL = `${_serverIp}:${_port}`;
    _baseURL = mockURL + ":" + mockPort
}
if (process.env.NODE_ENV === 'production') { // 发布环境
    _port = '1111';
    _serverIp = 'http://192.168.1.123';
    _baseURL = `${_serverIp}:${_port}`;
}
