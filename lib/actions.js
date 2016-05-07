var getType = require('./types');

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
function updateIndex(reducer, key, index, updateFn) {
  return {
    type: getType('UPDATE_INDEX', reducer, key),
    index: index,
    updateFn: updateFn,
  };
}
function updateID(reducer, key, id, updateFn) {
  return {
    type: getType('UPDATE_ID', reducer, key),
    id: id,
    updateFn: updateFn,
  };
}

module.exports = {
  setOn: setOn,
  concatTo: concatTo,
  updateIndex: updateIndex,
  updateID: updateID,
};
