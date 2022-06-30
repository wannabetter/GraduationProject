let express = require('express')
let router = express.Router()
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '491110198@qq.com',
        pass: 'pjsfpxjszrffbiej'
    }
});

let mailOptions = {
    from: '<491110198@qq.com>', //邮件来源
    to: "", //邮件发送到哪里，多个邮箱使用逗号隔开
    subject: '自助乐酒店 ✔', // 邮件主题
    text: "", // 存文本类型的邮件正文
};

router.post('/SendMail',(req)=>{
    mailOptions.to=req.body.To
    mailOptions.text=`尊敬的${req.body.Name}用户,您的酒店密钥为${req.body.RoomKey},酒店地点为${req.body.RoomPlace},入住时间为${req.body.RoomCheckIn},离开时间为${req.body.RoomCheckOut},欢迎您的入住！`
    transporter.sendMail(mailOptions,()=>{
    })
})

router.post('/SendMail2',(req)=>{
    mailOptions.to=req.body.To
    mailOptions.text=`尊敬的${req.body.Name}用户,酒店地点为${req.body.RoomPlace},入住时间${req.body.RoomCheckIn}到离开时间${req.body.RoomCheckOut}的房间已退房成功,押金房租已退还,请查收！`
    transporter.sendMail(mailOptions,()=>{})
})



module.exports=router