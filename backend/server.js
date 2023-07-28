const path=require("path");
const express=require("express");
const app=express();
const cors=require('cors');
const mysql=require('mysql');
const multer=require("multer");

app.use(cors());

app.use(express.json());

// const upload=multer({dest:'uploads/'});

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
        return cb(null, "uploads");
    },
    filename: function(req, file, cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

app.post("/single", upload.single("image"), (req, res) => {
    if (req.file) {
        values=[
            req.file.path,
            req.body.name
        ]
        res.send(values);
    //   res.send("Single file uploaded successfully");
    } else {
      res.status(400).send("Please upload a valid image");
    }
});
app.post("/multiple_image", upload.array("images",5), (req, res) => {
    if (req.files) {
        res.send(req.files.path);
    //   res.send("Single file uploaded successfully");
    } else {
      res.status(400).send("Please upload a valid image");
    }
});

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
        // req.files.doc,
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
    const id=req.params.id;
    db.query(sql,[id],(err,data) => {
        if(err){
            return res.json('Error');
        }else{
            return res.json(data);
        }
    });
});

const port = process.env.PORT || 8081;

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
});
// app.listen(8081, () => {
//     console.log('run on port 8081');
// });