/**
 * C JavaScript Library version 1.0.0
 * Author:caichunbao
 * Description:some commonly used functions of the package
 * Date:Wed Jul 05 2017 20:51:36 GMT+0800 (中国标准时间)
 */
(function(window) {
    var
    // 跟元素
        C_root,
        // 版本
        C_version = "1.0.0",
        // 框架C对象
        C = function(selector) {
            return new C.fn.init(selector);
        };
    /**
     * C对象的原型设置
     * 初始化init方法
     * 常用工具方法
     */
    C.fn = C.prototype = {
        C: C_version,
        constructor: C,
        init: function(selector) {
            var elem;
            if (!selector) {
                return this;
            };
            elem = document.getElementById(selector);
            this[0] = elem;
            return this;
        },
        test: function() {
            console.log('test');
        }

    };

    /**
     * 让C对象实例的原型与C的原型相同
     */
    C.fn.init.prototype = C.fn;

    /**
     * C对象的扩展方法
     * 扩展工具方法
     * 扩展到C对象下
     */
    C.extend = C.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // 处理深拷贝情况
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // 跳过布尔值情况
            i = 2;
        }

        // 处理当target是一个字符串时或者是深拷贝情况
        if (typeof target !== "object") {
            target = {};
        }

        // 如果只传递一个参数，则扩展C本身
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // 只处理非空/未定义的值
            if ((options = arguments[i]) != null) {
                // 扩展基本对象
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // 防止无限循环
                    if (target === copy) {
                        continue;
                    }

                    // 通过递归来合并普通对象或数组
                    if (deep && copy && (copy.constructor.prototype === Object.prototype || (copyIsArray = C.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && C.isArray(src) ? src : [];

                        } else {
                            clone = src && src.constructor.prototype === Object.prototype ? src : {};
                        }

                        // 不移动原来对象，克隆
                        target[name] = C.extend(deep, clone, copy);

                        // 不引入未定义的值
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // 返回修改对象
        return target;
    };
    C.extend({
        aaa: 'aaa',
        isArray: Array.isArray,
        toast: function(data) {
            return new Toast(data).init();
        }
    });
    C.fn.extend({
        aaa: 'aaa'
    });

    /**
     * Toast组件
     * Toast用于临时显示某些信息，并且会在数秒后自动消失，
     */
    var Toast = function(data) {
        if (!data) {
            throw Error('Not found required parameters')
            return
        }
        //设置内容
        this.content = data.content;
        //创建显示内容面板
        this.panel = document.createElement('div');
        //创建显示内容节点
        this.contentNode = document.createElement('p');
        //显示内容写到内容节点中
        this.contentNode.innerHTML = this.content;
        //给显示内容面板添加类
        this.panel.className = 'C-toast-panel';
        //给显示内容节点添加类
        this.contentNode.className = 'C-toast-content';
        //持续时间
        this.duration = data.duration || 2000;
        //回调函数
        this.callback = data.callback || function() {};
    }
    Toast.prototype = {
        constructor: Toast,
        init: function() {
            var _this = this;
            _this.panel.appendChild(this.contentNode);
            document.body.appendChild(_this.panel);
            //隐藏提示框
            setTimeout(function() {
                _this.hide();
                _this.callback();
            }, _this.duration);
        },
        hide: function() {
            this.panel.style.display = 'none'
        }
    }





    /**
     * 栈的类
     * 栈是一种遵从后进先出原则的有序集合
     */
    function Stack() {
        var items = [];
        this.push = function(element) {
            items.push(element);
        };
        this.pop = function() {
            return items.pop();
        };
        this.peek = function() {
            return items[items.length - 1];
        };
        this.isEmpty = function() {
            return items.length == 0;
        };
        this.clear = function() {
            items = [];
        };
        this.size = function() {
            return items.length;
        };
        this.print = function() {
            console.log(items.toString())
        }
    }
    /**
     * 队列的类
     * 队列是遵循先进先出原则的一组有序的项
     */
    function Queue() {
        var items = [];
        this.enqueue = function(element) {
            items.push(element);
        };
        this.dequeue = function() {
            return items.shift();
        };
        this.front = function() {
            return items[0];
        };
        this.isEmpty = function() {
            return items.length == 0;
        };
        this.clear = function() {
            items = [];
        };
        this.size = function() {
            return items.length;
        };
        this.print = function() {
            console.log(items.toString());
        }
    }
    /**
     * 集合的类
     * 集合是以[值，值]的形式存储元素
     */
    function Set() {
        var items = {};
        // 检验值时候存在
        this.has = function(value) {
            return items.hasOwnProperty(value);
        };
        // 向集合中添加元素
        this.add = function(value) {
            if (!this.has(value)) {
                items[value] = value;
                return true;
            };
            return false;
        };
        // 移除集合中元素
        this.remove = function(value) {
            if (this.has(value)) {
                delete items[value];
                return true;
            };
            return false;
        };
        // 清空集合
        this.clear = function() {
            items = {}
        };
        // 集合中元素个数
        this.size = function() {
            var count = 0;
            for (var prop in items) {
                if (items.hasOwnProperty(prop)) {
                    ++count;
                }
            }
            return count
        };
        // 以数组的格式返回集合的值
        this.values = function() {
            var keys = [];
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    keys.push(key)
                }
            }
            return keys;
        };
        // 并集
        this.union = function(otherSet) {
            var unionSet = new Set();
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                unionSet.add(values[i]);
            };
            values = otherSet.values();
            for (var i = 0; i < values.length; i++) {
                unionSet.add(values[i]);
            };
            return unionSet;
        };
        // 交集
        this.intersection = function(otherSet) {
            var intersectionSet = new Set();
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (otherSet.has(values[i])) {
                    intersectionSet.add(values[i]);
                }
            };
            return intersectionSet;
        };
        // 差集
        this.difference = function(otherSet) {
            var differenceSet = new Set();
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    differenceSet.add(values[i]);
                }
            }
            return differenceSet;
        };
        // 子集
        this.subSet = function(otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            } else {
                var values = this.values();
                for (var i = 0; i < values.length; i++) {
                    if (!otherSet.has(values[i])) {
                        return false;
                    }
                };
                return true;
            }
        };
    };

    /**
     * 字典的类
     * 字典则是以[键，值]的形式来储存元素
     */
    function Dictionary() {
        var items = {};
        this.has = function(key) {
            return items.hasOwnProperty(key)
        };
        this.set = function(key, value) {
            items[key] = value;
        };
        this.remove = function(key) {
            if (items.has(key)) {
                delete items[key];
                return true;
            };
            return false;
        };
        this.get = function(key) {
            return this.has(key) ? items[key] : undefined;
        };
        this.clear = function() {
            items = {};
        };
        this.size = function() {
            var count = 0;
            for (var key in items) {
                if (items.has(key)) {
                    ++count;
                }
            }
            return count;
        };
        this.keys = function() {
            var keys = [];
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
        this.values = function() {
            var values = [];
            for (var value in items) {
                if (items.hasOwnProperty(value)) {
                    values.push(items[value])
                }
            }
            return values;
        };
        this.getItems = function() {
            return items;
        }
    };
    /**
     * 二叉搜索树的类
     * 二叉树的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点
     * 二叉搜索树它只允许你在左侧的节点存储（比父节点）小的值，在右侧节点存储（比父节点）大（或者等于）的值
     */
    function BinarySearchTree() {
        var Node = function(key) {
            this.key = key;
            this.left = null;
            this.right = null;
        };
        var root = null;
        var insertNode = function(node, newNode) {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode)
                }
            }
        };
        var minNode = function(node) {
            if (node) {
                while (node && node.left !== null) {
                    node = node.left;
                };
                return node.key;
            };
            return null;
        };
        var maxNode = function(node) {
            if (node) {
                if (node && node.right !== null) {
                    node = node.right;
                };
                return node.key;
            };
            return null;
        };
        var searchNode = function(node, key) {
            if (node === null) {
                return false;
            };
            if (key < node.key) {
                return searchNode(node.left, key);
            } else if (key > node.key) {
                return searchNode(node.right, key);
            } else {
                return true;
            }
        };
        var removeNode = function(node, key) {
            if (node === null) {
                return null;
            };
            if (key < node.key) {
                node.left = removeNode(node.right, key);
                return node;
            };
        }
        this.insert = function() {
            var newNode = new Node(key);
            if (root === null) {
                root = newNode;
            } else {
                insertNode(root, newNode);
            }
        };
        this.min = function() {
            return minNode(root);
        };
        this.max = function() {
            return maxNode(root);
        };
        this.search = function(key) {
            return searchNode(root, key);
        };
        this.remove = function(key) {
            root = removeNode(root, key);
        };
    };

    // 把C挂载的window上
    if (typeof window === "object" && typeof window.document === "object") {
        window.C = C;
    }

})(window)