module.exports.add_user = function (request, response, collection) {
    if (request.method === "POST") {
        let user = '';
        request.on('data', dt => {
            user = dt.toString();
        });
        request.on('end', () => {
            let json = JSON.parse(user);
            collection.insertOne(json).then();
            console.log(json)
            response.write(user);
            response.end();
        });
    } else {
        response.statusCode = 400;
        response.end();
    }
};

module.exports.delete_user = function (request, response, collection) {
    if (request.method === "POST") {
        let user = '';
        request.on('data', dt => {
            user = dt.toString();
        });
        request.on('end', () => {
            let json = JSON.parse(user)
            collection.deleteOne({user: json.user, friend: json.friend}).then();
            console.log(json)
            response.write(user);
            response.end();
        });
    } else {
        response.statusCode = 400;
        response.end();
    }
}

module.exports.get_users_from_list = function (request, response, collection) {
    let par = request.url.match(/id=(.+)/);
    if (par === null || par.index === -1) {
        response.statusCode = 400;
        response.end();
    } else {
        collection.find({user: par[1]})//.distinct("friend")
            .toArray((e, a) => {
            console.log(a);
            response.write(JSON.stringify(a));
            response.end();
        });
    }
};

module.exports.find_unique_user = function (request, response, collection) {
    if (request.method === "POST") {
        let user = '';
        request.on('data', dt => {
            user = dt.toString();
        });
        request.on('end', () => {
            let json = JSON.parse(user);
            collection.findOne({user: json.user, friend: json.friend}, function (e, a) {
                console.log(JSON.stringify(a));
                response.write(JSON.stringify(a));
                response.end();
            });
        });
    } else {
        response.statusCode = 400;
        response.end();
    }
};

module.exports.find_registr_user = function (request, response, collection) {
    if (request.method === "POST") {
        let user = '';
        request.on('data', dt => {
            user = dt.toString();
        });
        request.on('end', () => {
            let json = JSON.parse(user);
            collection.findOne({login: json.login}, function (e, a) {
                console.log(JSON.stringify(a));
                response.write(JSON.stringify(a));
                response.end();
            });
        });
    } else {
        response.statusCode = 400;
        response.end();
    }
};