var library = (function(){
	var flattenArray = [];
	var flatten_index = 0;

	return {
		// Utility --- Complete Functions Below
		identity : function(val) {
			return val;
		},

		// Collections --- Complete Functions Below
		each : function(list, iterator) {
			if ( list.constructor === Array ) {
				for (var i=0;i<list.length;i++) {
					iterator(list[i],i,list);
				}
			} else {
				for (var i=0; i<Object.keys(list).length; i++) {
					iterator(list[Object.keys(list)[i]],Object.keys(list)[i],list);
				}
			}
		},

		filter : function(list, test) {
			var filtered_list = [];
			for (var i=0;i<list.length;i++) {
				if (test(list[i])) filtered_list.push(list[i]);
			}
			return filtered_list;
		},

		reject : function(list, test) {
			var filtered_list = [];
			for (var i=0;i<list.length;i++) {
				if ( ! test(list[i])) filtered_list.push(list[i]);
			}
			return filtered_list;
		},

		map : function(list, iterator) {
			var mapped_list = [];
			for (var i=0;i<list.length;i++) {
				mapped_list[i] = iterator(list[i]);
			}
			return mapped_list;
		},

		pluck : function(list, key) {
			return this.map(list, function(item){
				return item[key];
			});
		},
		
		reduce : function(list, iterator, accumulator) {
			if (accumulator == undefined) accumulator = list[0];
			for (var i=0;i<list.length;i++) {
				accumulator = iterator(accumulator,list[i]);
			}
			return accumulator;
		},

		every : function(list, iterator) {
			if (list.length == 0) return true;
			if (iterator == undefined) iterator = this.identity;
			for (var i=0;i<list.length;i++) {
				if (! iterator(list[i])) return false;
			}
			return true;
		},

		some : function(list, iterator) {
			if (list.length == 0) return false;
			if (iterator == undefined) iterator = this.identity;
			for (var i=0;i<list.length;i++) {
				if (iterator(list[i])) return true;
			}
			return false;
		},

		contains : function(list, target) {
			if (list.length) {
				for (var i=0; i<list.length; i++) {
					if (list[i] == target) return true;
				}
				return false;
			} else {
				for (var i=0; i<Object.keys(list).length; i++) {
					if (list[Object.keys(list)[i]] == target) return true;
				}
				return false;
			}			
		},

		// Advanced Collections --- Complete Functions Below
		shuffle : function(array) {
			var shuffled_array = [];
			if ( array.length == 1 ) return array[0];
			shuffled_array[array.length-1] = array[0];
			for (var i=1; i<array.length; i++) {
				shuffled_array[i-1] = array[i];
			}
			return shuffled_array;
		},

		invoke : function(list, methodName, args) {
			var invoked_list = [];
			if ( args== undefined ) args = "";
			for (var i=0; i<list.length; i++) {
				if ( typeof methodName == 'string' ) invoked_list[i] = list[i][methodName](args);
				else invoked_list[i] = methodName.call(list[i]);
			}
			return invoked_list;
		},

		sortBy : function(list, iterator) {
			var sorted_list = [];
			var bIndexFound;
			var sort_index;
			if ( iterator === undefined ){
				iterator = this.identity;
			} else if ( typeof iterator === 'string' ) {
				var property = iterator;
				iterator = function(obj) {
					return obj[property];
				}
			}
			for (var i=0; i<list.length; i++) {
				bIndexFound = false;
				sort_index = 0;
				while ( ! bIndexFound ) {
					if ( sorted_list.length == 0 ) {
						bIndexFound = true;
					} else if (sort_index == sorted_list.length) {
						bIndexFound = true;
					} else if ( list[i] == undefined ) {
						sort_index = sorted_list.length;
						bIndexFound = true;
					} else if ( sorted_list[sort_index] == undefined ) {
						bIndexFound = true;	
					} else if ( (iterator(list[i]) < iterator(sorted_list[sort_index]))) {
						bIndexFound = true;
					} else {
						sort_index++;
					}
				}
				sorted_list.splice(sort_index,0,list[i]);
			}
			return sorted_list;
		},

		// Objects --- Complete Functions Below
		extend : function(obj) {
			var args=arguments;
			for (var i=1; i<args.length; i++) {
				for (var j=0; j<Object.keys(args[i]).length; j++) {
//					if ( args[0][Object.keys(args[i])[j]] === undefined ) args[0][Object.keys(args[i])[j]] = args[i][Object.keys(args[i])[j]];
					args[0][Object.keys(args[i])[j]] = args[i][Object.keys(args[i])[j]];
				}
			}
			return args[0];
		},

		defaults : function(obj) {
			var args=arguments;
			for (var i=1; i<args.length; i++) {
				for (var j=0; j<Object.keys(args[i]).length; j++) {
					if ( args[0][Object.keys(args[i])[j]] === undefined ) args[0][Object.keys(args[i])[j]] = args[i][Object.keys(args[i])[j]];
//					args[0][Object.keys(args[i])[j]] = args[i][Object.keys(args[i])[j]];
				}
			}
			return args[0];
		},

		// Arrays --- Complete Functions Below
		first : function(array, n) {
			return n === undefined ? array[0] : array.slice(0, n);
		},

		last : function(array, n) {
			if (n == undefined) return array[array.length-1];
			else if (n > array.length) return array;
			return array.slice(array.length-n);
		},

		indexOf : function(array, target){
			for (var i=0; i<array.length; i++) {
				if ( target == array[i] ) return i;
			}
			return -1;
		},

		uniq : function(array) {
			var uniq_array = [];
			for (var i=0; i<array.length; i++) {
				if ( ! this.contains(uniq_array,array[i]) ) uniq_array.push(array[i]);
			}
			return this.sortBy(uniq_array);
		},

		// Advanced Arrays --- Complete Functions Below
		zip : function() {
			var element_array = [];
			var output_array = [];
			var max_length = 0;
			for (var i=0; i<arguments.length; i++) {
				if ( arguments[i].length > max_length ) max_length = arguments[i].length;
			}
			for (var i=0; i<max_length; i++) {
				element_array = [];
				for (var j=0; j<arguments.length; j++) {
					if ( arguments[j][i] === undefined ) element_array.push(undefined);
					else element_array.push(arguments[j][i]);
				}
				output_array.push(element_array);
			}
			return output_array;			
		},

		flatten : function(nestedArray, result) {
			for (var i = 0, count = nestedArray.length; i < count; i++) {
				var value = nestedArray[i];
				if ( value.constructor === Array ) this.flatten(value);
				else flattenArray[flatten_index++] = value;
			}
			return flattenArray;
		},

		intersection : function() {
			var intersect_array = [];
			var temp_array = arguments[0];
			for (var i=1; i<arguments.length; i++) {
				intersect_array = [];
				for (var j=0; j<temp_array.length; j++) {
					if ( this.contains(arguments[i],temp_array[j]) && ! this.contains(intersect_array,temp_array[j])) intersect_array.push(temp_array[j]);
				}
				temp_array = intersect_array;
			}
			return intersect_array;
		},

		difference : function(array) {
			var difference_array = [], args = arguments, temp_array = args[0];
			for (var i=1; i<args.length; i++) {
				difference_array = [];
				for (var j=0; j<temp_array.length; j++) {
					if ( ! this.contains(args[i],temp_array[j]) && ! this.contains(difference_array,temp_array[j]) ) difference_array.push(temp_array[j])
				}
				temp_array = difference_array;
			}
			return difference_array;
		},

		// difference : function(array) { // Made this more complicated than it needed to be
		// 	var difference_array = [];
		// 	var value_container = {};
		// 	var args = arguments;
		// 	for (var i=0; i<args.length; i++) {
		// 		for (var j=0; j<args[i].length; j++) {
		// 			if ( value_container[args[i][j]] === undefined ) {
		// 				value_container[args[i][j]] = 1;
		// 				console.log(args[i][j] + " is undefined, setting to one");
		// 			} else {
		// 				value_container[args[i][j]] += 1;
		// 				console.log(args[i][j] + " is defined, incrementing by one");
		// 			}
		// 		}
		// 	}
		// 	for (var i=0; i<Object.keys(value_container).length; i++) {
		// 		var key = Object.keys(value_container)[i];
		// 		console.log(key + " count = " +value_container[key]);
		// 		if ( value_container[key] === 1 ) difference_array.push(key);
		// 	}
		// 	return difference_array;
		// },

		// Functions --- Complete Functions Below
		once : function(func) {
			var hasBeenCalled = false;
			return function() {
				if ( ! hasBeenCalled) {
					hasBeenCalled = true;
					func();
				}
			}
		},

		memoize : function(func) {
			var memo = {};
			return function() {
				var args = Array.prototype.slice.call(arguments);
				if (args in memo) return memo[args];
				else return (memo[args] = func.apply(this, args));
			}
		},

		delay : function(func, wait) {
			var args = [];
			args = Array.prototype.slice.call(arguments,2);
			setInterval(function(){func.apply(this,args);},wait);
		}
	}
})();