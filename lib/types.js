module.exports = function(name, reducer, key) {
  return ['SIMR', name, reducer, key].join('.');
}
