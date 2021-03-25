module.exports.new_message = function (request, response, collection) {
    if (request.method === "POST") {
        let message = '';
        request.on('data', dt => {
            message = dt.toString();
        });
        request.on('end', () => {
            let json = JSON.parse(message)
            json.timestamp = Math.round(new Date().getTime()/1000);
            collection.insertOne(json).then();
            console.log(json)
            response.write(JSON.stringify(json));
            response.end();
        });
    } else {
        response.statusCode = 400;
        response.end();
    }
};