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
},{}]},{},[1]);
