import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null , 
    token :""
}

export const authS = createSlice({
    name: 'authS',
    initialState,
    reducers: {
      setUser : (state , action) =>{
        state.data.user = action.payload;
      },
      setToken : (state , action) =>{
        state.data.token = action.payload;
      },
      setAuthData : (state , action)=>{
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {setToken , setUser ,setAuthData } = authS.actions
  
  export default authS.reducer