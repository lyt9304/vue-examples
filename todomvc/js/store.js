(function(exports){
	var STORAGE_KEY = 'vue-todo';

	// store部分只负责简单的localStorage存储
	exports.todoStorage = {
		fetch: function(){
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function(todos){
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	}
})(window);