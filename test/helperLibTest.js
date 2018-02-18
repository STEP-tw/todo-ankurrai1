const assert = require("chai").assert;
const lib = require("../handlers/helperLib.js");
const User = require("../models/user.js");

describe("HelperLib", function() {
  describe("getUserName", function() {
    it("should get given user's name", function() {
      let user = {
        body: {
          userName: "ankur"
        }
      };
      let actual = lib.getUserName(user);
      assert.equal(actual, "ankur");
    });
  });
  describe("getPassword", function() {
    it("should get given user's password", function() {
      let user = {
        body: {
          password: "ankur"
        }
      };
      let actual = lib.getPassword(user);
      assert.equal(actual, "ankur");
    });
  });
  describe("fromJSON", function() {
    it("should parse a given stringified item", function() {
      let actual = lib.fromJSON("[]");
      assert.deepEqual(actual, []);
    });
  });
  describe("getFileContents", function() {
    it("should get a requested file'contents", function() {
      let fs = {};
      fs.readFileSync = function(url) {
        return url + " text";
      };
      let actual = lib.getFileContents("filePath", fs);
      assert.deepEqual(actual, "filePath text");
    });
  });
  describe("getContentType", function() {
    it("should get Content type for given filePath", function() {
      let actual = lib.getContentType("scriptFile.js");
      assert.deepEqual(actual, "text/js");
    });
  });
  describe("getValidUser", function() {
    let validUser = {
      userName: "ankur",
      password: "ankur"
    };
    let req = {
      body: {
        userName: "ankur",
        password: "ankur"
      }
    };
    let validUsers = [validUser];
    it("should return a valid user", function() {
      assert.deepEqual(lib.getValidUser(req, validUsers), validUser);
    });
    it("should return undefined for a invalid user", function() {
      let req = {
        body: {
          userName: "rai",
          password: "ankur"
        }
      };
      assert.deepEqual(lib.getValidUser(req, validUsers), undefined);
    });
  });
  describe("getCookie", function() {
    let req = {
      cookies: {
        "user": "ankur",
        " sessionid": 5
      }
    };

    it("should get a requested cookie", function() {
      let actual = lib.getCookie(req, "user");
      assert.deepEqual(actual, "ankur");
    });
    it("should get a requested cookie", function() {
      let actual = lib.getCookie(req, "sessionid");
      assert.deepEqual(actual, 5);
    });
  });

  describe("retriveBehaviour", function() {
    it("should retrive behaviour of a stringified instance", function() {
      let user = JSON.stringify(new User(1, "ankur"));
      user = JSON.parse(user);
      user = lib.retriveBehaviour(User, user);
      assert.equal(user.todoCount, 0);
    });
  });

  describe("getTitle", function() {
    it("should get title from request body", function() {
      let user = {
        body: {
          title: "ankur"
        }
      };
      let actual = lib.getTitle(user);
      assert.equal(actual, "ankur");
    });
  });

  describe("getDescription", function() {
    it("should get title from request body", function() {
      let user = {
        body: {
          description: "ankur"
        }
      };
      let actual = lib.getDescription(user);
      assert.equal(actual, "ankur");
    });
  });

  describe("get todoId", function() {
    it("should get todo's id", function() {
      let id = "todoID";
      let req = {
        body: {
          todoId: id
        }
      };
      let actual = lib.getTodoId(req);
      assert.equal(actual, id);
    });
  });

  describe("get itemId", function() {
    it("should get item's id", function() {
      let id = "itemID";
      let req = {
        body: {
          itemId: id
        }
      };
      let actual = lib.getItemId(req);
      assert.equal(actual, id);
    });
  });

  describe("toJsonString", function() {
    it("should convert given item into a json string", function() {
      assert.isString(lib.toJsonString({
        body: {
          description: "ankur"
        }
      }));
    });
  });

  describe("fetchUser", function() {
    it("should fetch user from a given list of users", function() {
      let user = {
        name: "ankur",
        password: "ankur"
      };
      let usersData = [user];
      assert.deepEqual(lib.fetchUser(usersData, "ankur"), user);
    });
  });

  describe("updateData", function() {
    it("should write in a given file", function() {
      let dummyFile = "no";
      let fs = {};
      fs.writeFileSync = function(filePath, data) {
        filePath += data;
        return filePath;
      };
      assert.equal(lib.updateData(3, dummyFile, fs), "no3");
    });
  });

  describe("createNewUser", function() {
    it("should create new user with given name", function() {
      let users = [];
      lib.createNewUser(users, "ankur");
      let expected = [{
        name: "ankur",
        id: 1,
        todoList: [],
        deletedTodos: []
      }];
      assert.deepEqual(users, expected);
    });
  });
  describe("ifNewUserCreateRepo", function() {
    it("should create new user with given name", function() {
      let req = {
        body: {
          userName: "ankurrai",
          password: "ankur"
        }
      };
      let users = [];
      lib.ifNewUserCreateRepo(req, users);
      let expected = [{
        name: "ankurrai",
        id: 1,
        todoList: [],
        deletedTodos: []
      }];
      assert.deepEqual(users, expected);
    });

    it("should create new user with given name", function() {
      let req = {
        body: {
          userName: "ankur",
          password: "ankur"
        }
      };
      let users = [{
        name: "ankur",
        id: 1,
        todoList: [],
        deletedTodos: []
      }];
      lib.ifNewUserCreateRepo(req, users);
      let expected = [{
        name: "ankur",
        id: 1,
        todoList: [],
        deletedTodos: []
      }];
      assert.deepEqual(users, expected);
    });
  });

  describe("getUsersRepoPath", function() {
    it("should get the path of users repository from test directory", function() {
      assert.equal(lib.getUsersRepoPath(), "./test/testData/usersRepo.json");
    });

    it("should get the path of users repository from src directory", function() {
      delete process.env.usersRepo;
      assert.equal(lib.getUsersRepoPath(), "./data/data.json");
    });
  });

  describe("getFilePath", function() {
    it("should get the requested file path", function() {
      let address = "/ankur",
        req = {
          url: address
        };
      assert.equal(lib.getFilePath(req), `./public${address}`);
    });
  });

  describe("replacePageContent", function() {
    it("should replace page content with given content", function() {
      let data = "sridev",
        textToReplace = "ankur";
      assert.equal(lib.replacePageContent(data, "sridev", textToReplace), textToReplace);
    });
  });

  describe("urlIsOneOf", function() {
    let urls;
    before(function() {
      urls = ["url1", "url2", "url3"];
    });
    it("should assert whether given url is one of given list of urls", function() {
      assert.isTrue(lib.urlIsOneOf(urls, "url1"));
    });

    it("should give false if given url is not one of given urls", function() {
      assert.isFalse(lib.urlIsOneOf(urls, "url"));
    });
  });

  describe("generateId",function () {
    it("should generateId given an initialValue",function () {
      assert.equal(lib.generateId(2),3);
    });
  });
});
