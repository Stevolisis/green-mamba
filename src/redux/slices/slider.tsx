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

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    showSlide: (state) => {
      state.slideUp = !state.slideUp;
    },
    setType: (state, {payload})=>{
      state.type = payload;
    },
    setAddress: (state, {payload})=>{
      state.address = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { showSlide, setType, setAddress } = sliderSlice.actions

export default sliderSlice.reducer // EXPORT Slice reducer