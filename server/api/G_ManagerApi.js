let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')

// 连接数据库
let conn = mysql.createConnection(models.mysql)
conn.connect()

router.post('/Login',(req,res)=>{
    const sql_login=$sql.G_Manager.Select + " where Account='" + req.body.Account +"'" + "and PassWord='" + req.body.PassWord+"'";
    conn.query(sql_login,[req.body.Account,req.body.PassWord],(error,result)=>{
        if(error){
            res.send('0');

        }
        if(result[0]===undefined){
            res.send('0');
        }
        else {
            res.send('1')
        }
    })
})

router.post('/Delete',(req,res)=>{
    const sql_delete=$sql.G_Manager.Delete+" where Account='" + req.body.Account +"'" + "and PassWord='" + req.body.PassWord+"'";
    conn.query(sql_delete,[req.body.Account,req.body.PassWord],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

module.exports=router


