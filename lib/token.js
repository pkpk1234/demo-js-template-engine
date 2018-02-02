'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function quote(str) {
  var newStr = str.replace(/\"/g, '"');
  return newStr;
}

var Token = function () {
  function Token(value, type) {
    _classCallCheck(this, Token);

    this.value = value;
    this.type = type;
  }

  _createClass(Token, [{
    key: 'toString',
    value: function toString() {
      if (this.type === "text") {
        return '"' + quote(this.value) + '"';
      } else {
        return "(" + this.value + ")";
      }
    }
  }]);

  return Token;
}();

exports.default = Token;