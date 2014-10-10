var Registry = require("../../helpers/registry.js");

describe("Tests for registry", function () {
	var registry;
	// Example model for registery
	var model = {
		id : 1,
		type : 'model',
		getId : function () {
			return this.id;
		}
	};

	// initializes registry each time for tests
	beforeEach( function () {
		registry = new Registry();
	});

	// Testing registry object
	it("should not be undefined", function () {
		expect(registry).toBeDefined();
	});

	// Testing zero cache length initially
	it("should have zero cache length initially", function () {
		expect(Object.keys(registry.cache).length).toEqual(0);
	});

	// Testing max length initially
	it("should have a max length", function () {
		expect(registry.maxLength).toEqual(2000);
	});

});