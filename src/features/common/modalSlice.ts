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
      _id: "",
      index: 0
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
        _id: "",
        index: 0
      }
    },

  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer