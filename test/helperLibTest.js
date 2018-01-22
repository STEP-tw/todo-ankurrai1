const assert = require('chai').assert;
const lib = require('../handlers/helperLib.js');

describe('HelperLib', function() {
  describe('getUserName',function() {
    it('should get given user\'s name', function() {
      let user = {body:{userName:"ankur"}}
      let actual = lib.getUserName(user);
      assert.equal(actual,'ankur');
    })
  })
  describe('getPassword',function() {
    it('should get given user\'s password', function() {
      let user = {body:{password:"ankur"}}
      let actual = lib.getPassword(user);
      assert.equal(actual,'ankur');
    })
  })
})
