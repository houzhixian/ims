var apis = require('./apis')
var express = require('express')
// import {mockPort} from "../config/config"
// import {cors} from 'cors'
// import {fs} from 'fs'

let port = 3001

let app = express();
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));


app.get('/', function(req, res) {
    res.send('hello world');
});

app.use("/mock/", apis)

app.listen(port, () => {console.log("mock server started at " + port)})