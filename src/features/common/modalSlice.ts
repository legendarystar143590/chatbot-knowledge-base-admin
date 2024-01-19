import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title: "",  // current  title state management
    isOpen: false,   // modal state management for opening closing
    bodyType: "",   // modal content management
    size: "",   // modal content management
    extraObject: {
      message: "",
      type: "",
      id: "",
      assistant_id: "",
      assistant_name: "",
      title: "",
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
      user_avatar: "",
      assistant_avatar: "",
      name: "",
      status: "",
    },
  },
  reducers: {

    openModal: (state, action) => {
      const { title, bodyType, extraObject, size } = action.payload
      state.isOpen = true
      state.bodyType = bodyType
      state.title = title
      state.size = size || 'md'
      state.extraObject = extraObject
    },

    closeModal: (state) => {
      state.isOpen = false
      state.bodyType = ""
      state.title = ""
      state.extraObject = {
        message: "",
        type: "",
        id: "",
        assistant_id: "",
        assistant_name: "",
        title: "",
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
        user_avatar: "",
        assistant_avatar: "",
        name: "",
        status: ""
      }
    },

  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer