const authReducer = (state = {}, action) => {
  switch(action.type){
    case 'GET_MEMBERS':
      return {
        ...state,
        members: action.members
      }
    case 'LOGIN_SUCCESS':
      return state;
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNUP_SUCCESS':
      return state;
    default:
      return state;
  }
};

export default authReducer
