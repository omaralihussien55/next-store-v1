import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface NavProp{
  openCart:boolean,
  valueCategory:string,
   page:number,
   pageSize:number
}

const initialState :NavProp = {
   openCart: false ,
   valueCategory:"all",
   page:1,
   pageSize:10
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
      ChangeValuePageProduct: (state,action: PayloadAction<{page:number}>) => {
        
                   const totalPages = action.payload.page;
       
                   state.page = totalPages
        

    },
    
  },
});

export const { toggleCart ,ChangeValueCategory,ChangeValuePageProduct} = NavSlice.actions;
export default NavSlice.reducer;
