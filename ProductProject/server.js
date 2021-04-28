const express = require('express');
const mongo = require("mongoose");
const server = express();
const product = require('./routes/product.routes');
const user = require('./routes/user.routes');
const bodyParser = require('body-parser');
const authentication = require("./middleware/authentication");
const authorization = require("./middleware/authorization");
/*
server.get('/', function (req, res, next) {
    res.status(200).json({ msg: "welcome to our web site" });
});
server.get('/getProducts', function (req, res, next) {
    res.status(200).json(
        [
            { id: 1, name: "productA", category: "categoryA", description: "description", price: 50 },
            { id: 1, name: "productB", category: "categoryB", description: "description", price: 90 },
            { id: 1, name: "productC", category: "categoryC", description: "description", price: 900 }
        ]
    );

});*/
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,Content-Type,Accept,authorization,username,password, x-auth-token"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    //console.log(req.url);
    if (!(req.url == "/users/login" || (req.url == "/users/user" && (req.method == "POST" || req.method == "OPTIONS")))) {
        //console.log(req.headers["X-Auth-Token"]);
        if (req.headers["x-auth-token"] != undefined) {
            authentication.checkToken(req.headers["x-auth-token"]).then(result => {
                //  console.log(result.username);
                // console.log(req.method);
                // console.log(req.url);
                authorization.authorized(result.username, req.method, req.url, req, res, next);
            }).catch(error => {
                res.status(200).json({ success: false, msg: "Invalid Authentication" });
                return;


            });

        } else {
            res.status(200).json({ success: false, msg: "Authentication Failed Please Send Your Api Token" })
            return;

        }
    } else {
        next();
    }
    //next();
});
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
mongo
    .connect("mongodb://localhost:27017/ecommerce")
    .then(function () { console.log("Mongodb Is Created") })
    .catch(function () { console.log("can not connect to Mongodb ") });

server.use("/products", product);
server.use("/users", user);


server.listen(3007, "127.0.0.1", function () {
    console.log("server is running on http://localhost:3007");
});