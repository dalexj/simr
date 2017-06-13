var getType = require('./types');

// helpers
function putUpdateOnAction(action, update) {
  if(typeof update === 'function') {
    action.updateFn = update;
  } else {
    action.value = update;
  }
}

// actions
function setOn(reducer, key, value) {
  return {
    type: getType('SET', reducer, key),
    value: value,
  };
}

function concatTo(reducer, key, value) {
  return {
    type: getType('CONCAT', reducer, key),
    value: value,
  };
}
function updateIndex(reducer, key, index, update) {
  var action = {
    type: getType('UPDATE_INDEX', reducer, key),
    index: index,
  };
  putUpdateOnAction(action, update);
  return action;
}
function updateAll(reducer, key, update) {
  var action = {
    type: getType('UPDATE_ALL', reducer, key),
  };
  putUpdateOnAction(action, update);
  return action;
}
function updateID(reducer, key, id, update) {
  var action = {
    type: getType('UPDATE_ID', reducer, key),
    id: id,
  };
  putUpdateOnAction(action, update);
  return action;
}
function removeID(reducer, key, id) {
  return {
    type: getType('REMOVE_ID', reducer, key),
    id: id,
  };
}
function removeIndex(reducer, key, index) {
  return {
    type: getType('REMOVE_INDEX', reducer, key),
    index: index,
  };
}

module.exports = {
  setOn: setOn,
  concatTo: concatTo,
  updateIndex: updateIndex,
  updateID: updateID,
  removeID: removeID,
  removeIndex: removeIndex,
  updateAll: updateAll,
};
