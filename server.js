const http = require('http');
const port = 3000;

const app=require('./serverlib.js');

const server = http.createServer(app);
server.listen(port);
server.on('error', (e) => console.error(`Server Error :::: ${e.message}`));
console.log(`Listening to Port ${port}`);
