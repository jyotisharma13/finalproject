const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
/////////////////////
const db = require('./db');
const bcrypt = require('./bcrypt');
const csurf = require('csurf');
const s3 = require('./s3');
app.use(cookieSession({
    secret: `Token that the request came from my own site! :D`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
/////////////////////////////////
app.use(require('body-parser').json());
app.use(express.static('./public'));
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});
////////////////////////////
app.use(compression());
/////////////////////////////////
const multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const config= require('./config');

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
///////////////////////////////////
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


/////////////////////////////////////
//actually put the files in the uploadedfiles
//directory and changes name of the files
//to be some unique 24 charaqcter string
app.post('/profilePic/upload',uploader.single('uploadedFile'),s3.upload,(req, res)=>{
    console.log(" /profilePic/upload req.body", req.body);
    //req.file is object that describes the file we just uploaded
    console.log("/profilePic/upload req.file",req.file);
    // next steps: save filename, title, description, name in the image table
    //make new imge render automatically on screen(without reloading the image)
    // res.render('images', ());
    db.addImage(
        config.s3Url + req.file.filename, req.session.userId
    ).then(
        ({rows})=>{
            res.json({
                image:rows[0].img_url
            });
        }) .catch(err => {
        console.log('err in post upload:', err);
    });
});
/////////////////////////////////////////////////////
app.get('/welcome', (req, res) => {
    console.log("req.session / welcome",req.session);
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
////////////////////////////////////////////////////////
app.get('/user', (req, res)=>{
    console.log('user id in/ userho gazá',req.session.userId);
    return db.getUserInfo(req.session.userId).then(results=>{
        console.log("/user result:",results);
        res.json(results);
    }).catch(err => {
        console.log("error in /user: ", err);
    });
});
///////////////////////////////////////////////////////
app.post('/welcome/register', (req, res) => {
    console.log('welcome register id',req.session.id);
    bcrypt.hash(req.body.password).then(hashedPassword => {
        return db.registerUser(req.body.first, req.body.last, req.body.email, hashedPassword);
    }).then(({rows}) => {
        req.session.userId = rows[0].id;
        res.json({success: true});
    }).catch(function(err) {
        console.log("error in registration: ", err);
        res.json({success: false});
    });
});
/////////////////////////////////////////////////////
app.post('/welcome/login', (req, res)=>{
    console.log("email id",req.body.email);
    var userId;
    console.log('req.session /welcome/login', req.session);
    console.log("req.body.email",req.body.email);
    return db.getLoginInfo(req.body.email).then(loginInfo =>{
        if(loginInfo.rows[0].id){
            userId = loginInfo.rows[0].id;
            return bcrypt.compare(req.body.password,loginInfo.rows[0].password);

        } else {
            res.json({notregistered: true});
        }
    }).then(()=> {
        console.log('!!!!!loguserid',userId);
        req.session.userId = userId;
        res.json({success: true});
    }).catch(error =>{
        console.log("error in login page", error);
        res.json({success: false});
    });
});
///////////////////////////////////
// app.get("/search/:name", (req, res) => {
//     books.search(req.params.name, function(error, results, apiResponse) {
//         if ( ! error ) {
//             console.log("results in search index.js:", results);
//             console.log("apiResponse:", apiResponse);
//             res.json(results);
//         } else {
//             console.log(error);
//         }
//     });
// });
///////////////////////////////

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});
//////////////////////////
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
