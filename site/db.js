const mysql=require('mysql2')
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Vaishnavi@2020',
    database:'car_rental_system',
    connectionLimit:20,
    waitForConnections:true,
    queueLimit:0
})

module.exports={
    connection:pool
}