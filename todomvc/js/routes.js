(function(app, Router){
	// director.js 做路由部分的工作
	// 教程见 http://www.cnblogs.com/Showshare/p/director-chinese-tutorial.html
	var router = new Router();

	// 草泥马上面不加分号会爆炸
	['all', 'active', 'completed'].forEach(function(visibility){
		router.on(visibility, function(){
			app.visibility = visibility;
		});
	});

	router.configure({
		notFound: function(){
			window.loaction.hash = '';
			app.visibility = 'all';
		}
	})

	router.init();
})(app, Router);