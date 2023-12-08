import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { KNOWLEDGE_BASE_API } from '../../utils/serverURL';

export const getKnowledgeContent = createAsyncThunk('/knowledge/content', async () => {
  const response = await axios.get(KNOWLEDGE_BASE_API.GET_KNOWLEDGE_BASE, {
    params: {
      user_id: "123"
    }
  })
  return response.data;
})

export const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState: {
    isLoading: false,
    knowledge: [{
      id: "",
      name: "",
      type: "",
      status: "",
      date: ""
    }]
  },
  reducers: {
    addNewKnowledge: (state, action) => {
      let { newKnowledgeObj } = action.payload
      state.knowledge = [...state.knowledge, newKnowledgeObj]
    },

    deleteKnowledge: (state, action) => {
      let { id } = action.payload
      state.knowledge.splice(id, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getKnowledgeContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getKnowledgeContent.fulfilled, (state, { payload }) => {
      if (payload === undefined) state.knowledge = [{
        id: "",
        name: "",
        type: "",
        status: "",
        date: ""
      }]
      else state.knowledge = payload.data
      state.isLoading = false
    })
    builder.addCase(getKnowledgeContent.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { addNewKnowledge, deleteKnowledge } = knowledgeSlice.actions

export default knowledgeSlice.reducer