const mysql=require('mysql2')
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'abhith@1234',
    database:'car_rental',
    connectionLimit:20,
    waitForConnections:true,
    queueLimit:0
})

module.exports={
    connection:pool
}