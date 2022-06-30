let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')


let conn = mysql.createConnection(models.mysql)
conn.connect()

router.post('/Login',(req,res)=>{
    const sql_login=$sql.User.Select + " where Account='" + req.body.Account +"'" + "and PassWord='" + req.body.PassWord+"'";
    conn.query(sql_login,[req.body.Account,req.body.PassWord],(error,result)=>{
        if(error){
            res.send('0');
        }
        if(result[0]===undefined){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/SelectUser',(req,res)=>{
    const sql_login=$sql.User.Select + " where Name like'" + req.body.Name +"%'";
    conn.query(sql_login,[req.body.Name],(error,result)=>{
        if(error){
            res.send('0');
        }
        if(result[0]===undefined){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/Select',(req,res)=>{
    const sql_select=$sql.User.Select
    conn.query(sql_select,(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/Delete',(req,res)=>{
    const sql_delete=$sql.User.Delete+" where Account='" + req.body.Account +"'" + "and PassWord='" + req.body.PassWord+"'";
    conn.query(sql_delete,[req.body.Account,req.body.PassWord],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

router.post('/Add',(req,res)=>{
    const sql_add=$sql.User.Add;
    conn.query(sql_add,[req.body.Account,req.body.PassWord,req.body.Name,req.body.Sex,req.body.Phone,req.body.VIP],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

router.post('/Update',(req,res)=>{
    const sql_Update=$sql.User.Update;
    conn.query(sql_Update,[req.body.Account,req.body.PassWord],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send('1');
        }
    })
})

module.exports=router