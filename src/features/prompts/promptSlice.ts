import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPromptsContent = createAsyncThunk('/prompts/content', async () => {
  const response = await axios.get('/api/users?page=2', {})
  return response.data;
})

export const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    isLoading: false,
    prompts: [{}]
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
      state.prompts = payload.data
      state.isLoading = false
    })
    builder.addCase(getPromptsContent.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { addNewPrompt, deletePrompt } = leadsSlice.actions

export default leadsSlice.reducer