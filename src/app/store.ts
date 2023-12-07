import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import promptsSlice from '../features/prompts/promptsSlice'

const combinedReducer = {
  header: headerSlice,
  modal: modalSlice,
  prompt: promptsSlice
}

export const store = configureStore({
  reducer: combinedReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch