import { createSlice } from '@reduxjs/toolkit'

interface IInitialstate {
    slideUp: boolean;
}
const initialState:IInitialstate = {
  slideUp: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    showSlide: (state) => {
      state.slideUp = !state.slideUp;
    }
  },
})

// Action creators are generated for each case reducer function
export const { showSlide } = profileSlice.actions

export default profileSlice.reducer // EXPORT Slice reducer