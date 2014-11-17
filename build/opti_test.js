(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Opti class for the local storage of songs, 
 * so we don't need to fetch them repeatedly
**/

// Export the Opti class
module.exports = Opti;

// Used to check if an object is an array or not
var isArray = Array.isArray;

/**
 * Initializer for the Opti class
 */	
function Opti () {
	this.cache = {};
	this.maxLength = 2000;
}

/**
 * Stores a particular value if not already in Opti.
 *
 * @param object model Model to be stored in the Opti for future easy retrievel
 */
Opti.prototype.store = function ( model ) {
	// Check if models passed an array, 
	// if yes call function for store for each of them
	( isArray(model) ? model : [model] ).forEach( function ( model ) {
		var cache = this.cache;
		// Get the type of model, if none set it track
		var type = model.type || 'default';
		// Get the id of model
		var id = model.id || model.getId();
		// Generate a hash
		var key = type + id;
		if ( !id ) {
			// If id is not found throw an error;
			throw Error('Models must have an id');
		}
		// Check if cache's length has passed length
		if ( Object.keys(cache).length > this.maxLength ) {
			// If yes, use FIFO strategy to remove the first one in 
			cache.shift();
		}
		//Prevent overwrite and save the model
		cache[key] = cache[key] || model;
	}, this);
	return this;
};

/**
 * Looks up in cache if a particular is there and return it, if the objects doesn't
 * it returns cache
 *
 * @param integer id ID of the object to be found
 * @param string type Type of the object to be found, defaults to track
 */
Opti.prototype.lookup = function ( id, type ) {
	var cache = this.cache;
	// If type not pass default to track
	type = typeof type !== undefined ? type : 'track';
	return cache && cache[type + id];
};
/**
 * Removes a particular values from register using its type and id
 *
 * @param integer id ID of the object to be removed
 * @param string type Type of the object to be removed, defaults to track
 */
Opti.prototype.remove = function ( id, type ) {
	if ( !id || typeof id === undefined ) {
		// If ID is not passed through an error
		throw Error('Passing ID is necessary to remove');
	}
	// Get type, if not passed default it to track
	type = typeof type !== undefined ? type : 'track';
	// Get cache
	var cache = this.cache;
	// Lookup if the passed object is in Opti
	if ( this.lookup.apply( this, arguments ) ) {
		// Exists, delete it 
		delete cache[type+id];
		return true;
	}
	// Doesn't exists, return false
	return false;
};

/**
 * Resets the internal cache, clears Opti's cache variable 
 */
Opti.prototype.clear = function () {
	this.cache = {};
};
},{}],2:[function(require,module,exports){
var Registry = require("../src/opti.js");

describe("Tests for opti", function () {
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

},{"../src/opti.js":1}]},{},[2]);
