const mysql=require('mysql2')
const pool=mysql.createPool({
    host:'localhost',
    port:3309,
    user:'root',
    password:'@Aniket270320',
    database:'car_rental_sy',
    connectionLimit:20,
    waitForConnections:true,
    queueLimit:0
})

module.exports={
    connection:pool
}