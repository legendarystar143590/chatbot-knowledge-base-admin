import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROMPT_ADDRESS } from '../../utils/serverURL';

export const getPromptsContent = createAsyncThunk('/prompts/content', async () => {
  const response = await axios.get(PROMPT_ADDRESS.GET_ALL_PRE_PROMPTS, {})
  console.log(response);
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
    addNewPrompt: (state, action) => {
      let { newLeadObj } = action.payload
      state.prompts = [...state.prompts, newLeadObj]
    },

    deletePrompt: (state, action) => {
      let { index } = action.payload
      state.prompts.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPromptsContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPromptsContent.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.prompts = payload.data
      state.isLoading = false
    })
    builder.addCase(getPromptsContent.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { addNewPrompt, deletePrompt } = promptsSlice.actions

export default promptsSlice.reducer