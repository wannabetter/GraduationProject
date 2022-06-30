let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')

// 连接数据库
let conn = mysql.createConnection(models.mysql)
conn.connect()

function timeTrans(time){                                                       //时间格式转换
    let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000)
    date = date.toJSON();
    date = date.substring(0, 10)
    return date
}

router.post('/Add',(req,res)=>{
    const sql_add=$sql.Order.Add;
    conn.query(sql_add,[req.body.Account,req.body.RoomID,req.body.Price,req.body.CheckIn,req.body.CheckOut,req.body.Place],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

router.post('/SelectAccount',(req,res)=>{
    const sql_login=$sql.Order.Select + " where Account='" + req.body.Account +"'";
    conn.query(sql_login,[req.body.Account],(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            for(let i=0;i<result.length;i++){
                result[i].CheckIn=timeTrans(result[i].CheckIn)
                result[i].CheckOut=timeTrans(result[i].CheckOut)
            }
            res.send(result)
        }
    })
})

router.post('/Delete',(req,res)=>{
    const sql_delete=$sql.Order.Delete;
    conn.query(sql_delete,[req.body.Account,req.body.RoomID,req.body.CheckIn,req.body.CheckOut],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1')
        }
    })
})

module.exports=router