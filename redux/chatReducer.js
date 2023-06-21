import { createSlice } from "@reduxjs/toolkit";

const initialMessages = [
    {
        sender: "bot",
        message: "Hi! Welcome to Brulee Patisserie! I'm Jean, your personal AI helper! How can I help you today?"
    }
]

const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        isToggled: false,
        messages: initialMessages,
    },
    reducers: {
        toggleChat: (state) => {
            if (state.isToggled) {
                state.isToggled = !state.isToggled;
                state.messages = initialMessages;
            } else {
                state.isToggled = !state.isToggled;
            }
        },
        updateChat: (state, action) => {
            action.payload.index = state.messages.length;
            state.messages.push(action.payload)
        },
        resetChat: (state) => {
            state.messages = initialMessages;
        },
    }
})

export default chatReducer.reducer
export const { toggleChat, updateChat, resetChat } = chatReducer.actions;