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

	// testing all the function existence
	it("should have a function store, lookup, remove, clear", function () {
		expect(registry.store).toBeDefined();
		expect(typeof registry.store).toBe('function');
		expect(registry.lookup).toBeDefined();
		expect(typeof registry.lookup).toBe('function');
		expect(registry.remove).toBeDefined();
		expect(typeof registry.remove).toBe('function');
		expect(registry.clear).toBeDefined();
		expect(typeof registry.clear).toBe('function');
	});

	// Testing store function
	it("function store should work", function () {
		var reg = registry.store(model);
		expect(registry.cache['model1']).toBeDefined();
		expect(typeof registry.cache['model1']).toBe('object');
		expect(reg).toEqual(registry);
		expect(Object.keys(registry.cache).length).toEqual(1);
	});

	// Testing lookup function
	it("function lookup should work", function () {
		registry.store(model);
		var lookuped = registry.lookup(1, 'model');
		expect(typeof lookuped).toBe('object');
		expect(lookuped.type).toEqual('model');
		expect(lookuped.id).toEqual(1);
		expect(typeof lookuped.getId).toBe('function');
	});

	// Testing remove function
	it("function remove should work", function () {
		registry.store(model);
		var isRemoved = registry.remove(1, 'model');
		expect(isRemoved).toBeTruthy();
		var lookuped = registry.lookup(1, 'model');
		expect(lookuped).toBeUndefined();
		expect(Object.keys(registry.cache).length).toBe(0);
	});

	// Testing clear function
	it("function clear should work", function () {
		registry.store(model);
		registry.clear();
		expect(Object.keys(registry.cache).length).toBe(0);
	});
});