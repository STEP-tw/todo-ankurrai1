const fs = require('fs');
const Todo = require('./todo.js');

const getAllData = function(filePath) {
  let usersData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(usersData);
};

const storeAllData = function(filePath, content) {
  let data = JSON.stringify(content, null, 1);
  fs.writeFile(filePath, data, (err) => {
    if (err) console.log(`storage ${filePath} not valid`);
  });
};

const isUserAlreadyHaveATodo = function(usersTodo, userName) {
  return Object.keys(usersTodo).includes(userName);
};

let Users = function(storagePath, registeredUsers) {
  this.users = registeredUsers || getAllData('../data/validUsers.json');
  this.storagePath = storagePath;
  this.usersTodos = getAllData(storagePath);
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

  addNewTodo: function(userName, title, description) {
    if (isUserAlreadyHaveATodo(this.usersTodos, userName)) {
      this.usersTodos[userName][title] = new Todo(title, description);
      return
    }
    this.usersTodos[userName] = new Todo(title, description);
  },

  storeData: function() {
    storeAllData(this.storagePath, this.usersTodos)
  }
}

module.exports = Users;
