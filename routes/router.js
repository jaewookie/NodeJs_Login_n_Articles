var express = require('express')
var route = express.Router()
var mysql = require('mysql')

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'myflaskapp'
})

route.get(['/Data', '/Data/:id'], (req,res)=>{

    var sql = 'SELECT * FROM articles';
    db.query(sql, (err, datas)=>{
        var id = req.params.id
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?'
            db.query(sql, [id], (err, data)=>{
                if(!err){
                    res.render('view', {articles: datas, article:data[0]})
                }else{
                    console.log(err);
                    res.status(500).send("Internal Server Error")
                }
            })
        }else{
            res.render('home', {articles:datas, article:undefined})
        }
    })

})

route.get('/login', (req, res)=>{
    res.render('login')
})

route.post('/login',(req, res)=>{
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'SELECT * FROM users WHERE username=?'

    if(username && password) {
        db.query(sql,[username] ,(err, datas)=>{
            if (datas) {
                if(password == datas[0].password) {
                    console.log('Success')
                    res.redirect('/Data')
                }
                else {
                    console.log('Failed')
                    res.redirect('/login')
                }
            }
            else {
                res.send("UserInfo is not")
            }
        
        })
    }
    else {
        res.send("Please write in Username and Password!!!")
    }
})

//     if (username && password) {
//         var sql = 'SELECT * FROM users WHERE username=?'
//         db.query(sql, [username], (err, result)=>{
//             if(!err){
//                 if(username==result[0].username && password==result[0].password){
//                     console.log('Success')
//                     res.send("Welcom!")

//                 }else{
//                     console.log('Failed')
//                     res.redirect('/login')
//                 }
//             }
//         })
//     }else{
//         res.send("Password or Username is empty!")
//     }
// })


module.exports=route