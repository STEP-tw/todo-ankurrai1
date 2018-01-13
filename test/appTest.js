let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../serverlib.js');
let th = require('./testHelper.js');



describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })

  describe('GET /',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'index.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })

  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'TODO APP');
        done();
      })
    })
  })

  describe('GET /image/todo.jpg',()=>{
    it('serves the image',done=>{
      request(app,{method:'GET',url:'/image/todo.jpg'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'image/jpg');
        done();
      })
    })
  })

  describe('GET /script/dataRander.js',()=>{
    it('serves the javascript source',done=>{
      request(app,{method:'GET',url:'/script/dataRander.js'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/js');
        th.body_contains(res,'displayTodo');
        done();
      })
    })
  })
  describe('GET /loginPage.html',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/loginPage.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name :');
        done();
      })
    })
  })

  describe('POST /login',()=>{
    it('redirects to loginPage for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=arvind'},res=>{
        th.should_be_redirected_to(res,'loginPage.html');
        th.should_not_have_cookie(res,'essage');
        done();
      })
    })

    it('redirects to login.html with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'loginPage.html');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
  })

  describe.skip('POST /submitForm',()=>{
    it('serves the javascript source',done=>{
      request(app,{method:'POST',url:'/submitForm',body:'name=Foo&comment=Faa'},res=>{
        th.should_be_redirected_to(res,'/guestBook');
        done();
      })
    })
  })
})
