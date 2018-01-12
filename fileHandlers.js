const fs = require('fs');
const  getContentType = require('./utils.js').getContentType;

const getHome=function (req,resp) {
  resp.redirect('index.html');
};

const serveRegularFile = function(req, resp) {
  let filePath = req.url;
  fs.readFile(`./public${filePath}`, (error, data) => {
    if (error) return resp.writeError();
    resp.setHeader('Content-Type', getContentType(filePath))
    resp.serve(data);
  });
};

exports.getHome=getHome;
exports.serveRegularFile=serveRegularFile;
