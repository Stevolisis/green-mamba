import { createSlice } from '@reduxjs/toolkit'

type ProfileType = "complete_profile" | "add_article" | "edit_article" | "";

interface IInitialstate {
    slideUp: boolean;
    type: ProfileType;
    address: string;
}
const initialState:IInitialstate = {
  slideUp: false,
  type: "",
  address:""
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    showSlide: (state) => {
      state.slideUp = !state.slideUp;
    },
    setType: (state, {payload})=>{
      state.type = payload.type;
    },
    setAddress: (state, {payload})=>{
      state.address = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { showSlide, setType, setAddress } = profileSlice.actions

export default profileSlice.reducer // EXPORT Slice reducer