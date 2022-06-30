const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const app = express();

const G_ManagerApi = require('./api/G_ManagerApi');
const L_ManagerApi = require('./api/L_ManagerApi');
const Waiter = require('./api/WaiterApi');
const User = require('./api/UserApi');
const Room = require('./api/RoomApi');
const Order =require('./api/OrderApi');
const Mail=require('./api/MailApi');
const Face=require('./api/FaceApi');
const Goods=require('./api/GoodsApi')

app.use(cors())
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({extended: false,limit:'100mb'}));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use("/api/G_Manager", G_ManagerApi);
app.use("/api/L_Manager", L_ManagerApi);
app.use("/api/Waiter", Waiter);
app.use("/api/User", User);
app.use("/api/Room", Room);
app.use("/api/Order",Order);
app.use("/api/Mail",Mail);
app.use("/api/Face",Face);
app.use("/api/Goods",Goods)

// 监听端口
app.listen(3000,()=>{
    console.log('成功监听端口:3000');
});

