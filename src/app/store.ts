import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import promptsSlice from '../features/prompts/promptsSlice'
import knowledgeSlice from '../features/knowledge/knowledgeSlice'

const combinedReducer = {
  header: headerSlice,
  modal: modalSlice,
  prompt: promptsSlice,
  knowledge: knowledgeSlice
}

export const store = configureStore({
  reducer: combinedReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch