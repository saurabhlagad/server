
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
    const statement=`select bookedcar.*,cars.carName as carName,cars.plateNo as plateNo,cars.pricePerHour as pricePerHour,
                     cars.image as carImage,user.firstname as userFirstName,user.lastname as userLastName,user.phone as userPhone 
                     from bookedcar
                     inner join cars on bookedcar.carId=cars.id
                     inner join user on bookedcar.userId=user.id
                     where NOT isReturned=3 and NOT isReturned=1`

    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})

router.get('/search/:text',(request,response)=>{
    const {text}=request.params
    const statement=`select bookedcar.*,cars.carName as carName,cars.plateNo as plateNo,cars.pricePerHour as pricePerHour,
                    cars.image as carImage,user.firstname as userFirstName,user.lastname as userLastName,user.phone as userPhone 
                    from bookedcar
                    inner join cars on bookedcar.carId=cars.id
                    inner join user on bookedcar.userId=user.id
                    where cars.carName like '%${text}%' or user.firstName like '%${text}%' or user.lastName like '%${text}%'
                    `
                    db.connection.query(statement,(error,data)=>{
                        response.send(utils.createResult(error,data))
                    })               
})


router.post('/filter',(request,response)=>{
    const {returnStatus}=request.body
    let whereClause=''
    if(returnStatus==-1)
    {
        whereClause=''
    }
    else{
        whereClause=`where isReturned=${returnStatus}`
    }
    const statement=`select bookedcar.*,cars.carName as carName,cars.plateNo as plateNo,cars.pricePerHour as pricePerHour,
                     cars.image as carImage,user.firstname as userFirstName,user.lastname as userLastName,user.phone as userPhone 
                     from bookedcar
                     inner join cars on bookedcar.carId=cars.id
                     inner join user on bookedcar.userId=user.id
                     ${whereClause} order by id desc
                     `

    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})





router.get('/image/:filename',(request,response)=>{
    const {filename}=request.params

    console.log(`dirname:${__dirname} and filename:${filename}`)
    const path=`C:/Users/hp/Desktop/carRental/server/image/${filename}`
    console.log('*********************')
    console.log(`path:${path}`)
    console.log('*********************')
    const data=fs.readFileSync(path)
    response.send(data)
})


router.put('/deny/:id',(request,response)=>{
    const {id}=request.params
    const statement=`update bookedcar set isReturned=3 where id=${id}`
    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})

router.put('/confirm/:id',(request,response)=>{
    const {id}=request.params
    const statement=`update bookedcar set isReturned=0 where id=${id}`
    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})

router.put('/returned/:id',(request,response)=>{
    const {id}=request.params
    const statement=`update bookedcar set isReturned=1 where id=${id}`
    db.connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
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
