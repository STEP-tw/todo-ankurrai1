const logAndStoreRequest = require('./log.js').logAndStoreRequest;

const create= require('./webApp.js').create;

const handlersLib=require('./fileHandlers.js');

const app = create();

app.preProcessUse(logAndStoreRequest);
app.preProcessUse(handlersLib.setTitle);

app.get("/",handlersLib.serveLanding);
app.get("/login",handlersLib.serveLanding);
app.get("/home",handlersLib.serveHomePage);
app.get("/logout",handlersLib.logoutUser);

app.get('/userTodos',handlersLib.respondWithTodos)
app.get('/userTodo',handlersLib.respondWithTodo)
app.get('/todoToEdit',handlersLib.respondEditPage);

app.get('/newTodo',handlersLib.handleNewTodo);

app.post('/login',handlersLib.handleLogin);
app.post('/saveTodo',handlersLib.storeNewTodo);

app.postProcessUse(handlersLib.serveRegularFile);

module.exports=app;
