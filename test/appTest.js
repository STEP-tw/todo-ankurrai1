process.env.usersRepo = "./test/testData/usersRepo.json";
const request = require("supertest");
let chai = require("chai");
let assert = chai.assert;
let app = require("../app.js");
let th = require("./testHelper.js");
let User = require("../models/user.js");

let end;
describe("app", () => {
  beforeEach(function() {
    handleError = function(done) {
      return function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      };
    };
  });
  describe("GET /bad", () => {
    it("resonds with 404", done => {
      request(app)
        .get("/bad")
        .expect(404)
        .end(handleError(done));
    });
  });

  describe("GET /", () => {
    it("should serve login.html", done => {
      request(app)
        .get("/")
        .expect(200)
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(/TODO APP/)
        .end(handleError(done));
    });
  });

  describe("GET /login.html", () => {
    it("should take logged out user to login page", done => {
      request(app)
        .get("/login")
        .expect(200)
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(/TODO APP/)
        .end(handleError(done));
    });

    it("should give user's home page for a logged in user", done => {
      request(app)
        .get("/login")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .expect(302)
        .expect("Location", "home")
        .end(handleError(done));
    });
  });

  describe("GET /image/todo.jpg", () => {
    it("serves the image", done => {
      request(app)
        .get("/image/todo.jpg")
        .expect(200)
        .expect("Content-Type", "image/jpeg")
        .end(handleError(done));
    });
  });

  describe("POST /login", () => {
    it("redirects to userHome for valid user", done => {
      request(app)
        .post("/login")
        .send("userName=ankurrai&password=ankur")
        .expect(302)
        .expect("Location", "home")
        .expect("set-cookie", /user=ankurrai/)
        .end(handleError(done));
    });
    it("redirects to login.html with message for invalid user", done => {
      request(app)
        .post("/login")
        .send("userName=ankurraiiiii&password=ankur")
        .expect(302)
        .expect("Location", "login")
        .expect("set-cookie", "message=login failed; Max-Age=5")
        .end(handleError(done));
    });
  });

  describe("GET /logout", function() {
    it("it should redirect user to login and delete cookies", done => {
      request(app)
        .get("/logout")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .expect(302)
        .expect("Location", "login")
        .expect("set-cookie", "sessionid=0; Max-Age=0,user=''; Max-Age=0")
        .end(handleError(done));
    });
  });
  describe("GET unpermitted files", function() {
    it("should not allow unlogged user to access unpermitted files", done => {
      request(app)
        .get("/todo.html")
        .expect("set-cookie", "message=Kindly login for more access; Max-Age=5")
        .expect(302)
        .expect("Location", "login")
        .end(handleError(done));
    });
  });

  describe("POST /addTodo", function() {
    it("should redirect user to viewing(userHome) page", done => {
      request(app)
        .post("/addTodo")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .expect(302)
        .expect("Location", "home")
        .end(handleError(done));
    });
  });

  describe("GET /home", function() {
    it("should get home", done => {
      request(app)
        .get("/home")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .expect(200)
        .expect(/Welcome ankurrai/)
        .end(handleError(done));
    });
  });

  describe("POST /editTodo", function() {
    it("should redirect the user to home ", done => {
      request(app)
        .post("/editTodo")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai; todoId=1")
        .send("title=hi&description=hello")
        .expect(302)
        .expect("Location", "home")
        .expect("set-cookie", "todoId=0; Max-Age=0")
        .end(handleError(done));
    });
  });
  describe("GET /createNewTodo", function() {
    it("should give page to create new todo ", done => {
      request(app)
        .get("/createNewTodo")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai;")
        .expect(200)
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(/write your todo/)
        .end(handleError(done));
    });
  });
  describe("GET /userTodos", function() {
    it("should give userTodos", done => {
      request(app)
        .get("/userTodos")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .expect(200)
        .expect("Content-Type", "text/plain; charset=utf-8")
        .expect(/description/)
        .end(handleError(done));
    });
  });

  describe("POST /deleteTodo", function() {
    it("should have a status of 201", done => {
      request(app)
        .post("/deleteTodo")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .send("todoId=1")
        .expect(201)
        .end(handleError(done));
    });
  });

  describe("POST /viewItems", function() {
    it("should serve items", done => {
      request(app)
        .post("/viewItems")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .send("todoId=1")
        .expect(200)
        .expect("")
        .end(handleError(done));
    });
  });

  describe("POST /addItem", function() {
    it("should save item", done => {
      request(app)
        .post("/addItem")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai; todoId=1")
        .send("item=text")
        .expect(200)
        .expect("")
        .end(handleError(done));
    });
  });

  describe("POST /deleteItem", function() {
    it("should have a status of 201", done => {
      request(app)
        .post("/deleteItem")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai")
        .send("itemId=1")
        .expect("Created")
        .expect(201)
        .end(handleError(done));
    });
  });

  describe("POST /editItem", function() {
    it("should edit given item", done => {
      request(app)
        .post("/editItem")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai; todoId=1")
        .send("item=text&itemId=1")
        .expect(200)
        .expect("")
        .end(handleError(done));
    });
  });

  describe("POST /markItemUndone", function() {
    it("should mark given item status as done", done => {
      request(app)
        .post("/markItemUndone")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai; todoId=1")
        .send("itemId=1")
        .expect(201)
        .expect("Created")
        .end(handleError(done));
    });
  });

  describe("POST /markItemDone", function() {
    it("should mark given item status as done", done => {
      request(app)
        .post("/markItemDone")
        .set("Cookie", "sessionid=1516430776870; user=ankurrai; todoId=1")
        .send("itemId=1")
        .expect(201)
        .expect("Created")
        .end(handleError(done));
    });
  });
});
