let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')

let conn = mysql.createConnection(models.mysql)
conn.connect()


router.post('/Select',(req,res)=>{
    const sql_select=$sql.Room.Select;
    conn.query(sql_select,(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/SelectPlace',(req,res)=>{
    const sql_select=$sql.Room.Select+" where RoomPlace='" + req.body.RoomPlace +"'";
    conn.query(sql_select,[req.body.RoomPlace],(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/SelectPlaceAndTime',(req,res)=>{
    const sql_select=$sql.Room.Select+" where RoomPlace='" + req.body.RoomPlace +"'" + "and RoomCheckOut<'" + req.body.CheckIn+"'";
    conn.query(sql_select,[req.body.RoomPlace,req.body.CheckIn],(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/SelectTime',(req,res)=>{
    const sql_select=$sql.Room.Select+" where RoomCheckOut<'" + req.body.CheckIn +"'";
    conn.query(sql_select,[req.body.CheckIn],(error,result)=>{
        if(error){
            res.send('0');
        }
        else {
            res.send(result)
        }
    })
})

router.post('/ChangeTime',(req,res)=>{
    const sql_changeTime=$sql.Room.Change;
    conn.query(sql_changeTime,[req.body.CheckIn,req.body.CheckOut,req.body.RoomID],(error)=>{
        if(error){
            res.send('0');
        }else{
            res.send('1')
        }
    })
})



module.exports=router