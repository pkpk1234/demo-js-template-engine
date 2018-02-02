"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tokenizer = require("./tokenizer");

var _tokenizer2 = _interopRequireDefault(_tokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
    function Engine() {
        _classCallCheck(this, Engine);
    }

    _createClass(Engine, [{
        key: "compile",
        value: function compile(template) {
            var tokens = _tokenizer2.default.getTokens(template);
            var functionBody = tokens.join(' + ');
            return {
                "render": new Function("data", " with(data) {return " + functionBody + " };")
            };
        }
    }]);

    return Engine;
}();

exports.default = new Engine();