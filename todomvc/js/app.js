(function(exports){

	var filters = {
		all: function(todos){
			return todos;
		},
		active: function(todos){
			return todos.filter(function(todo){
				return !todo.completed;
			})
		},
		completed: function(todos){
			return todos.filter(function(todo){
				return todo.completed;
			})
		}
	}
	exports.app = new Vue({
		el: '.todoapp',
		// data中的变量在内部使用时，都可以用this.todos这样的方法取得
		// 外部可以使用app.todos来取得，方法则是要加上$
		data:{
			todos: todoStorage.fetch(),
			newTodo: '',
			visibility: 'all',
			editedTodo: null
		},

		// 监视data中的属性变化
		watch: {
			todos:{
				handler: function(todos){
					todoStorage.save(todos);
				},
				deep: true
			}
		},

		// 可以根据现有的data属性，计算出一些新的有用的变量
		// 新变量也可以使用this.filteredTodos来取得
		computed: {
			filteredTodos: function(){
				return filters[this.visibility](this.todos);
			},
			remaining: function(){
				return filters['active'](this.todos).length;
			},
			allDone: {
				// computed 可以设置getter和setter
				// setter 就是如何从计算出来的变量，将data恢复出来
				get: function(){
					return this.remaining === 0;
				},
				set: function(value){
					this.todos.forEach(function(todo){
						todo.completed = value;
					})
				}
			}
		},

		// 定义一些事件响应的函数
		methods: {
			addTodo: function(){
				var value = this.newTodo && this.newTodo.trim();
				if(!value){
					return;
				}
				this.todos.push({title: value, completed: false});
				this.newTodo = '';
			},
			removeTodo: function(todo){
				this.todos.$remove(todo);
			},
			editTodo: function(todo){
				this.beforeEditCache = todo.title;
				this.editedTodo = todo; 
			},
			doneEdit: function(todo){
				if(!this.editedTodo){
					return;
				}
				this.editedTodo = null;
				todo.title = todo.title.trim();
				if(!todo.title){
					this.removeTodo(todo);
				}
			},
			cancelEdit: function(){
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},
			removeCompleted: function(){
				this.todos = filters.active(this.todos);
			}
		},

		directives: {
			'todo-focus': function (value) {
				if (!value) {
					return;
				}
				var el = this.el;
				Vue.nextTick(function () {
					el.focus();
				});
			}
		}
	});
})(window);