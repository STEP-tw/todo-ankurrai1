const fs = require('fs');
const getContentType = function(filePath) {
  let fileExt = filePath.split(".").slice(-1)[0];
  let headers = {
    "pdf": "application/pdf",
    "js": "text/js",
    "html": "text/html",
    "css": "text/css",
    "jpg": "image/jpg",
    "gif": "image/gif"
  };
  return headers[fileExt];
};

const timeStamp = () => {
  let today = new Date();
  return `${today.toDateString()} ${today.toLocaleTimeString()}`;
}

let logAndStoreRequest = (req, res) => {
  console.log(`${req.method} ${req.url}`);
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toString(req.headers)}`,
    `COOKIES=> ${toString(req.cookies)}`,
    `BODY=> ${toString(req.body)}`, ''
  ].join('\n');
  fs.appendFile('./data/request.log', text, () => {});
}

exports.logAndStoreRequest=logAndStoreRequest
exports.getContentType = getContentType;
