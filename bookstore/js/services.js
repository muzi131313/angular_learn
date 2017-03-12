//请尝试把BookListCtrl中加载书籍列表数据的部分抽出来作为一个服务

var doRequest = function ($http, path) {
	return $http({
		method: 'GET',
		url: path
	});
}, requestError = function (err) { // TODO:统一处理
	console.error(err);
}, httpPrefix = './';

/**
 * 书籍列表
 */
bookListModule.factory('bookListService', ['$http', function ($http) {
	return {
		/**
		 * [bookList 书本列表]
		 * @param  {[type]} bookType        [description]
		 * @param  {[type]} searchText      [description]
		 * @param  {[type]} successCallback [description]
		 * @return {[type]}                 [description]
		 */
		bookList: function (bookType, searchText, successCallback) {
			doRequest($http, httpPrefix+'data/books' + bookType + '.json')
			.success(function(largeLoad) {
				largeLoad = largeLoad || [];
				if(searchText){
					searchText = searchText.toLowerCase();
					largeLoad = largeLoad.filter(function (item) {
						var valStr = Object.values(item);
						return ~JSON.stringify(valStr).toLowerCase().indexOf(searchText);
					});
				}
				successCallback && successCallback.call(null, largeLoad);
			})
			.error(function (err) {
				requestError.apply(this, arguments);
			});
		}
	}
}]);


/**
 * 书籍详情
 */
bookDetailModule.factory('boolDetailService', ['$http', function ($http) {
	return {
		/**
		 * [bookDetail 书本详情]
		 * @param  {[type]} bookId          [description]
		 * @param  {[type]} successCallback [description]
		 * @return {[type]}                 [description]
		 */
		bookDetail: function (bookId, successCallback) {
			doRequest($http, httpPrefix+'data/books0.json')
			.success(function(largeLoad) {
				largeLoad = largeLoad || [];
				largeLoad = largeLoad.filter(function(item) {
                    return item.bookId == bookId;
                });
				successCallback && successCallback.call(null, largeLoad ? largeLoad[0] : {});
			})
			.error(function (err) {
				requestError.apply(this, arguments);
			});
		}
	}
}]);