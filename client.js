console.log('WebSocket client script will run here.');
const ws = new WebSocket('ws://localhost:7777', ['json', 'xml']);
var s = document.getElementById("fname").value;
console.log(s)
alert(ws)
ws.addEventListener('open', () => {
 // console.log(ws);
  const data = {message:s }
  
  const json = JSON.stringify(data);
  console.log(json)
  ws.send(json);
});
ws.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  console.log(data);
});


// console.log('WebSocket client script will run here.');
// const ws = new WebSocket('ws://echo.websocket.org');
// // Add a listener that will be triggered when the WebSocket is ready to use
// ws.addEventListener('open', () => {
//   const message = 'Hello!';
//   console.log('Sending:', message);
//   // Send the message to the WebSocket server
//   ws.send(message);
// });
// // Add a listener in order to process WebSocket messages received from the server
// ws.addEventListener('message', event => {
//   // The `event` object is a typical DOM event object, and the message data sent
//   // by the server is stored in the `data` property
//   console.log('Received:', event.data);
// });