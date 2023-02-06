import { createSlice } from '@reduxjs/toolkit'

export const imageSlice = createSlice({
  name: 'image',
  initialState: {
    value:[]
  },
  reducers: {
    addImages: (state, {payload}) => {
      state.value = payload;
    },
    clearImages : state => {
      state.value = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addImages, clearImages} = imageSlice.actions

export default imageSlice.reducer