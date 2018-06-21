const http = require("http");

const hostName = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/plain');
    res.end('Hellow World!\n');
    console.log(req);
});

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}`);
});