import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ASSISTANT_API, DATABASE_API } from '../../utils/serverURL';
import { Assistant } from '../../utils/Type';

export const testSQLDatabase = createAsyncThunk('/assistant/test_sql', async (assistant: Assistant) => {
  const response = await axios.post(DATABASE_API.TEST_SQL_DATABASE, {
    host: assistant.sql_host,
    port: assistant.sql_port,
    db_name: assistant.sql_db_name,
    username: assistant.sql_username,
    password: assistant.sql_password
  })
  return response.data;
})

export const testPinecone = createAsyncThunk('/assistant/test_pinecone', async (assistant: Assistant) => {
  const response = await axios.post(DATABASE_API.TEST_PINECONE, {
    environment: assistant.pinecone_environment,
    index_name: assistant.pinecone_index_name,
    api_key: assistant.pinecone_api_key
  })
  return response.data;
})

export const getAssistantContent = createAsyncThunk('/assistant/content', async () => {
  const response = await axios.get(ASSISTANT_API.GET_ASSISTANT, {
    headers: {
      'ngrok-skip-browser-warning': "1",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://9797-156-220-22-73.ngrok-free.app.env',
    }
  })
  return response.data;
})

export const addNewAssistant = createAsyncThunk('/assistant/add', async (assistant: Assistant) => {
  const response = await axios.post(ASSISTANT_API.ADD_ASSISTANT, {
    assistant_name: assistant.assistant_name,
    prompt: assistant.prompt,
    use_sql: assistant.use_sql,
    sql_host: assistant.sql_host,
    sql_port: assistant.sql_port,
    sql_db_name: assistant.sql_db_name,
    sql_username: assistant.sql_username,
    sql_password: assistant.sql_password,
    use_pinecone: assistant.use_pinecone,
    pinecone_environment: assistant.pinecone_environment,
    pinecone_index_name: assistant.pinecone_index_name,
    pinecone_api_key: assistant.pinecone_api_key,
    use_serp: assistant.use_serp,
    facebook_enable: assistant.facebook_enable,
    facebook_token: assistant.facebook_token,
    image_enable: assistant.image_enable,
  })
  return response.data;
})

export const updateAssistant = createAsyncThunk('/assistant/update', async (assistant: Assistant) => {
  const response = await axios.post(ASSISTANT_API.UPDATE_ASSISTANT, {
    id: assistant.id,
    assistant_name: assistant.assistant_name,
    prompt: assistant.prompt,
    use_sql: assistant.use_sql,
    sql_host: assistant.sql_host,
    sql_port: assistant.sql_port,
    sql_db_name: assistant.sql_db_name,
    sql_username: assistant.sql_username,
    sql_password: assistant.sql_password,
    use_pinecone: assistant.use_pinecone,
    pinecone_environment: assistant.pinecone_environment,
    pinecone_index_name: assistant.pinecone_index_name,
    pinecone_api_key: assistant.pinecone_api_key,
    use_serp: assistant.use_serp,
    facebook_enable: assistant.facebook_enable,
    facebook_token: assistant.facebook_token,
    image_enable: assistant.image_enable,
  })
  return response.data;
})

type PromptType = {
  id: string,
  prompt: string
}

export const updatePrompt = createAsyncThunk('/assistant/update', async (assistant: PromptType) => {
  const response = await axios.post(ASSISTANT_API.UPDATE_ASSISTANT, {
    id: assistant.id,
    prompt: assistant.prompt,
  })
  return response.data;
})

export const deleteAssistant = createAsyncThunk('/assistant/delete', async (id: string) => {
  const response = await axios.post(ASSISTANT_API.DELETE_ASSISTANT, {
    id: id
  })
  return response.data;
})

export const assistantsSlice = createSlice({
  name: 'assistants',
  initialState: {
    isLoading: false,
    assistants: [{
      id: "",
      assistant_name: "",
      prompt: "",
      use_sql: false,
      sql_host: "",
      sql_db_name: "",
      sql_port: "",
      sql_username: "",
      sql_password: "",
      use_pinecone: false,
      pinecone_index_name: "",
      pinecone_environment: "",
      pinecone_api_key: "",
      use_serp: false,
      facebook_enable: false,
      facebook_token: "",
      image_enable: false,
      date: ""
    }],
    db_test: false
  },
  reducers: {
    // addNewKnowledge: (state, action) => {
    //   let { newKnowledgeObj } = action.payload
    //   state.knowledge = [...state.knowledge, newKnowledgeObj]
    // },

    // deleteKnowledge: (state, action) => {
    //   let { id } = action.payload
    //   state.knowledge.splice(id, 1)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(testSQLDatabase.pending, (state) => {
      state.isLoading = true
      state.db_test = false
    })
    builder.addCase(testSQLDatabase.fulfilled, (state, { payload }) => {
      state.db_test = payload.result
      state.isLoading = false
    })
    builder.addCase(testSQLDatabase.rejected, (state) => {
      state.db_test = false
      state.isLoading = false
    })
    builder.addCase(testPinecone.pending, (state) => {
      state.isLoading = true
      state.db_test = false
    })
    builder.addCase(testPinecone.fulfilled, (state, { payload }) => {
      state.db_test = payload.result
      state.isLoading = false
    })
    builder.addCase(testPinecone.rejected, (state) => {
      state.db_test = false
      state.isLoading = false
    })
    builder.addCase(getAssistantContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAssistantContent.fulfilled, (state, { payload }) => {
      state.assistants = payload
      state.isLoading = false
    })
    builder.addCase(getAssistantContent.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addNewAssistant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewAssistant.fulfilled, (state, { payload }) => {
      if (payload?.id)
        state.assistants = [...state.assistants, payload]
      state.isLoading = false
    })
    builder.addCase(addNewAssistant.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateAssistant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateAssistant.fulfilled, (state, { payload }) => {
      state.assistants = state.assistants.map(assistant => assistant.id === payload.id ? payload : assistant)
      state.isLoading = false
    })
    builder.addCase(updateAssistant.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteAssistant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteAssistant.fulfilled, (state, { payload }) => {
      state.assistants = state.assistants.filter(assistant => assistant.id !== payload.id)
      state.isLoading = false
    })
    builder.addCase(deleteAssistant.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default assistantsSlice.reducer