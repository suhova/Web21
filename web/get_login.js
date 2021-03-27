module.exports.get_login = function (request, response, collection) {
    if (request.method === "POST") {
        let user = '';
        request.on('data', dt => {
            user = dt.toString();
        });
        request.on('end', () => {
            let json = JSON.parse(user);
            collection.findOne({login: json.login, password: json.password}, function (e, a) {
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

module.exports.sanded = function (request, response, collection) {
    let par = request.url.match(/id=(.+)/);
    if (par === null || par.index === -1) {
        response.statusCode = 400;
        response.end();
    } else {
        collection.find({sender: par[1]})
            .sort({timestamp: -1})
            .toArray((e, a) => {
            console.log(a);
            response.write(JSON.stringify(a));
            response.end();
        });
    }
};