var apis = require('./apis')
var express = require('express')
var cors = require('cors')
import {mockPort} from "../config/config"

// import {fs} from 'fs'

// let mockPort = 3001

let app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// app.get('/', function(req, res) {
//     res.send('hello world');
// });

app.use("/", apis)

app.listen(mockPort, () => {console.log("mock server started at " + mockPort)})