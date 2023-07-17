const path=require("path");
const express=require("express");
const app=express();
const cors=require('cors');
const mysql=require('mysql');
const multer=require("multer");

app.use(cors());

app.use(express.json());

const upload=multer({dest:'uploads/'});

app.use(express.urlencoded({extended: false}));

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
        console.log('connection succsful');
    }
});

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null, "/uploads");
    },
    filename: function(req, file, cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const uploads=multer({});

app.get('/',(req,res) => {
    res.json('hlo first');
});

app.get('/all_students', (req,res) => {
    const sql='select * from student';
    db.query(sql,(err,data) => {
        if(err){
            return res.json('Error');
        }else{
            return res.json(data);
        }
    });
});

app.post('/create', (req,res) => {
    const sql='insert into student (`name`,`email`) values(?)';
    const values=[
        req.body.name,
        req.body.email,
    ]
    db.query(sql,[values], (err,data) => {
        if(err){
            return res.json(err);
        }
        else{
            return res.json(data);
        }
    });
});

app.put('/update/:id', (req,res) => {
    const sql='update student set `name` = ?, `email` = ? where id = ?';
    const values=[
        req.body.name,
        req.body.email,
    ]
    const id=req.params.id;
    db.query(sql,[...values,id], (err,data) => {
        if(err){
            return res.json('error');
        }
        else{
            return res.json(data);
        }
    });
});

app.delete('/delete/:id', (req,res) => {
    const sql='delete from student where id = ?';
    const id=req.params.id;
    db.query(sql,[id], (err,data) => {
        if(err){
            return res.json('error');
        }
        else{
            return res.json(data);
        }
    });
});

app.get('/single_students/:id', (req,res) => {
    const sql='select * from student where id=?';
    const id=req.params.id
    db.query(sql,[id],(err,data) => {
        if(err){
            return res.json('Error');
        }else{
            return res.json(data)
        }
    });
});


app.listen(8081, () => {
    console.log('hi');
});