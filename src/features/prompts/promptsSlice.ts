import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROMPT_API } from '../../utils/serverURL';
import { Prompt } from '../../utils/Type';

export const getPromptsContent = createAsyncThunk('/prompts/content', async () => {
  const response = await axios.get(PROMPT_API.GET_PRE_PROMPTS, {
    headers: {
      'ngrok-skip-browser-warning': "1"
    }
  })
  return response.data;
})

export const addNewPrompt = createAsyncThunk('/prompts/add', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.ADD_PRE_PROMPT, {
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const updatePrompt = createAsyncThunk('/prompts/update', async (prompt: Prompt) => {
  const response = await axios.post(PROMPT_API.UPDATE_PRE_PROMPT, {
    id: prompt.id,
    title: prompt.title,
    prompt: prompt.prompt
  })
  return response.data;
})

export const deletePrompt = createAsyncThunk('/prompts/delete', async (id: string) => {
  const response = await axios.post(PROMPT_API.DELETE_PRE_PROMPT, {
    id: id
  })
  return response.data;
})

export const promptsSlice = createSlice({
  name: 'prompts',
  initialState: {
    isLoading: false,
    prompts: [{
      id: "",
      title: "",
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
    builder.addCase(getPromptsContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPromptsContent.fulfilled, (state, { payload }) => {
      state.prompts = payload
      state.isLoading = false
    })
    builder.addCase(getPromptsContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewPrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewPrompt.fulfilled, (state, { payload }) => {
      state.prompts = [...state.prompts, payload]
      state.isLoading = false
    })
    builder.addCase(addNewPrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updatePrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updatePrompt.fulfilled, (state, { payload }) => {
      state.prompts = state.prompts.map(prompt => prompt.id === payload.id ? payload : prompt)
      state.isLoading = false
    })
    builder.addCase(updatePrompt.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deletePrompt.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deletePrompt.fulfilled, (state, { payload }) => {
      state.prompts = state.prompts.filter(prompt => prompt.id === payload.id)
      state.isLoading = false
    })
    builder.addCase(deletePrompt.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default promptsSlice.reducer