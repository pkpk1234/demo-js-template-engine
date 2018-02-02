"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = require("./token");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var startToken = "{{";
var endToken = "}}";

var Tokenizer = function () {
    function Tokenizer() {
        _classCallCheck(this, Tokenizer);
    }

    _createClass(Tokenizer, [{
        key: "getTokens",
        value: function getTokens(templateString) {
            var str = templateString;
            var tokens = [];

            var index = str.indexOf(startToken);
            //如果没有包含{{，认为是普通字符串
            if (index == -1) {
                tokens.push(new _token2.default(templateString, "text"));
                return tokens;
            }

            //遍历模板，构造token
            while ((index = str.indexOf(startToken)) != -1) {
                //获取{{之前的内容
                var textValue = str.slice(0, index);
                tokens.push(new _token2.default(textValue, "text"));
                //将str设置为{{之后的内容
                str = str.slice(index);

                index = str.indexOf(endToken);
                //如果没有配对的}}，抛出异常
                if (index == -1) {
                    throw new Error("template error");
                }
                //获取占位符
                var variable = str.slice(2, index);
                tokens.push(new _token2.default(variable, "variable"));
                //将str设置为}}之后的内容
                str = str.slice(index + 2);
            }
            if (str.length > 0) {
                tokens.push(new _token2.default(str, "text"));
            }
            return tokens;
        }
    }]);

    return Tokenizer;
}();

exports.default = new Tokenizer();