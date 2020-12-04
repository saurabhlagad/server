const { request, response } = require('express')
const express=require('express')
const router=express.Router()
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const multer=require('multer')
const upload=multer({dest:'image/'})
const fs=require('fs')




router.get('/',(request,response)=>{
    const statement=`select bookedcar.*,cars.carName as carName,cars.plateNo as plateNo,cars.pricePerHour as pricePerHour,cars.image as image from bookedcar
                     inner join cars on bookedcar.carId=cars.id 
                     where userId=${request.userId} order by id desc`

                    //  select product.* ,category.title as categoryTitle,brand.title as brandTitle from product
                    //  inner join brand on product.brandid=brand.id inner join category on category.id=product.categoryid

    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})


router.get('/image/:filename',(request,response)=>{
    const {filename}=request.params

    console.log(`dirname:${__dirname} and filename:${filename}`)
    const path=`C:/Users/Vaishnavi/server/site/image/${filename}`
    console.log('*********************')
    console.log(`path:${path}`)
    console.log('*********************')
    const data=fs.readFileSync(path)
    response.send(data)
})

router.post('/',upload.single('image'),(request,response)=>{
    console.log(request.file)
    const drivingLicence=request.file.filename
    
    const {carId,toDate,toTime,fromDate,fromTime,destination}=request.body
   
    console.log(`image file:${drivingLicence} `)
    const statement=`insert into bookedcar(userId,carId,toDate,toTime,fromDate,fromTime,drivingLicence,destination) 
    values(${request.userId},${carId},'${toDate}','${toTime}','${fromDate}','${fromTime}','${drivingLicence}','${destination}')`

    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})


router.delete('/:id',(request,response)=>{
    const {id}=request.params
    const statement=`delete from bookedcar where id=${id}`
    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})

module.exports=router
