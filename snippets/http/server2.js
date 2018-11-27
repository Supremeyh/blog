
const http = require('http')

http.createServer(function(request, response){
  console.log('request come from ', request.url)

  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    'Access-Control-Max-Age': '86400' // 该响应的有效时间为86400秒,在有效时间内，浏览器无须为同一请求再次发起预检请求。
  })

  response.end('123')
  
}).listen(8887)

console.log('server running at port 8887')
