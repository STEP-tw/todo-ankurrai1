const qs=require('querystring');

const AddBehaviour = function(req, resp) {
  resp.redirect = redirect.bind(resp);
  req.urlIsOneOf = urlIsOneOf.bind(req);
  resp.serve = serve.bind(resp);
  resp.respondWithError = respondWithError.bind(resp);
};

const urlIsOneOf = function(urls) {
  return urls.includes(this.url);
};

const runProcessors = function(processors, req, resp) {
  if (processors.length==0) return;
  processors.forEach((process)=>{
    if (resp.finished) return;
    process(req,resp);
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

const invoke = function(req, resp) {
  let handler = this.handlers[req.method][req.url];
  if (!handler) return;
  handler(req, resp);
};

const respondWithError = function() {
  this.statusCode = 404;
  this.write('File not found!');
  this.end();
}

const eventHandler = function(req, resp) {
  req.cookies = qs.parse(req.headers.cookie||'',";");
  console.log(req.cookies);
  let content = "";
  req.on('data', data => content += data.toString());
  req.on('end', () => {
    console.log(req.body);
    req.body = qs.parse(content);
    content = "";
    runProcessors(this.preProcess,req,resp);
    if(resp.finished) return;
    invoke.call(this,req,resp);
    if(resp.finished) return;
    runProcessors(this.postProcess,req,resp);
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

const requestHandler = function(req, resp) {
  AddBehaviour(req,resp);
  eventHandler.call(this, req, resp);
};

exports.create = function() {
  let requestlistener = function(req, resp) {
    requestHandler.call(requestlistener, req, resp)
  };
  initialize.call(requestlistener);
  requestlistener.get = get;
  requestlistener.post = post;
  requestlistener.preProcessUse = preProcessUse;
  requestlistener.postProcessUse=postProcessUse;
  return requestlistener;
};
