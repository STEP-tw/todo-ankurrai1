process.env.usersRepo = "./test/testData/usersRepo.json";
let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');
let User = require('../models/user.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('resonds with 404', done => {
      request(app, {
        method: 'GET',
        url: '/bad'
      }, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })

  describe('GET /', () => {
    it('should serve login.html', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.status_is_ok(res);
        th.body_contains(res, 'TODO APP');
        done();
      })
    })
  })

  describe('GET /login.html', () => {
    it('should take logged out user to login page', done => {
      request(app, {
        method: 'GET',
        url: '/login'
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/html');
        th.body_contains(res, 'TODO APP');
        done();
      })
    })

    it('should give user\'s home page for a logged in user', done => {
      request(app, {
        method: 'GET',
        url: '/login',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai"
        }
      }, res => {
        th.should_be_redirected_to(res, 'home');
        done();
      })
    })
  })

  describe('GET /image/todo.jpg', () => {
    it('serves the image', done => {
      request(app, {
        method: 'GET',
        url: '/image/todo.jpg'
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'image/jpg');
        done();
      })
    })
  })

  describe('GET /script/showTodoList.js', () => {
    it('serves the list of todo page', done => {
      request(app, {
        method: 'GET',
        url: '/script/showTodoList.js',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai"
        }
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/js');
        th.body_contains(res, 'getAllTodo');
        done();
      })
    })
  })
  describe('GET /loginPage.html', () => {
    it('serves the login page', done => {
      request(app, {
        method: 'GET',
        url: '/login'
      }, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'Name :');
        done();
      })
    })
  })

  describe('POST /login', () => {
    it('redirects to loginPage for valid user', done => {
      request(app, {
          method: 'POST',
          url: '/login',
          body: 'userName=ankurrai&password=ankur'
        },
        res => {
          th.should_be_redirected_to(res, 'home');
          th.should_not_have_cookie(res, 'message');
          done();
        })
    })
    it('redirects to login.html with message for invalid user', done => {
      request(app, {
        method: 'POST',
        url: '/login',
        body: 'username=badUser'
      }, res => {
        th.should_be_redirected_to(res, 'login');
        th.should_have_expiring_cookie(res, 'message', 'login failed');
        done();
      })
    })
  })

  describe('GET /logout', function() {
    it('it should redirect user to login and delete cookies', done => {
      request(app, {
        method: 'GET',
        url: '/logout',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai"
        }
      }, res => {
        th.should_be_redirected_to(res, 'login');
        th.should_not_have_cookie(res, 'user');
        th.should_not_have_cookie(res, 'sessionid');
        done();
      })
    })
  })
  describe('GET unpermitted files', function() {
    it('should not allow unlogged user to access unpermitted files', done => {
      request(app, {
        method: 'GET',
        url: '/home.html',
      }, res => {
        th.should_be_redirected_to(res, 'login');
        th.should_have_expiring_cookie(res, 'message', 'Kindly login for more access');
        done();
      })
    })
  })

  describe('POST /addTodo', function() {
    it('should redirect user to viewing(userHome) page', done => {
      request(app, {
        method: 'POST',
        url: '/addTodo',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai"
        }
      }, res => {
        th.should_be_redirected_to(res, 'home');
        done();
      })
    })
  })

  describe('GET /home', function() {
    it('should give users home for logged in user', done => {
      request(app, {
        method: 'GET',
        url: '/home',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai"
        }
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/html');
        th.body_contains(res, 'User Home');
        done();
      })
    })
  })

  describe('POST /editTodo', function() {
    it('should redirect the user to home ', done => {
      request(app, {
        method: 'POST',
        url: '/editTodo',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai; todoId=1;"
        },
        body: 'title=new&description=todo'
      }, res => {
        th.should_have_cookie(res, 'todoId', '0');
        th.should_be_redirected_to(res, 'home');
        done();
      })
    })
  })
  describe('GET /createNewTodo', function() {
    it('should give page to create new todo ', done => {
      request(app, {
        method: 'GET',
        url: '/createNewTodo',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai; "
        }
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/html');
        th.body_contains(res, 'write your todo');
        done();
      })
    })
  })
  describe('GET /userTodos', function() {
    it('should give userTodos', done => {
      request(app, {
        method: 'GET',
        url: '/userTodos',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai; "
        }
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/plain');
        th.body_contains(res, 'todo');
        done();
      })
    })
  })

  describe('POST /deleteTodo',function () {
    it('should have a status of 201',done => {
      request(app, {
        method: 'POST',
        url: '/deleteTodo',
        headers: {
          cookie: "sessionid=1516430776870; user=ankurrai; "
        }
      }, res => {
        th.statusCode_is_created(res);
        done();
      })
    })
  })
})
