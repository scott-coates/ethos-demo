const appDefaultState = {
  appName: 'React App Hackathon'
};

export function appReducer(state = appDefaultState, action = null) {

  var retVal;

  switch (action.type) {

    default:
      retVal = state;
      break;
  }

  return retVal;
}
