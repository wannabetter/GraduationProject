let express = require('express')
let router = express.Router()
let axios = require('axios');
let qs = require('querystring');

router.post('/getToken',function(req,res){
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'ASeb11u5QMVway1u5FfDrpL4',
        'client_secret': 'KoQh6EvgIawj2DCvWqF3YiXx5EEfd8pO'
    });
    axios.post('https://aip.baidubce.com/oauth/2.0/token', param).then((msg) => {
        res.send(msg.data)
    })
})

router.post('/initFace',function(req,res){
    let url = 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + req.body.access_token
    let data = {
        image_type: 'BASE64',
        image: req.body.Img_base64,
        group_id: 'A123',
        user_id: req.body.user_id ,
    }
    axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: url,
        data: qs.stringify(data),
    }).then((msg)=>{
        console.log(msg.data)
        res.send(msg.data)
    })
})

router.post('/checkFace',function(req,res){
    let url = 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + req.body.access_token
    let data = {
        image_type: 'BASE64',
        image: req.body.Img_base64,
        group_id_list: 'A123',
    }
    axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: url,
        data: qs.stringify(data),
    }).then((msg)=>{
        res.send(msg.data)
    })
})

module.exports=router