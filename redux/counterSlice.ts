import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface NavProp{
  openCart:boolean,
  valueCategory:string
}

const initialState :NavProp = {
   openCart: false ,
   valueCategory:"all"
  } 
export const NavSlice = createSlice({
  name: 'counter',

  initialState  ,
  
  reducers: {
    toggleCart: (state,action: PayloadAction<boolean>) => {
       state.openCart = action.payload
    },

      ChangeValueCategory: (state,action: PayloadAction<string>) => {
       state.valueCategory = action.payload
    },
    
  },
});

export const { toggleCart ,ChangeValueCategory} = NavSlice.actions;
export default NavSlice.reducer;
