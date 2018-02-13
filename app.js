const express = require("express");
const app = express();
const handlersLib = require("./handlers/requestHandlers.js");
const cookieParser = require("cookie-parser");
const log = require("./logger.js").log;


app.use(log());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(handlersLib.handleTresspassing);

app.get("/", handlersLib.serveLanding);
app.get("/login", handlersLib.serveLanding);
app.post("/login", handlersLib.handleLogin);
app.get("/home",handlersLib.serveHomePage);
app.get("/userTodos",handlersLib.getTodoList);
app.get("/createNewTodo",handlersLib.handleNewTodo);
app.post("/addTodo",handlersLib.addTodo);
app.post("/editTodo",handlersLib.editTodo);
app.post("/deleteTodo",handlersLib.deleteTodo);
app.post("/viewItems",handlersLib.viewItems);
app.get("/logout",handlersLib.logoutUser);
app.post("/addItem",handlersLib.addItem);
app.post("/deleteItem",handlersLib.deleteItems);
app.post("/editItem",handlersLib.editItem);
app.post("/markItemDone",handlersLib.markItemDone);
app.post("/markItemUndone",handlersLib.markItemUndone);

app.use(express.static("public"));
app.use(handlersLib.respondWith404);

module.exports = app;
