const express=require('express')
const mysql=require('mysql2/promise');
const app=express();

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'oumussa@2292005',
    database:'coffee'
});

app.get('/products',async(req,res)=>{
    const [rows]=await pool.query('select * from products')

    res.json({
        result:true,
        msg:'get products succressfully',
        data:rows
    })
    
})

app.listen(3000,()=>{
    console.log('server run successfully!');
    
})