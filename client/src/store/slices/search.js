import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keyword: "",
  results: []
}

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.keyword = action.payload.keyword;
      state.results = action.payload.results;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSearch } = search.actions

export default search.reducer