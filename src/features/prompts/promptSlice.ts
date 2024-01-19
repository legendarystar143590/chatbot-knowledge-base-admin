import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROMPT_API } from '../../utils/serverURL';
import { Prompt } from '../../utils/Type';

export const getPromptContent = createAsyncThunk('/prompt/content', async (assistant_id: string) => {
  const response = await axios.get(PROMPT_API.GET_PROMPT, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': import.meta.env.VITE_SERVER_ENDPOINT,
    },
    params: {
      assistant_id: assistant_id
    }
  })
  return response.data;
})

export const updatePrompt = createAsyncThunk('/prompt/update', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.UPDATE_PROMPT, {
    assistant_id: prompt.assistant_id,
    prompt: prompt.prompt
  })
  return response.data;
})

export const promptSlice = createSlice({
  name: 'prompt',
  initialState: {
    isLoading: false,
    prompt: [{
      assistant_id: "",
      prompt: "",
      date: ""
    }]
  },
  reducers: {
    // addNewPrompt: (state, action) => {
    //   let { newLeadObj } = action.payload
    //   state.prompts = [...state.prompts, newLeadObj]
    // },

    // deletePrompt: (state, action) => {
    //   let { id } = action.payload
    //   state.prompts.splice(id, 1)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getPromptContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPromptContent.fulfilled, (state, { payload }) => {
      state.prompt = payload
      state.isLoading = false
    })
    builder.addCase(getPromptContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updatePrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updatePrompt.fulfilled, (state, { payload }) => {
      state.prompt = payload
      state.isLoading = false
    })
    builder.addCase(updatePrompt.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default promptSlice.reducer