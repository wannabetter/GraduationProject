let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')

let conn = mysql.createConnection(models.mysql)
conn.connect()

router.post('/Select',(req,res)=>{
    const sql_select=$sql.Goods.Select
    conn.query(sql_select,(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/SelectRoomID',(req,res)=>{
    const sql_select=$sql.Goods.Select+" where RoomID like'" + req.body.RoomID +"%'";
    conn.query(sql_select,[req.body.Name],(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/DeleteRoomID',(req,res)=>{
    const sql_select=$sql.Goods.Delete;
    conn.query(sql_select,[req.body.RoomID],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send("1")
        }
    })
})

router.post('/UpdateRoomID',(req,res)=>{
    const sql_select=$sql.Goods.Update;
    conn.query(sql_select,[req.body.RoomID],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send("1")
        }
    })
})

router.post('/UpdateGoods',(req,res)=>{
    const sql_select=$sql.Goods.UpdateGoods;
    conn.query(sql_select,[req.body.Water,req.body.ToothBrush,req.body.Towel,req.body.Shampoo,req.body.ShowerGel,req.body.RoomID],(error)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send("1")
        }
    })
})


module.exports=router