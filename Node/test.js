const http =  require('http');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res)=> {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Work hard');
});

server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
})