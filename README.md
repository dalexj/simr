# Simr
Simr is a library that boils your common Redux reducer code into very simple pieces

# Usage

Comparison of reducer code vs. Simr reducer code

```javascript
// Without Simr
var types = {
  SET_NAME: 'SET_NAME',
};

var initialState = { name: 'world' };
var helloReducer = function(state = initialState, action) {
  if(action.type === types.SET_NAME) {
    return {
      ...state,
      name: action.name,
    };
  }
  return state;
};

var helloActions = {
  setName(newName) {
    return {
      type: types.SET_NAME,
      name: newName,
    };
  },
};

var rootReducer = Redux.combineReducers({
  hello: helloReducer
});

//
// With Simr
//

var helloReducer = new Simr.Reducer('hello', {
  name: 'world'
});
helloReducer.addSetter('name');

var rootReducer = Redux.combineReducers({
  hello: helloReducer.build()
});

var helloActions = {
  setName(newName) {
    return Simr.actions.setOn('hello', 'name', newName);
  },
};

```
