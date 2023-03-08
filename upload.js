const http = require("http");
const fs = require("fs");
const FormData = require("form-data");

const fileStream = fs.createReadStream("./package.json");
const form = new FormData();
form.append("file", fileStream);

const options = {
    method: "POST",
    host: "localhost",
    port: 3000,
    path: "/upload",
    headers: form.getHeaders(),
};

const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
        process.stdout.write(d);
    });
});

form.pipe(req);

req.on("error", (error) => {
    console.error(error);
});

req.end();
