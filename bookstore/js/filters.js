/**
 * 书籍详情
 */
bookDetailModule.filter('priceAdd', function () {
    return function (item){
        return (item || 0) + '元';
    }
});

bookDetailModule.filter('electronShow', function () {
    return function (item) {
        return item ? '有' : '无';
    }
});