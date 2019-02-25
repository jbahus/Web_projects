const assert = require("chai").assert;
const index = require("../routes/index");

describe('App', function(){
    it('app should return hello', function(){
        assert.equal("hello", 'hello');
    });
});
