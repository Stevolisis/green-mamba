import { createSlice } from '@reduxjs/toolkit'

type ProfileType = "complete_profile" | "add_article" | "edit_article" | "";

interface IInitialstate {
    slideUp: boolean;
    type: ProfileType
}
const initialState:IInitialstate = {
  slideUp: false,
  type: ""
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    showSlide: (state) => {
      state.slideUp = !state.slideUp;
    },
    setType: (state, {payload})=>{
      state.type = payload.type
    }
  },
})

// Action creators are generated for each case reducer function
export const { showSlide, setType } = profileSlice.actions

export default profileSlice.reducer // EXPORT Slice reducer