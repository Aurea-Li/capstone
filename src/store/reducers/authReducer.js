const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'GET_MEMBERS':

      return {
        ...state,
        members: action.members
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.error.message
      }
    default:
      return state;
  }
};

export default authReducer
