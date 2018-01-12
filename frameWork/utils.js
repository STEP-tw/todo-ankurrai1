const AddBehaviour = function(req, resp) {
  resp.redirect = redirect.bind(resp);
  req.urlIsOneOf = urlIsOneOf.bind(req);
  resp.serve = serve.bind(resp);
  resp.writeError = writeError.bind(resp);
};

there a problem with middleware function,I have to change and refactore it;
const middleware = function(req, resp, process) {
  debugger;
  if (resp.finished) return;
  console.log(resp.finished,process);
  process(req,resp);
};

const runProcessors = function(processors, req, resp) {
  if (processors.length==0) return;
  // middleware.bind(null,req,resp);
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

const writeError = function() {
  this.statusCode = 404;
  this.write('File not found!');
  this.end();
};


exports.invoke = invoke;
exports.runProcessors = runProcessors;
exports.AddBehaviour = AddBehaviour;
