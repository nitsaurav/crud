const express=require("express");
const app=express();
const cors=require('cors');
const mysql=require('mysql');

app.use(cors());

app.use(express.json());

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_crud'
});
db.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('connection succsful')
    }
});

app.get('/',(req,res) => {
    res.json('hlo first')
});

app.get('/all_students', (req,res) => {
    const sql='select * from student';
    db.query(sql,(err,data) => {
        if(err){
            return res.json('Error');
        }else{
            return res.json(data)
        }
    });
});

app.post('/create',(req,res) => {
    const sql='insert into student(name,email)';
})


app.listen(8081, () => {
    console.log('hi');
});