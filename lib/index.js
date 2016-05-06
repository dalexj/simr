var Simr = {
  Reducer: require('./reducer'),
  actions: require('./actions'),
};

if(typeof window != 'undefined') {
  window.Simr = Simr;
} else {
  module.exports = Simr;
}
