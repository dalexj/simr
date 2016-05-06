function setOn(reducer, key, value) {
  return {
    type: ['SIMR','SET', reducer, key].join('.'),
    value: value,
  };
}

function concatTo(reducer, key, value) {
  return {
    type: ['SIMR', 'CONCAT', reducer, key].join('.'),
    value: value,
  };
}
function updateIndex(reducer, key, index, updateFn) {
  return {
    type: ['SIMR','UPDATE_INDEX', reducer, key].join('.'),
    index: index,
    updateFn: updateFn,
  };
}
function updateID(reducer, key, id, updateFn) {
  return {
    type: ['SIMR','UPDATE_ID', reducer, key].join('.'),
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
