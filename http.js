var PORT = 3300; //接口

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');     //路径

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log(pathname)
    var realPath = path.join("webapp", pathname); //这里设置自己的文件名称，path.join()将多个路径结合在一起;
    var ext = path.extname(realPath);   //获取路径中的扩展名，如果没有'.'，则返回空
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            // var errPath = path.join("webapp/error/index.html", pathname);
            // fs.readFile(errPath,function (file) {
            //     response.write(file);
            //     response.end();
            // });
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.write("This request URL 500 on this server.");
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file);
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");