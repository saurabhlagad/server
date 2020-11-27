const { request, response } = require("express");

const express=require('express')
const router=express.Router()
const db=require('../../db')
//const utils=require('../utils')
const crypto=require('crypto-js')

//const mailer=require('../mailer')
const jwt=require('jsonwebtoken')
const config=require('../../config')

router.post('/login',(request,response)=>{
    const{email,password}=request.body
    const statement=`select id,firstname,lastname,phone from admin where email='${email}' and password='${crypto.SHA256(password)}'`
    const result={}
    db.connection.query(statement,(error,users)=>{
        if(error)
        {
            result.status='error'
            result.error=error
        }
        else{
            if(users.length==0)
            {
                result.status='error'
                result.error='Invalid user!!'
            }
            else{
                const user=users[0]
                console.log(user)
                // if(user.active==0)
                // {
                //     console.log('in condition')
                //     result.status='error'
                //     result.data='your account is not active,please activate your account'
                // }
                // else if(user.active==1)
                //{
                    const authToken=jwt.sign({id:user.id},config.secret)
                    result.status='success'
                    result.data={
                        firstname:user.firstname,
                        lastname:user.lastname,
                        phone:user.phone,
                        authToken:authToken
                    }
                //}
            }
        }
        response.send(result)
    })
})

// router.get('/profile/',(request,response)=>{
//     // const {id}=request.params
//     const token=request.headers['token']
//     const data=jwt.verify(token,config.secret)
//     // try{
//     const statement=`select id,name,email,phone,address from user where id='${data.id}'`
//     db.connection.query(statement,(error,data)=>{
//         response.send(utils.createResult(error,data))
//     })
//     // }catch(ex){
//     //     response.status(401)
//     //     response.send(utils.createResult('Invalid token'))
//     // }
// })

module.exports=router