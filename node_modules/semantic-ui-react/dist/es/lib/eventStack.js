import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _without from 'lodash/without';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _uniq from 'lodash/uniq';
import _some from 'lodash/some';
import _includes from 'lodash/includes';
import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import _last from 'lodash/last';
import _forEach from 'lodash/forEach';

import isBrowser from './isBrowser';

var windowEvents = ['resize'];

var EventStack = function EventStack() {
  var _this = this;

  _classCallCheck(this, EventStack);

  this._handlers = {};
  this._pools = {};

  this._emit = function (name) {
    return function (event) {
      _forEach(_this._pools, function (pool, poolName) {
        var handlers = pool[name];


        if (!handlers) return;
        if (poolName === 'default') {
          _forEach(handlers, function (handler) {
            return handler(event);
          });
          return;
        }
        _last(handlers)(event);
      });
    };
  };

  this._normalize = function (handlers) {
    return _isArray(handlers) ? handlers : [handlers];
  };

  this._listen = function (name) {
    if (_has(_this._handlers, name)) return;
    var handler = _this._emit(name);
    var target = _includes(windowEvents, name) ? window : document;

    target.addEventListener(name, handler);
    _this._handlers[name] = handler;
  };

  this._unlisten = function (name) {
    if (_some(_this._pools, name)) return;
    var handler = _this._handlers[name];

    var target = _includes(windowEvents, name) ? window : document;

    target.removeEventListener(name, handler);
    delete _this._handlers[name];
  };

  this.sub = function (name, handlers) {
    var pool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

    if (!isBrowser) return;

    var events = _uniq([].concat(_toConsumableArray(_get(_this._pools, pool + '.' + name, [])), _toConsumableArray(_this._normalize(handlers))));

    _this._listen(name);
    _set(_this._pools, pool + '.' + name, events);
  };

  this.unsub = function (name, handlers) {
    var pool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

    if (!isBrowser) return;

    var events = _without.apply(undefined, [_get(_this._pools, pool + '.' + name, [])].concat(_toConsumableArray(_this._normalize(handlers))));

    if (events.length > 0) {
      _set(_this._pools, pool + '.' + name, events);
      return;
    }

    _set(_this._pools, pool + '.' + name, undefined);
    _this._unlisten(name);
  };
}

// ------------------------------------
// Utils
// ------------------------------------

// ------------------------------------
// Listeners handling
// ------------------------------------

// ------------------------------------
// Pub/sub
// ------------------------------------

;

var instance = new EventStack();

export default instance;