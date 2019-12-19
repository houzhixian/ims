'use strict';

import list from './menu/list'
import add from './menu/add'
import update from './menu/update'
import remove from './menu/remove'

var express = require('express');
var Mock = require('mockjs');
const multer = require('multer');
const upload = multer();

const apiRoutes = express.Router();

let random = Math.random() * 500 + 500;
apiRoutes.get('/', function(req, res) {
    setTimeout(() => {
        res.json({
            status: 1,
            msg: '查询成功',
            data: {
                name: '张三'
            }
        });
    }, random);
});
apiRoutes.get('/idList', function(req, res) {
    setTimeout(() => {
        res.json({
            status: 1,
            msg: 'OK',
            data: Mock.mock({
                'list|1-10': [{
                    'id|+1': 1
                }]
            })
        });
    }, random);
});

apiRoutes.post('/menu/query', upload.none(), function (req, res) {
    setTimeout(() => {
        // console.log(req.body)
        res.json(list(req.body.start, req.body.length))
    })
})


apiRoutes.get('/menu/doAdd', (req, res) => {
    setTimeout(() => {
        res.json(add())
    }, 200)
})

apiRoutes.get('/menu/doUpdate', (req, res) => {
    setTimeout(() => {
        res.json(update())
    }, 200)
})

apiRoutes.get('/menu/doDelete', (req, res) => {
    setTimeout(() => {
        res.json(remove())
    }, 200)
})

module.exports = apiRoutes;