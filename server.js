const http = require('http');
const port = 9000;

const app=require('./app.js');

// const server = http.createServer(app);
app.listen(port, () => console.log('Example app listening on port 9000!'))
// server.listen(port);
// server.on('error', (e) => console.error(`Server Error :::: ${e.message}`));
// console.log(`Listening to Port ${port}`);
