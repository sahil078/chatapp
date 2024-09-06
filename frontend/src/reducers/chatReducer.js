// client/src/reducers/chatReducer.js
const initialState = {
    messages: [],
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MESSAGES':
        return { ...state, messages: action.payload };
      case 'ADD_MESSAGE':
        return { ...state, messages: [...state.messages, action.payload] };
      default:
        return state;
    }
  };
  
  export default chatReducer;
  