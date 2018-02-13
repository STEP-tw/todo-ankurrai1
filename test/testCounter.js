const prefix= "../models/";
const Counter = require(`${prefix}counter.js`).Counter;
const assert = require("chai").assert;

describe("class Counter",function () {
	beforeEach(function () {
		counter = new Counter;
		counter2 = new Counter(1,2);
	});
	it("should have an initial value",function () {
		assert.propertyVal(counter2,"initialValue",1);
		assert.propertyVal(counter2,"count",1);
		assert.propertyVal(counter,"addend",1);
	});
	describe("increment",function () {
		it("increments itself by 1",function () {
			counter.increment();
			assert.equal(counter.count,1);
			counter.increment();
			assert.equal(counter.count,2);
			counter.increment();
			assert.equal(counter.count,3);
		});

		it("increments itself by given addend",function () {
			counter2.increment();
			assert.equal(counter2.count,3);
			counter2.increment();
			assert.equal(counter2.count,5);
		});
	});

	describe("reset",function () {
		it("resets its count to initialValue",function () {
			counter2.increment();
			assert.equal(counter2.count,3);
			counter2.reset();
			assert.equal(counter2.count,1);
		});
	});
});
