var $ = (function () {
    'use strict';
    var publicApi = {
            forEach: each,
            filter: filter,
            on: function (element, event, callback, context) {
                element.addEventListener(event, bind(context || element, callback));
            },
            onPageReady: function (callback) {
                this.on(window, 'load', callback);
            },
            package: namespace,
            mix: mix,
            evaluate: evaluate
        },
        baseNamespace = {};

    function each(arr, callback) {
        for (var idx = 0; idx < arr.length; idx++) {
            callback(arr[idx], idx);
        }
    }

    function filter(arr, criteria) {
        var result = [];
        each(arr, function (value) {
            if (criteria(value)) {
                result.push(value);
            }
        });
        return result;
    }

    function bind(context, func) {
        return function () {
            return func.apply(context, arguments);
        };
    }

    function namespace(path) {
        var segment = baseNamespace;
        each(path.split('.'), function (pathElement) {
            if (segment[pathElement] === undefined) {
                segment[pathElement] = {};
            }
            segment = segment[pathElement];
        });
        return segment;
    }

    function mix(source, target) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    }

    function evaluate(template, data) {
        var result = template,
            expression;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                expression = new RegExp('{{' + key + '}}');
                result = result.replace(expression, data[key]);
            }
        }
        return result;
    }

    if (!window.addEventListener) {
        publicApi.on = function (element, event, callback, context) {
            element.attachEvent('on' + event, bind(context || element, callback));
        }
    }

    return publicApi;
})();









