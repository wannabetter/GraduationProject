let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')

// 连接数据库
let conn = mysql.createConnection(models.mysql)
conn.connect()

router.post('/Login',(req,res)=>{
    const sql_login=$sql.Waiter.Select + " where Account='" + req.body.Account +"'" + "and PassWord='" + req.body.PassWord+"'";
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
    const sql_delete=$sql.Waiter.Delete+" where Account='" + req.body.Account +"'" + "and PassWord='" + req.body.PassWord+"'";
    conn.query(sql_delete,[req.body.Account,req.body.PassWord],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

router.post('/Select',(req,res)=>{
    const sql_select=$sql.Waiter.Select
    conn.query(sql_select,(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/SelectWaiter',(req,res)=>{
    const sql_select=$sql.Waiter.Select+" where Name like'" + req.body.Name +"%'";
    conn.query(sql_select,[req.body.Name],(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/Add',(req,res)=>{
    const sql_add=$sql.Waiter.Add;
    conn.query(sql_add,[req.body.Account,req.body.PassWord,req.body.Name,req.body.Sex,req.body.Phone],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

module.exports=router