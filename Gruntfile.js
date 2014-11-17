module.exports = function ( grunt ) {
	// Load all grunt tasks
	require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);
	
	// init the grunt config
	grunt.initConfig({
	    // Browserify the modules
		browserify : {
			opti : {
				src : "src/opti.js",
				dest : "build/opti.js" 
			},
			tests : {
				src : "tests/opti_test.js",
				dest : "build/opti_test.js"
			}
		},

		// Add tasks for unit tests
		karma : {
			unit : {
				configFile : "karma.config.js"
			}
		}
	});

	// Define dev environment tasks
	grunt.registerTask('default',['browserify', 'karma:unit']);
	// Define production environment tasks
	grunt.registerTask('production', ['env:prod', 'browserify:opti']);
};