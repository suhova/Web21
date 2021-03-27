const mongo = require("mongodb");
const nm = require("./new_message");
const select = require("./get_login");
const lists = require("./lists");
const client = new mongo.MongoClient("mongodb://localhost:27017", {useUnifiedTopology: true});

const collMess = "messages";
const collFriends = "friends";
const collBlack = "blacklist";
const collLogins = "logins";

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/"));
let db;
client.connect((e, client) => {
    if(e) {
        console.log(e);
        return;
    }
    db = client.db("admin");
    app.listen(8080, function (){
        console.log("Start Server");
    });
});

app.use("/mess", function (request, response) {
    console.log("Get messages by recipient");
    let par = request.url.match(/id=(.+)/);
    if (par === null || par.index === -1) {
        response.statusCode = 400;
        response.end();
    } else {
        db.collection(collMess).find({recipient: par[1]})
            .sort({timestamp: -1})
            .toArray((e, a) => {
            console.log(a);
            response.write(JSON.stringify(a));
            response.end();
        });
    }
});

app.use("/write", function (request, response) {
    console.log("Get sended messages");
    last.sanded(request, response, db.collection(collMess));
});

app.post("/new", function (request, response) {
    console.log("Create new message");
    nm.new_message(request, response, db.collection(collMess));
});

app.post("/addblack", function (request, response) {
    console.log("Add in black list");
    lists.add_user(request, response, db.collection(collBlack));
});

app.post("/addfriend", function (request, response) {
    console.log("Add in friends");
    lists.add_user(request, response, db.collection(collFriends));
});

app.post("/delblack", function (request, response) {
    console.log("Delete from black list");
    lists.delete_user(request, response, db.collection(collBlack));
});

app.post("/delfriend", function (request, response) {
    console.log("Delete from friends");
    lists.delete_user(request, response, db.collection(collFriends));
});

app.use("/getblack", function (request, response) {
    console.log("Get users from black list");
    lists.get_users_from_list(request, response, db.collection(collBlack));
});

app.use("/getfriend", function (request, response) {
    console.log("Get users from friends");
    lists.get_users_from_list(request, response, db.collection(collFriends));
});

app.post("/newuser", function (request, response) {
    console.log("Create new user");
    lists.add_user(request, response, db.collection(collLogins));
});

app.post("/getPass", function (request, response) {
    console.log("Get login and password");
    select.get_login(request, response, db.collection(collLogins));
});

app.use("/sanded", function (request, response) {
    console.log("Get sanded messages");
    console.log(request.body);
    select.sanded(request, response, db.collection(collMess));
});

app.post("/findUniqueFriends", function (request, response) {
    console.log("Find unique friend");
    lists.find_unique_user(request, response, db.collection(collFriends));
});

app.post("/findUniqueBlacklist", function (request, response) {
    console.log("Find unique user in black list");
    lists.find_unique_user(request, response, db.collection(collBlack));
});

app.post("/blacklistCheck", function (request, response) {
    console.log("Blacklist check");
    lists.find_unique_user(request, response, db.collection(collBlack));
});

app.post("/registrCheck", function (request, response) {
    console.log("Registration check");
    lists.find_registr_user(request, response, db.collection(collLogins));
});