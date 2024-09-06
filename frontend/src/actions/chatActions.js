// client/src/actions/chatActions.js
export const setMessages = (messages) => ({
    type: 'SET_MESSAGES',
    payload: messages,
  });
  
  export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
  });
  