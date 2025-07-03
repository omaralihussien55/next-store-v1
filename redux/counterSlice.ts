import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface NavProp{
  openCart:boolean
}

const initialState :NavProp = { openCart: false } 
export const NavSlice = createSlice({
  name: 'counter',

  initialState  ,
  
  reducers: {
    toggleCart: (state,action: PayloadAction<boolean>) => {
       state.openCart = action.payload
    },
    
  },
});

export const { toggleCart } = NavSlice.actions;
export default NavSlice.reducer;
