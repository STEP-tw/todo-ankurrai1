let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
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
    it('should serve index.html', done => {
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

  describe('GET /index.html', () => {
    it('gives the index page', done => {
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

  describe('GET /script/dataRender.js', () => {
    it('serves the javascript source', done => {
      request(app, {
        method: 'GET',
        url: '/script/dataRender.js'
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
    it('redirects to loginPage for invalid user', done => {
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
})
