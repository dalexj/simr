var cloneDeep = require('lodash/cloneDeep');
var startsWith = require('lodash/startsWith');
var findIndex = require('lodash/findIndex');
var merge = require('lodash/merge');
var getType = require('./types');

function Reducer(name, initialState) {
  this.name = name;
  this.subscriptions = {};
  this.initialState = initialState;
}

Reducer.prototype.subscribe = function(type, fun) {
  if(!type) {
    // eslint-disable-next-line no-console
    console.error('type is blank');
  }
  if(this.subscriptions[type]) {
    // eslint-disable-next-line no-console
    console.error('you have already subscribed to', type);
  }
  if(!fun) {
    // eslint-disable-next-line no-console
    console.error('no function passed in');
  }
  this.subscriptions[type] = fun;
};

Reducer.prototype.build = function() {
  var subscriptions = this.subscriptions;
  var initialState = this.initialState;
  var name = this.name;

  return function(state = initialState, action) {
    if(subscriptions[action.type]) {
      return subscriptions[action.type](cloneDeep(state), action);
    }
    if(startsWith(action.type, 'SIMR.SET.' + name + '.')) {
      // eslint-disable-next-line no-console
      console.error('Action with type "' + action.type + '" was called but the ' + name + ' reducer is not subscribed to this action');
    }
    return state;
  };
};

Reducer.prototype.addSetter = function(key) {
  this.subscribe(getType('SET', this.name, key), function(state, action) {
    state[key] = action.value;
    return state;
  });
};

Reducer.prototype.addConcatTo = function(key) {
  this.subscribe(getType('CONCAT', this.name, key), function(state, action) {
    state[key] = state[key].concat(action.value);
    return state;
  });
};
Reducer.prototype.addUpdateIndex = function(key) {
  this.subscribe(getType('UPDATE_INDEX', this.name, key), function(state, action) {
    if(state[key].length < action.index + 1) {
      return state;
    }
    if(action.updateFn) {
      state[key][action.index] = action.updateFn(state[key][action.index]);
    } else {
      state[key][action.index] = merge({}, state[key][action.index], action.value);
    }
    return state;
  });
};
Reducer.prototype.addUpdateID = function(key) {
  this.subscribe(getType('UPDATE_ID', this.name, key), function(state, action) {
    var index = findIndex(state[key], ele => ele.id === action.id);
    if(index === -1) { return state; }
    if(action.updateFn) {
      state[key][index] = action.updateFn(state[key][index]);
    } else {
      state[key][index] = merge({}, state[key][index], action.value);
    }
    return state;
  });
};
Reducer.prototype.addRemoveIndex = function(key) {
  this.subscribe(getType('REMOVE_INDEX', this.name, key), function(state, action) {
    state[key] = state[key].filter((ele, index) => index !== action.index);
    return state;
  });
};
Reducer.prototype.addRemoveID = function(key) {
  this.subscribe(getType('REMOVE_ID', this.name, key), function(state, action) {
    state[key] = state[key].filter(ele => ele.id !== action.id);
    return state;
  });
};
Reducer.prototype.arrayResources = function(key) {
  this.addSetter(key);
  this.addConcatTo(key);
  this.addUpdateIndex(key);
  this.addUpdateID(key);
  this.addRemoveID(key);
  this.addRemoveIndex(key);
};

module.exports = Reducer;
