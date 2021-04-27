const http = require('http');
const static = require('node-static');
const file = new static.Server('./');
const crypto = require('crypto');
process.env.GUID="611ccef9-8647-4981-b4f4-d1eb9928ac64";
function generateAcceptValue (acceptKey) {
  return crypto
  .createHash('sha1')
  .update(acceptKey + process.env.GUID, 'binary')
  .digest('base64');
}



const server = http.createServer((req, res) => {
    req.addListener('end', () => file.serve(req, res)).resume();
});
const port = 3333;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
server.on('upgrade', (req, socket) => {
    // Make sure that we only handle WebSocket upgrade requests
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }
    // More to come…
    console.log("request recieved");
   
   // Read the websocket key provided by the client: 
  const acceptKey = req.headers['sec-websocket-key']; 
  // Generate the response value to use in the response: 
  const hash = generateAcceptValue(acceptKey); 
  // Write the HTTP response into an array of response lines: 
  const responseHeaders = [ 'HTTP/1.1 101 Web Socket Protocol Handshake', 'Upgrade: WebSocket', 'Connection: Upgrade', `Sec-WebSocket-Accept: ${hash}` ]; 
  // Write the response back to the client socket, being sure to append two 
  // additional newlines so that the browser recognises the end of the response 
  // header and doesn't continue to wait for more header data: 
  socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
  
 
});
