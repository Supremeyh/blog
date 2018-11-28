
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response){
  console.log('request come from ', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')

    response.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Cache-Control': 'max-age=200, no-cache',
      // 'Last-Modified': '123',
      // 'Etag': '666',
      'Set-Cookie': ['name=sea; max-age=2', 'year=2018; HttpOnly']
    })
    response.end(html)
  } 

  // if (request.url === '/script.js') {
  //   const etag = request.headers['if-none-match']
  //   if(etag === '666'){
  //     response.writeHead(304, {
  //       'Content-Type': 'text/javascript',
  //       'Cache-Control': 'max-age=5, no-cache',
  //       'Last-Modified': '123',
  //       'Etag': '666'
  //     })
  //     response.end('')
  //   } else {
  //     response.writeHead(200, {
  //       'Content-Type': 'text/javascript',
  //       'Cache-Control': 'max-age=200, no-cache',
  //       'Last-Modified': '123',
  //       'Etag': '666',
  //       'Set-Cookie': ['name=sea; max-age=2', 'year=2018; HttpOnly']
  //     })
  //     response.end('console.log(script loaded)')
  //   }
  // }
  
}).listen(8888)


console.log('server running at port 8888')
