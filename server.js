var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12242543",
    password: "QSBz6WRnAb",
    database: "sql12242543"
});

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, POST");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Content-Type", "application/json");
    next();
});

app.get('/', async (req, res, next) => {
    let data = await getData();
    res.json(data)
    next()
})

app.post('/', async (req, res, next) => {
    await postData(req.body)
    res.json({ "status": true })
    next()
})

getData = () => {
    const data =  new Promise(( resolve, reject ) => {
        con.connect(function(err) {
            con.query("SELECT * FROM hw5", function (e, result) {
                if (e) 
                    reject(e);
                else
                    resolve(result);
            });
        });
    })
    .catch(() => {console.log("Promise fail"); return {};});
    return data;
}

postData = async newArticle => {
    con.connect(function(err) {
        var value = [[newArticle.title, newArticle.content]];
        var sql = "INSERT INTO hw5 (title, content) VALUES ?";
        con.query(sql, [value], function (e, result) {
            if (e) console.log("Query error!!");
        });
    });
}

server = app.listen(8000, () => {
    console.log('Server is running on port 8000');
})

