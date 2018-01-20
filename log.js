const fs = require('fs');

const timeStamp = () => {
  let today = new Date();
  return `${today.toDateString()} ${today.toLocaleTimeString()}`;
};

const toString=(o)=>JSON.stringify(o,null,2);

const logAndStoreRequest = (req, res) => {
  console.log(`${req.method} ${req.url}`);
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toString(req.headers)}`,
    `COOKIES=> ${toString(req.cookies)}`,
    `BODY=> ${toString(req.body)}`, ''
  ].join('\n');
  fs.appendFile('./data/request.log', text, () => {});
};
exports.logAndStoreRequest=logAndStoreRequest;
