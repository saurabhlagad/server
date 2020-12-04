const { request } = require("express");
const mailer=require('nodemailer')

function sendEmail(email,subject,body,callback){
const transport=mailer.createTransport({
    service:'gmail',
    auth:{
        user:'trythombareabhi@gmail.com',
        pass:'tryabhith@1234'
    }
})

transport.sendMail({
    from:'noreply@myevernote.com',
    to:email,
    subject:subject,
    html:body

},callback)
}
module.exports={
    sendEmail:sendEmail
}