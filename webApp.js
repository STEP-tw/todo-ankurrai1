const qs=require('querystring');

const AddBehaviour = function(req, res) {
  res.redirect = redirect.bind(res);
  req.urlIsOneOf = urlIsOneOf.bind(req);
  req.fileExists = fileExists.bind(req);
  res.serve = serve.bind(res);
  res.resondWithError = resondWithError.bind(res);
};

const urlIsOneOf = function(urls) {
  return urls.includes(this.url);
};

const fileExists = function (fs) {
  return fs.existsSync('./public' + this.url);
};

const runProcessors = function(processors, req, res) {
  if (processors.length == 0) return;
  processors.forEach((process)=>{
    if (res.finished) return;
    process(req,res);
  })
};

const serve = function(content) {
  this.write(content);
  this.end();
};

const redirect = function(newLocation) {
  this.statusCode = 302;
  this.setHeader('location', newLocation);
  this.end();
};

const invoke = function(req, res) {
  let handler = this.handlers[req.method][req.url];
  if (!handler) return;
  handler(req, res);
};

const resondWithError = function() {
  this.statusCode = 404;
  this.write('File not found!');
  this.end();
}

const eventHandler = function(req, res) {
  req.cookies = qs.parse(req.headers.cookie||'',";");
  let content = "";
  req.on('data', data => content += data.toString());
  req.on('end', () => {
    console.log(req.body);
    req.body = qs.parse(content);
    content = "";
    runProcessors(this.preProcess,req,res);
    if(res.finished) return;
    invoke.call(this,req,res);
    if(res.finished) return;
    runProcessors(this.postProcess,req,res);
  });
};

let initialize = function() {
  this.handlers ={GET:{},POST:{}}
  this.preProcess = [];
  this.postProcess=[];
};

const get=function (url,handler) {
  this.handlers.GET[url] = handler;
};

const post=function (url,handler) {
  this.handlers.POST[url] = handler;
}

const preProcessUse = function(handler) {
  this.preProcess.push(handler);
};

const postProcessUse=function (handler) {
  this.postProcess.push(handler);
}

const requestHandler = function(req, res) {
  AddBehaviour(req,res);
  eventHandler.call(this, req, res);
};

exports.create = function() {
  let requestlistener = function(req, res) {
    requestHandler.call(requestlistener, req, res)
  };
  initialize.call(requestlistener);
  requestlistener.get = get;
  requestlistener.post = post;
  requestlistener.preProcessUse = preProcessUse;
  requestlistener.postProcessUse=postProcessUse;
  return requestlistener;
};
