const logAndStoreRequest = require('./log.js').logAndStoreRequest;
const create= require('./webApp.js').create;
const handlersLib=require('./handlers/requestHandlers.js');
const app = create();

app.preProcessUse(logAndStoreRequest);
app.preProcessUse(handlersLib.handleTresspassing);
app.get("/",handlersLib.serveLanding);
app.get("/login",handlersLib.serveLanding);
app.get("/home",handlersLib.serveHomePage);
app.get("/logout",handlersLib.logoutUser);
app.get('/userTodos',handlersLib.getTodoList);
app.get('/createNewTodo',handlersLib.handleNewTodo);
app.post('/editTodo',handlersLib.editTodo);
app.post('/login',handlersLib.handleLogin);
app.post('/addTodo',handlersLib.addTodo);
app.postProcessUse(handlersLib.serveRegularFile);

module.exports=app;
