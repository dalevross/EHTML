'use strict';

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmptyAsyncObject = require('./../async/EmptyAsyncObject');

var StringWithAppliedStorageVariables = require('./../async/StringWithAppliedStorageVariables');

var StringWithMappedObject = require('./../async/StringWithMappedObject');

var ParsedJSONOrString = require('./../async/ParsedJSONOrString');

var ActionByNameWithParams = require('./ActionByNameWithParams');

var ParsedActions =
/*#__PURE__*/
function () {
  function ParsedActions(actions, supportedActions, tagName, obj) {
    _classCallCheck(this, ParsedActions);

    // act1(p1, p2); act(q1, q2); ...
    this.actions = actions;
    this.supportedActions = supportedActions;
    this.tagName = tagName;
    this.obj = obj;
  }

  _createClass(ParsedActions, [{
    key: "value",
    value: function value() {
      var _this = this;

      var parsedActions = [];

      if (!this.actions) {
        return new EmptyAsyncObject();
      }

      var splitedActions = this.actions.split(';').map(function (action) {
        return action.trim();
      }).filter(function (action) {
        return action.length !== 0;
      });
      splitedActions.forEach(function (action) {
        var actionName = action.split('(')[0].trim();

        if (_this.supportedActions.indexOf(actionName) === -1) {
          throw new Error("action ".concat(actionName, " is not supported for the element ").concat(_this.tagName));
        }

        var actionParams = _this.actionParams(action, actionName);

        parsedActions.push(_construct(ActionByNameWithParams, [actionName].concat(_toConsumableArray(actionParams))).value());
      });
      return parsedActions;
    }
  }, {
    key: "actionParams",
    value: function actionParams(action, actionName) {
      var _this2 = this;

      return action.replace(')', '').split("".concat(actionName, "("))[1].split(',').map(function (param) {
        return new ParsedJSONOrString(new StringWithMappedObject(new StringWithAppliedStorageVariables(param), _this2.obj));
      });
    }
  }]);

  return ParsedActions;
}();

module.exports = ParsedActions;
