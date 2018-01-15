const fs = require('fs');
const Todo = require('./todo.js');

let Users = function(storagePath) {
  this.storagePath = storagePath;
  this.usersTodos = getAllUsersTodo(storagePath);
};

Users.prototype = {

  getTodoByTitle: function(userName, title) {
    return this.usersTodos[userName][title];
  },

  deleteTodoByTitle: function(userName, title) {
    delete this.usersTodos[userName][title];
  },

  getUserAllTodo: function(userName) {
    return this.usersTodos[userName];
  },

  addNewTodo: function(userName,title, description) {
    let todo = new Todo(title, description);
    this.usersTodos[userName][title] = todo;
  },

  storeData:function () {
    storeAllUsersTodo(this.storagePath,this.usersTodos)
  }

}

const getAllUsersTodo = function(filePath) {
  let usersData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(usersData);
};

const storeAllUsersTodo = function(filePath, content) {
  let data = JSON.stringify(content, null, 1);
  fs.writeFile(filePath, data, (err) => {
    if (err) console.log(`storage ${filePath} not valid`);
  });
};
module.exports = Users;
