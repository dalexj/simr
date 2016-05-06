function setOn(reducer, key, value) {
  var action = { type: 'SIMR.SET.' + reducer + '.' + key};
  action[key] = value;
  return action;
}

module.exports = {
  setOn: setOn,
};
