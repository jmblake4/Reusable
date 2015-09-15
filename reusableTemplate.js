var library = (function(){
	return {
		// Utility --- Complete Functions Below
		identity : function(val) {
			return val;
		},

		// Collections --- Complete Functions Below
		each : function(list, iterator) {
			if (list.length) {
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
			var j = 0;
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
				console.log('dsfkjhsdk'['toUpperCase']());
				if ( typeof methodName == 'string' ) invoked_list[i] = list[i][methodName](args);
				else invoked_list[i] = methodName.call(list[i]);
			}
			return invoked_list;
		},

		sortBy : function(list, iterator) {
			var sorted_list = [];
			var bIndexFound;
			var sort_index;
			for (var i=0; i<list.length; i++) {
				bIndexFound = false;
				sort_index = 0;
				if ( iterator == 'length' ) {
					while ( ! bIndexFound ) {
						console.log(sort_index);
						if ( sorted_list.length == 0 ) {
							bIndexFound = true;
						} else if (sort_index == sorted_list.length) {
							bIndexFound = true;
						} else if ( list[i] == undefined ) {
							sort_index = sorted_list.length;
							bIndexFound = true;
						} else if ( sorted_list[sort_index] == undefined ) {
							bIndexFound = true;
						} else if ( (list[i].length <= sorted_list[sort_index].length) ) {
							bIndexFound = true;
						} else {
							sort_index++;
						}
					}					
				} else {
					while ( ! bIndexFound ) {
						console.log(sort_index);
						if ( sorted_list.length == 0 ) {
							bIndexFound = true;
						} else if (sort_index == sorted_list.length) {
							bIndexFound = true;
						} else if ( list[i] == undefined ) {
							sort_index = sorted_list.length;
							bIndexFound = true;
						} else if ( sorted_list[sort_index] == undefined ) {
							bIndexFound = true;	
						} else if ( (iterator(list[i]) <= iterator(sorted_list[sort_index])) || (sorted_list[sort_index] == undefined) ) {
							bIndexFound = true;
						} else {
							sort_index++;
						}
					}
				}
				sorted_list.splice(sort_index,0,list[i]);				
			}
			return sorted_list;
		},

		// Objects --- Complete Functions Below
		extend : function(obj) {},

		defaults : function(obj) {},

		// Arrays --- Complete Functions Below
		first : function(array, n) {
			return n === undefined ? array[0] : array.slice(0, n);
		},

		last : function(array, n) {},

		indexOf : function(array, target){},

		uniq : function(array) {},

		// Advanced Arrays --- Complete Functions Below
		zip : function() {},

		flatten : function(nestedArray, result) {},

		intersection : function() {},

		difference : function(array) {},

		// Functions --- Complete Functions Below
		once : function(func) {},

		memoize : function(func) {},

		delay : function(func, wait) {}
	}
})();




