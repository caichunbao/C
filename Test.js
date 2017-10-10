/**
 * 框架
 * 
 */
(function(window) {
    /**
     * @param 框架
     * @param selector 选择器或页面加载回调函数
     * @param context 查找元素上下文
     */
    var A = function(selector, context) {
        if (typeof selector == 'function') {
            A(window).on('load', selector);
        } else {
            return new A.fn.init(selector, context)
        }
    }

    A.fn = A.prototype = {
        constructor: A,
        init: function(selector, context) {

        }
    }



})(window)